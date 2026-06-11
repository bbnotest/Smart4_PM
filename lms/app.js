/* ============================================================
   app.js — LMS 동작 로직 (의존: curriculum.js, marked, mermaid, highlight.js)
   - .md 를 fetch 해서 렌더 (Markdown→HTML, Mermaid, 코드 하이라이트)
   - 상대 링크/이미지 경로를 문서 위치 기준으로 보정
   - 진도/실습 체크리스트를 localStorage 에 저장
   - 검색 / 이전·다음 / 대시보드 / 테마
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const LS = window.localStorage;
  const C  = window.CURRICULUM;

  // 모든 강의를 평탄화 (이전/다음, 검색, 진도 계산용)
  const FLAT = [];
  C.sections.forEach(sec => sec.items.forEach(it => FLAT.push(Object.assign({ section: sec.title }, it))));

  const contentEl = $("#content");
  const DOC_CACHE = {};

  /* ---------------- 유틸 ---------------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function dirOf(path) { const i = path.lastIndexOf("/"); return i < 0 ? "" : path.slice(0, i); }
  function resolvePath(baseDir, rel) {
    if (/^(https?:|data:|mailto:)/i.test(rel)) return rel;
    const stack = baseDir ? baseDir.split("/") : [];
    rel.split("/").forEach(part => {
      if (part === "" || part === ".") return;
      if (part === "..") stack.pop();
      else stack.push(part);
    });
    return stack.join("/");
  }
  function slug(t) {
    return String(t).trim().toLowerCase().replace(/[^\w가-힣]+/g, "-").replace(/^-+|-+$/g, "");
  }

  /* ---------------- 진도(localStorage) ---------------- */
  const doneKey = p => "lms:done:" + p;
  const taskKey = (p, i) => "lms:task:" + p + "#" + i;
  const isDone = p => LS.getItem(doneKey(p)) === "1";
  function setDone(p, v) {
    if (v) LS.setItem(doneKey(p), "1"); else LS.removeItem(doneKey(p));
    refreshProgressUI();
  }
  function progressPct() {
    const done = FLAT.filter(i => isDone(i.path)).length;
    return FLAT.length ? Math.round((done / FLAT.length) * 100) : 0;
  }
  function refreshProgressUI() {
    const pct = progressPct();
    const fill = $("#topProgressFill"), txt = $("#topProgressPct");
    if (fill) fill.style.width = pct + "%";
    if (txt) txt.textContent = pct + "%";
    $$(".nav-item").forEach(a => a.classList.toggle("done", isDone(a.dataset.path)));
    const hero = $("#heroFill"), heroT = $("#heroPctTxt");
    if (hero) hero.style.width = pct + "%";
    if (heroT) heroT.textContent = pct + "% 완료 (" + FLAT.filter(i => isDone(i.path)).length + "/" + FLAT.length + " 문서)";
    $$(".day-card .mini span").forEach(sp => {
      const m = sp.closest(".day-card").dataset.match;
      const items = FLAT.filter(i => i.path.indexOf(m) === 0);
      const d = items.filter(i => isDone(i.path)).length;
      sp.style.width = (items.length ? (d / items.length) * 100 : 0) + "%";
    });
    $$(".deliverables a").forEach(a => {
      const dn = $(".dn", a);
      if (dn) dn.style.visibility = isDone(a.dataset.path) ? "visible" : "hidden";
    });
  }

  /* ---------------- 사이드바 ---------------- */
  function buildSidebar() {
    const tree = $("#navTree");
    tree.innerHTML = "";
    C.sections.forEach(sec => {
      const box = document.createElement("div");
      box.className = "nav-section";
      const h = document.createElement("div");
      h.className = "sec-title";
      h.innerHTML = "<span>" + escapeHtml(sec.title) + "</span>" + (sec.badge ? '<span class="badge">' + escapeHtml(sec.badge) + "</span>" : "");
      box.appendChild(h);
      sec.items.forEach(it => {
        const a = document.createElement("a");
        a.className = "nav-item";
        a.href = "#/" + it.path;
        a.dataset.path = it.path;
        a.dataset.title = it.title;
        const typeLabel = it.type === "practice" ? '<span class="type practice">연습</span>'
                         : it.type === "guide" ? '<span class="type">가이드</span>' : "";
        a.innerHTML = '<span class="tick">✓</span><span class="nm">' + escapeHtml(it.title) + "</span>" + typeLabel;
        a.addEventListener("click", () => closeSidebar());
        box.appendChild(a);
      });
      tree.appendChild(box);
    });
    refreshProgressUI();
  }
  function setActive(path) {
    $$(".nav-item").forEach(a => a.classList.toggle("active", a.dataset.path === path));
  }

  /* ---------------- 라우팅 ---------------- */
  function currentPath() {
    const h = location.hash;
    if (!h.startsWith("#/")) return null;        // 본문 내 앵커(#xxx)나 빈 해시는 라우트 아님
    return decodeURIComponent(h.slice(2));
  }
  async function route() {
    const p = currentPath();
    if (p === null) {
      if (location.hash === "" || location.hash === "#") renderDashboard();
      return; // 본문 앵커는 브라우저가 처리
    }
    if (p === "") { renderDashboard(); return; }
    await loadDoc(p);
  }

  /* ---------------- 문서 로드/렌더 ---------------- */
  async function loadDoc(path) {
    setActive(path);
    contentEl.innerHTML = '<div class="loading">⏳ 불러오는 중…</div>';
    let md;
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      md = await res.text();
      DOC_CACHE[path] = md;
    } catch (e) {
      contentEl.innerHTML = errorHtml(path, e);
      return;
    }
    if (typeof marked === "undefined") {
      contentEl.innerHTML = '<article class="doc"><pre>' + escapeHtml(md) + "</pre></article>";
      return;
    }
    const html = marked.parse(md);
    contentEl.innerHTML = '<article class="doc">' + html + "</article>";
    const article = $(".doc", contentEl);
    postProcess(article, path);
    renderDocFooter(path);
    window.scrollTo({ top: 0 });
  }

  function errorHtml(path, e) {
    const isFile = location.protocol === "file:";
    let body;
    if (isFile) {
      body = "<p><b>브라우저 보안 정책상 <code>file://</code> 로 직접 열면 .md 파일을 읽을 수 없습니다.</b></p>" +
        "<p>아래 방법으로 <u>로컬 서버</u>를 띄운 뒤 <code>http://localhost:8000</code> 으로 접속하세요.</p>" +
        "<ol><li>이 폴더의 <code>start.bat</code> 더블클릭 (가장 쉬움)</li>" +
        "<li>또는 터미널에서 <code>python -m http.server 8000</code> 실행</li>" +
        "<li>또는 VS Code <b>Live Server</b> 확장 사용</li></ol>";
    } else {
      body = "<p>파일을 불러오지 못했습니다: <code>" + escapeHtml(path) + "</code></p>" +
        "<p>오류: <code>" + escapeHtml(e.message || String(e)) + "</code></p>" +
        "<p>파일이 존재하는지, 경로가 맞는지 확인하세요.</p>";
    }
    return '<div class="error"><h2>⚠️ 콘텐츠를 표시할 수 없습니다</h2>' + body + "</div>";
  }

  function postProcess(article, path) {
    const base = dirOf(path);

    // 1) Mermaid: <code.language-mermaid> → <div.mermaid>
    const mNodes = [];
    $$("code.language-mermaid", article).forEach(code => {
      const div = document.createElement("div");
      div.className = "mermaid";
      div.textContent = code.textContent;       // 원본 소스(<br/> 리터럴 유지)
      const pre = code.closest("pre") || code;
      pre.replaceWith(div);
      mNodes.push(div);
    });
    if (mNodes.length && typeof mermaid !== "undefined") {
      try { mermaid.run({ nodes: mNodes }); } catch (e) { /* noop */ }
    }

    // 2) 코드 하이라이트 (mermaid 제외)
    if (typeof hljs !== "undefined") {
      $$("pre code", article).forEach(c => {
        if (!c.classList.contains("language-mermaid")) { try { hljs.highlightElement(c); } catch (e) {} }
      });
    }

    // 3) 이미지 상대경로 보정
    $$("img", article).forEach(img => {
      const src = img.getAttribute("src") || "";
      if (!/^(https?:|data:)/i.test(src)) img.setAttribute("src", resolvePath(base, src));
    });

    // 4) 링크: 내부 .md/폴더 → 앱 라우트, 외부 → 새 탭
    $$("a", article).forEach(a => {
      const href = a.getAttribute("href") || "";
      if (/^(https?:|mailto:)/i.test(href)) { a.target = "_blank"; a.rel = "noopener"; return; }
      if (href.startsWith("#")) return;                 // 본문 내 앵커
      const clean = href.replace(/[#?].*$/, "");
      const resolved = resolvePath(base, clean);
      if (/\.md$/i.test(resolved)) {
        a.setAttribute("href", "#/" + resolved);
      } else {
        const folder = resolved.replace(/\/$/, "");
        const match = FLAT.find(it => it.path === folder || it.path.indexOf(folder + "/") === 0);
        if (match) a.setAttribute("href", "#/" + match.path);
        else { a.target = "_blank"; a.rel = "noopener"; }
      }
    });

    // 5) 제목 id (앵커 이동용)
    $$("h1,h2,h3", article).forEach(h => { if (!h.id) h.id = slug(h.textContent); });

    // 6) 실습 체크리스트: 활성화 + 저장
    const boxes = $$("li.task-list-item input[type=checkbox], li input[type=checkbox]", article);
    boxes.forEach((box, idx) => {
      box.disabled = false;
      const li = box.closest("li");
      if (li) li.classList.add("task-list-item");
      if (LS.getItem(taskKey(path, idx)) === "1") { box.checked = true; if (li) li.classList.add("checked"); }
      box.addEventListener("change", () => {
        if (box.checked) LS.setItem(taskKey(path, idx), "1"); else LS.removeItem(taskKey(path, idx));
        if (li) li.classList.toggle("checked", box.checked);
        maybeAutoComplete(path, boxes);
      });
    });
  }

  function maybeAutoComplete(path, boxes) {
    if (boxes.length && boxes.every(b => b.checked) && !isDone(path)) {
      setDone(path, true);
      const btn = $("#completeBtn");
      if (btn) markBtn(btn, true);
    }
  }

  /* ---------------- 문서 푸터(완료/이전·다음) ---------------- */
  function markBtn(btn, done) {
    btn.classList.toggle("is-done", done);
    btn.textContent = done ? "✓ 완료함 (클릭하여 취소)" : "○ 이 강의 완료 표시";
  }
  function renderDocFooter(path) {
    const idx = FLAT.findIndex(i => i.path === path);
    const prev = idx > 0 ? FLAT[idx - 1] : null;
    const next = idx >= 0 && idx < FLAT.length - 1 ? FLAT[idx + 1] : null;

    const foot = document.createElement("div");
    foot.className = "doc-footer";
    const btn = document.createElement("button");
    btn.id = "completeBtn";
    btn.className = "complete-btn";
    markBtn(btn, isDone(path));
    btn.addEventListener("click", () => { const v = !isDone(path); setDone(path, v); markBtn(btn, v); });
    foot.appendChild(btn);

    const nav = document.createElement("div");
    nav.className = "nav-btns";
    nav.innerHTML =
      '<a class="' + (prev ? "" : "disabled") + '" href="' + (prev ? "#/" + prev.path : "#") + '">← ' + (prev ? escapeHtml(prev.title) : "이전") + "</a>" +
      '<a class="' + (next ? "" : "disabled") + '" href="' + (next ? "#/" + next.path : "#") + '">' + (next ? escapeHtml(next.title) : "다음") + " →</a>";
    foot.appendChild(nav);
    contentEl.appendChild(foot);
  }

  /* ---------------- 대시보드 ---------------- */
  function renderDashboard() {
    setActive("__home__");
    const dayCards = C.cards.map(d =>
      '<a class="day-card" data-match="' + d.match + '" href="#/' + d.go + '">' +
        '<span class="t">' + escapeHtml(d.label) + "</span>" +
        '<span class="s">' + escapeHtml(d.sub) + "</span>" +
        '<span class="mini"><span></span></span>' +
      "</a>").join("");

    const delItems = FLAT.filter(i => i.deliverable).map(i =>
      '<a data-path="' + i.path + '" href="#/' + i.path + '">' +
        '<span class="dot"></span>' + escapeHtml(i.deliverable) +
        ' <span style="color:var(--ink-soft);font-size:11px;margin-left:6px">(' + escapeHtml(i.title) + ")</span>" +
        '<span class="dn">✓ 완료</span>' +
      "</a>").join("");

    contentEl.innerHTML =
      '<div class="dash">' +
        '<div class="hero">' +
          "<h1>🎮 " + escapeHtml(C.title) + "</h1>" +
          "<p>" + escapeHtml(C.subtitle) + " · 4개 협업툴을 혼자 따라 하며 익히는 가이드</p>" +
          '<div class="hero-prog"><div class="bar"><span id="heroFill"></span></div><small id="heroPctTxt"></small></div>' +
        "</div>" +
        '<div class="section-h">🧭 가이드 한눈에 (클릭하여 시작)</div>' +
        '<div class="day-grid">' + dayCards + "</div>" +
        '<div class="section-h">✋ 직접 만들어보기</div>' +
        '<div class="deliverables">' + delItems + "</div>" +
        '<div class="section-h">📚 먼저 읽기</div>' +
        '<div class="deliverables">' +
          '<a href="#/README.md"><span class="dot" style="background:var(--brand)"></span>가이드 소개 (README)</a>' +
          '<a href="#/00_Overview/00_Curriculum_Overview.md"><span class="dot" style="background:var(--brand)"></span>이 가이드 사용법</a>' +
        "</div>" +
      "</div>";
    refreshProgressUI();
  }

  /* ---------------- 검색 ---------------- */
  function filterSidebar(q) {
    const term = q.trim().toLowerCase();
    $$(".nav-section").forEach(sec => {
      let any = false;
      $$(".nav-item", sec).forEach(a => {
        const hit = !term || a.dataset.title.toLowerCase().includes(term);
        a.style.display = hit ? "" : "none";
        if (hit) any = true;
      });
      sec.style.display = any ? "" : "none";
    });
  }
  async function getText(path) {
    if (DOC_CACHE[path] != null) return DOC_CACHE[path];
    try { const r = await fetch(path, { cache: "no-store" }); DOC_CACHE[path] = r.ok ? await r.text() : ""; }
    catch (e) { DOC_CACHE[path] = ""; }
    return DOC_CACHE[path];
  }
  async function fullTextSearch(q) {
    const term = q.trim();
    if (!term) { route(); return; }
    contentEl.innerHTML = '<div class="loading">🔎 “' + escapeHtml(term) + '” 전체 검색 중…</div>';
    await Promise.all(FLAT.map(i => getText(i.path)));
    const low = term.toLowerCase();
    const hits = [];
    FLAT.forEach(i => {
      const text = (DOC_CACHE[i.path] || "");
      const pos = text.toLowerCase().indexOf(low);
      if (pos >= 0) {
        const start = Math.max(0, pos - 40);
        const raw = text.slice(start, pos + term.length + 60).replace(/\s+/g, " ");
        const snip = escapeHtml(raw).replace(new RegExp(escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), m => "<mark>" + m + "</mark>");
        hits.push({ i, snip });
      }
    });
    contentEl.innerHTML =
      '<div class="doc search-results"><h2>🔎 검색 결과: “' + escapeHtml(term) + "” (" + hits.length + "건)</h2>" +
      (hits.length ? hits.map(h =>
        '<a class="hit" href="#/' + h.i.path + '"><b>' + escapeHtml(h.i.title) + "</b> <small>" + escapeHtml(h.i.section) + "</small><small>…" + h.snip + "…</small></a>"
      ).join("") : "<p>일치하는 내용이 없습니다.</p>") + "</div>";
  }

  /* ---------------- 테마 ---------------- */
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    const lit = $("#hljs-light"), dk = $("#hljs-dark");
    if (lit) lit.disabled = t === "dark";
    if (dk) dk.disabled = t !== "dark";
    const btn = $("#themeBtn"); if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
    if (typeof mermaid !== "undefined") {
      try { mermaid.initialize({ startOnLoad: false, theme: t === "dark" ? "dark" : "default", securityLevel: "loose", flowchart: { htmlLabels: true } }); } catch (e) {}
    }
    LS.setItem("lms:theme", t);
  }
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    if (currentPath()) route();   // 열린 문서가 있으면 Mermaid 재렌더 위해 새로고침
  }

  /* ---------------- 모바일 사이드바 ---------------- */
  function openSidebar() { $("#sidebar").classList.add("open"); $("#backdrop").hidden = false; }
  function closeSidebar() { $("#sidebar").classList.remove("open"); $("#backdrop").hidden = true; }

  /* ---------------- 초기화 ---------------- */
  function init() {
    document.title = C.title + " · LMS";
    const bt = $("#brandTitle"), bs = $("#brandSub");
    if (bt) bt.textContent = C.title;
    if (bs) bs.textContent = C.subtitle;

    const saved = LS.getItem("lms:theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(saved);

    buildSidebar();

    $("#themeBtn").addEventListener("click", toggleTheme);
    $("#menuBtn").addEventListener("click", () => ($("#sidebar").classList.contains("open") ? closeSidebar() : openSidebar()));
    $("#backdrop").addEventListener("click", closeSidebar);
    $("#resetBtn").addEventListener("click", () => {
      if (confirm("모든 진도와 실습 체크 기록을 지울까요? (되돌릴 수 없습니다)")) {
        Object.keys(LS).filter(k => k.startsWith("lms:done:") || k.startsWith("lms:task:")).forEach(k => LS.removeItem(k));
        refreshProgressUI(); route();
      }
    });
    const si = $("#searchInput");
    si.addEventListener("input", e => filterSidebar(e.target.value));
    si.addEventListener("keydown", e => { if (e.key === "Enter") fullTextSearch(e.target.value); });

    window.addEventListener("hashchange", route);
    route();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

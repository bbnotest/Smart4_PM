/* ============================================================
   app.js — LMS 동작 로직 (의존: curriculum.js, marked, mermaid, highlight.js)
   - 상단 "학습 선택" 드롭다운으로 트랙(툴) 선택
   - 왼쪽 사이드바는 현재 트랙의 학습 단계만 표시
   - .md 를 fetch 해서 렌더 (Markdown→HTML, Mermaid, 코드 하이라이트)
   - 진도/테마 기능 없음 (라이트 전용)
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const C  = window.CURRICULUM;

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
  function sectionOf(path) { return C.sections.find(sec => sec.items.some(it => it.path === path)); }

  /* ---------------- 상단 "학습 선택" 드롭다운 ---------------- */
  function buildTrackMenu() {
    const menu = $("#trackMenu");
    let html = '<a href="#/" class="tm-item tm-home">대시보드</a>';
    C.sections.forEach(sec => {
      const first = sec.items[0];
      if (!first) return;
      html += '<a href="#/' + first.path + '" class="tm-item" data-sec="' + sec.id + '">' + escapeHtml(sec.title) + "</a>";
    });
    menu.innerHTML = html;
  }

  /* ---------------- 사이드바 (현재 트랙의 단계만) ---------------- */
  function renderSidebar(path) {
    const tree = $("#navTree");
    const titleEl = $("#sideTitle");
    const sec = path ? sectionOf(path) : null;
    if (!sec) {
      if (titleEl) titleEl.textContent = "";
      tree.innerHTML = '<div class="side-hint">상단의 <b>학습 선택 ▾</b> 에서<br>학습할 툴을 골라주세요.</div>';
      return;
    }
    if (titleEl) titleEl.textContent = sec.title.replace(/^[^\w가-힣]+/, "").trim() + " · 학습 단계";
    let html = "", lastGroup = null;
    sec.items.forEach(it => {
      if (it.group && it.group !== lastGroup) html += '<div class="side-group">' + escapeHtml(it.group) + "</div>";
      lastGroup = it.group || null;
      const tag = it.type === "practice" ? '<span class="type practice">연습</span>'
                : it.type === "guide" ? '<span class="type">개요</span>' : "";
      html += '<a class="nav-item' + (it.path === path ? " active" : "") + '" href="#/' + it.path + '" data-path="' + it.path + '" data-title="' + escapeHtml(it.title) + '"><span class="nm">' + escapeHtml(it.title) + "</span>" + tag + "</a>";
    });
    tree.innerHTML = html;
    $$(".nav-item", tree).forEach(a => a.addEventListener("click", closeSidebar));
  }

  /* ---------------- 라우팅 ---------------- */
  function currentPath() {
    const h = location.hash;
    if (!h.startsWith("#/")) return null;
    return decodeURIComponent(h.slice(2));
  }
  async function route() {
    const p = currentPath();
    if (p === null) {
      if (location.hash === "" || location.hash === "#") renderDashboard();
      return;
    }
    if (p === "") { renderDashboard(); return; }
    await loadDoc(p);
  }

  /* ---------------- 문서 로드/렌더 ---------------- */
  async function loadDoc(path) {
    document.body.dataset.view = "doc";
    renderSidebar(path);
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
    contentEl.innerHTML = '<article class="doc">' + marked.parse(md) + "</article>";
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
        "<p>오류: <code>" + escapeHtml(e.message || String(e)) + "</code></p>";
    }
    return '<div class="error"><h2>⚠️ 콘텐츠를 표시할 수 없습니다</h2>' + body + "</div>";
  }

  function postProcess(article, path) {
    const base = dirOf(path);

    // 1) Mermaid
    const mNodes = [];
    $$("code.language-mermaid", article).forEach(code => {
      const div = document.createElement("div");
      div.className = "mermaid";
      div.textContent = code.textContent;
      const pre = code.closest("pre") || code;
      pre.replaceWith(div);
      mNodes.push(div);
    });
    if (mNodes.length && typeof mermaid !== "undefined") {
      try { mermaid.run({ nodes: mNodes }); } catch (e) {}
    }

    // 2) 코드 하이라이트
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

    // 4) 링크 보정
    $$("a", article).forEach(a => {
      const href = a.getAttribute("href") || "";
      if (/^(https?:|mailto:)/i.test(href)) { a.target = "_blank"; a.rel = "noopener"; return; }
      if (href.startsWith("#")) return;
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

    // 5) 제목 id
    $$("h1,h2,h3", article).forEach(h => { if (!h.id) h.id = slug(h.textContent); });

    // 6) 체크리스트: 클릭 가능 (저장하지 않음 — 진도 기능 없음)
    $$("li input[type=checkbox]", article).forEach(box => {
      box.disabled = false;
      const li = box.closest("li");
      if (li) li.classList.add("task-list-item");
      box.addEventListener("change", () => { if (li) li.classList.toggle("checked", box.checked); });
    });
  }

  /* ---------------- 문서 푸터(이전·다음, 현재 트랙 내) ---------------- */
  function renderDocFooter(path) {
    const sec = sectionOf(path);
    let prev = null, next = null;
    if (sec) {
      const idx = sec.items.findIndex(it => it.path === path);
      if (idx > 0) prev = sec.items[idx - 1];
      if (idx >= 0 && idx < sec.items.length - 1) next = sec.items[idx + 1];
    }
    const foot = document.createElement("div");
    foot.className = "doc-footer";
    foot.innerHTML =
      '<a class="navbtn ' + (prev ? "" : "disabled") + '" href="' + (prev ? "#/" + prev.path : "#") + '">← ' + (prev ? escapeHtml(prev.title) : "이전") + "</a>" +
      '<a class="navbtn ' + (next ? "" : "disabled") + '" href="' + (next ? "#/" + next.path : "#") + '">' + (next ? escapeHtml(next.title) : "이 트랙의 마지막") + " →</a>";
    contentEl.appendChild(foot);
  }

  /* ---------------- 대시보드 (트랙 선택 카드) ---------------- */
  function renderDashboard() {
    document.body.dataset.view = "home";
    renderSidebar(null);
    const cards = C.cards.map(d =>
      '<a class="vcard" href="#/' + d.go + '">' +
        '<img class="cover" src="' + d.cover + '" alt="" />' +
        '<div class="vc-name">' + escapeHtml(d.label) + "</div>" +
        '<div class="vc-desc">' + escapeHtml(d.sub) + "</div>" +
      "</a>").join("");
    contentEl.innerHTML =
      '<div class="home"><div class="home-inner">' +
        '<h1 class="home-title">🎮 ' + escapeHtml(C.title) + "</h1>" +
        '<p class="home-sub">' + escapeHtml(C.subtitle) + " · 어느 회사가 무슨 툴을 쓰든 자신 있게.</p>" +
        '<div class="track-row">' + cards + "</div>" +
      "</div></div>";
  }

  /* ---------------- 검색 ---------------- */
  function filterSidebar(q) {
    const term = q.trim().toLowerCase();
    $$("#navTree .nav-item").forEach(a => {
      const hit = !term || (a.dataset.title || "").toLowerCase().includes(term);
      a.style.display = hit ? "" : "none";
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
    document.body.dataset.view = "doc";
    contentEl.innerHTML = '<div class="loading">🔎 “' + escapeHtml(term) + '” 검색 중…</div>';
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
    renderSidebar(null);
    contentEl.innerHTML =
      '<div class="doc search-results"><h2>🔎 검색 결과: “' + escapeHtml(term) + "” (" + hits.length + "건)</h2>" +
      (hits.length ? hits.map(h =>
        '<a class="hit" href="#/' + h.i.path + '"><b>' + escapeHtml(h.i.title) + "</b> <small>" + escapeHtml(h.i.section) + "</small><small>…" + h.snip + "…</small></a>"
      ).join("") : "<p>일치하는 내용이 없습니다.</p>") + "</div>";
  }

  /* ---------------- 모바일 사이드바 ---------------- */
  function openSidebar() { $("#sidebar").classList.add("open"); $("#backdrop").hidden = false; }
  function closeSidebar() { $("#sidebar").classList.remove("open"); $("#backdrop").hidden = true; }

  /* ---------------- 이미지 확대(라이트박스) ----------------
     .doc 안의 이미지를 클릭하면 전체화면 확대, 다시 누르면(오버레이·이미지·✕·Esc) 닫힘.
     #content 에 위임 등록 → 문서가 다시 렌더돼도 계속 동작. 대시보드 카드(.doc 밖)는 제외. */
  function setupLightbox() {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.hidden = true;
    lb.innerHTML = '<span class="lb-close" aria-hidden="true">✕</span><img alt="" /><div class="lb-hint">클릭하면 닫힙니다 · Esc</div>';
    document.body.appendChild(lb);
    const lbImg = $("img", lb);

    function open(src, alt) {
      if (!src) return;
      lbImg.src = src; lbImg.alt = alt || "";
      lb.hidden = false; document.body.classList.add("lb-open");
      requestAnimationFrame(() => lb.classList.add("open"));
    }
    function close() {
      lb.classList.remove("open"); lb.hidden = true;
      lbImg.removeAttribute("src"); document.body.classList.remove("lb-open");
    }

    contentEl.addEventListener("click", e => {
      const img = e.target.closest(".doc img");
      if (!img) return;
      e.preventDefault();
      open(img.currentSrc || img.getAttribute("src"), img.alt);
    });
    lb.addEventListener("click", close);                 // 다시 누르면 확대 꺼짐
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) close(); });
  }

  /* ---------------- 초기화 ---------------- */
  function init() {
    document.title = C.title + " · LMS";
    const bt = $("#brandTitle"); if (bt) bt.textContent = C.title;

    if (typeof mermaid !== "undefined") {
      try { mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose", flowchart: { htmlLabels: true } }); } catch (e) {}
    }

    buildTrackMenu();
    setupLightbox();

    const trackMenu = $("#trackMenu");
    $("#trackBtn").addEventListener("click", () => { trackMenu.hidden = !trackMenu.hidden; });
    document.addEventListener("click", e => {
      if (trackMenu.hidden || e.target.closest("#trackBtn")) return;
      trackMenu.hidden = true;   // 메뉴 항목·바깥 어디를 눌러도 닫힘
    });

    $("#menuBtn").addEventListener("click", () => ($("#sidebar").classList.contains("open") ? closeSidebar() : openSidebar()));
    $("#backdrop").addEventListener("click", closeSidebar);

    const si = $("#searchInput");
    si.addEventListener("input", e => filterSidebar(e.target.value));
    si.addEventListener("keydown", e => { if (e.key === "Enter") fullTextSearch(e.target.value); });

    window.addEventListener("hashchange", route);
    route();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

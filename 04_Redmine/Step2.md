# 🟥 Redmine · 2단계 — 관리자 설정 & 프로젝트

> 🎯 이번 단계 목표: **기본 구성을 불러오고, 프로젝트를 만든다.**
> 📍 [← 1단계](Step1.md) · 다음 [3단계 →](Step3.md)

---

## A. 관리자 초기 설정

1. **admin / admin** 로그인 → 비밀번호 변경
2. 상단 **`Administration`**(관리) 진입
3. 트래커/상태/역할이 비어 있으면 **`Load the default configuration`**(기본 구성 불러오기) 클릭
   → 기본 트래커(Bug/Feature/Support)·상태·역할이 생깁니다
4. (선택) Administration → Settings → Display 에서 언어를 한국어로

> 🙋 **이걸 안 하면** 트래커가 없어서 이슈를 못 만듭니다. **꼭 한 번** 눌러주세요.

## B. 프로젝트 만들기

1. 상단 **`Projects` → `New project`**
2. Name `Pixel Dungeon`
3. **Modules(모듈)** 체크(중요!): `Issue tracking` · **`Gantt`** · `Calendar` · `Time tracking` · **`Roadmap`** · `Wiki`
4. **Trackers** 에서 Bug/Feature/Support 체크 → **Create**

> 🙋 나중에 **Gantt 탭이 없으면** 이 모듈 체크를 빠뜨린 것 → Settings → Modules 에서 다시 켜기.

> 🖼️ 공식 스크린샷 자리 — 프로젝트 생성/모듈

---

## ✅ 확인

- [ ] 기본 구성을 불러왔다 (트래커가 보인다)
- [ ] 프로젝트가 만들어지고 Gantt·Roadmap 탭이 보인다

---

👉 다음: **[3단계 · 이슈와 WBS](Step3.md)**

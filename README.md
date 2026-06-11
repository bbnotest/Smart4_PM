# 🎮 게임 개발 PM을 위한 협업툴 실습 커리큘럼

> **Jira · Asana · Redmine · Trello** — 4개 협업툴을 1주 만에 "현업에서 바로 쓸 수 있는" 수준으로 익히는 실습 중심 교육 과정

이 커리큘럼은 **게임 개발 PM(프로젝트 매니저)을 지망하는 학생**을 대상으로 합니다.
학생들은 이미 학원 커리큘럼에서 게임 개발 프로젝트와 매니징 실습을 경험하여 **WBS · Gantt · Kanban 개념은 이해**하고 있으나, **현업에서 실제로 쓰는 툴 경험이 없습니다.** 이 과정은 그 간극을 메웁니다.

> 📖 **이 자료의 성격** — 강의 교안이 아니라 **혼자 보고 그대로 따라 하는 참고 가이드**입니다. 각 툴 가이드를 끝까지 따라 하면 **면접에서 "이 툴 쓸 줄 압니다"라고 말할 수 있는 수준**을 목표로 합니다. 각 가이드 맨 끝의 **🎤 "면접에서 이렇게 말하세요"** 섹션을 꼭 활용하세요.
>
> 🌐 **온라인으로 보기(LMS)** → **https://bbnotest.github.io/Smart4_PM/** — 설치 없이 브라우저에서 바로 읽고, 진도·실습 체크까지.

---

## 🎯 이 과정을 마치면

- 4개 협업툴 각각에서 **계정 생성 → 프로젝트 셋업 → 작업 관리 → 결과물 산출**까지 혼자 할 수 있습니다.
- 이미 아는 **WBS / Gantt / Kanban** 개념을 각 툴의 실제 기능·용어로 **연결**할 수 있습니다.
- 상황(팀 규모·예산·개발 방식)에 맞는 **툴을 선택**할 수 있는 안목을 갖춥니다.
- 본인의 결과물(보드·백로그·스프린트·타임라인·Gantt)을 **포트폴리오**로 남깁니다.

---

## 🗂️ 폴더 구조 & 읽는 순서

| 순서 | 경로 | 내용 |
|:--:|---|---|
| 1 | [`00_Overview/00_Curriculum_Overview.md`](00_Overview/00_Curriculum_Overview.md) | 과정 개요 · **5일 일정** · 준비물 · 산출물 · 평가 |
| 2 | [`00_Overview/01_PM_Concepts_to_Tools.md`](00_Overview/01_PM_Concepts_to_Tools.md) | WBS/Gantt/Kanban 개념 → **4개 툴 용어 매핑(로제타표)** |
| 3 | [`00_Overview/02_Tool_Comparison_Matrix.md`](00_Overview/02_Tool_Comparison_Matrix.md) | **비교표** · 무료 한도 · "어떤 상황에 어떤 툴" 선택 가이드 |
| 4 | [`00_Overview/03_Game_Project_Scenario.md`](00_Overview/03_Game_Project_Scenario.md) | **공통 실습 시나리오** — 모든 툴 실습에 쓰는 게임 프로젝트 |
| 5 | [`01_Trello/`](01_Trello/) | Day 1 — Trello (Kanban 입문) · Guide + Practice |
| 6 | [`02_Jira/`](02_Jira/) | Day 2~3 — Jira (애자일/스크럼 표준) · Guide + Practice |
| 7 | [`03_Asana/`](03_Asana/) | Day 3 — Asana (직관적 작업관리) · Guide + Practice |
| 8 | [`04_Redmine/`](04_Redmine/) | Day 4 — Redmine (오픈소스·내장 Gantt) · Guide + Practice |
| 9 | [`05_Capstone/Capstone.md`](05_Capstone/Capstone.md) | Day 5 — 4툴 종합 · 툴 선택 캡스톤 |
| — | [`90_Instructor/`](90_Instructor/) | **강사용** — 강의 진행 가이드 · 평가 루브릭 |

> 각 툴 폴더는 **`Guide.md`(개념+단계별 따라하기)** 와 **`Practice.md`(결과물을 만드는 실습 랩)** 로 구성됩니다.

---

## 👩‍🎓 학습자용 / 👨‍🏫 강사용

- **학생(자습)**: `00_Overview` 4종을 읽고 → 각 Day 폴더의 `Guide.md`를 **따라 하며** → `Practice.md`의 결과물을 직접 만듭니다.
- **강사(수업)**: [`90_Instructor/Instructor_Guide.md`](90_Instructor/Instructor_Guide.md)의 일자별 진행안·타이밍·함정 노트와 [`90_Instructor/Assessment_Rubric.md`](90_Instructor/Assessment_Rubric.md)의 평가 기준을 사용합니다.

---

## 🖼️ 시각자료 표기 규칙 (중요)

이 교재의 그림은 세 종류이며, 각각 의미가 다릅니다.

1. **Mermaid 다이어그램** — 코드블록으로 삽입된 계층도/간트/흐름도. GitHub·VS Code(Markdown Preview Mermaid 확장)·Obsidian·Typora 등에서 자동 렌더링됩니다.
2. **SVG 목업** — 각 툴 화면을 본뜬 와이어프레임. 실제 UI의 위치·구조를 빠르게 이해시키는 용도입니다(실제 화면과 100% 동일하지 않음).
3. **🖼️ 공식 스크린샷 자리표시** — 아래 형식의 인용 블록. **실제 라이브 화면 캡처가 들어갈 자리**이며, 공식 출처 URL이 함께 적혀 있습니다. 강사/제작자가 해당 화면을 직접 캡처해 삽입하세요.

```
> 🖼️ 공식 스크린샷 자리 — [툴]: [화면 이름]
> 캡션: "무엇을 보여주는 화면인지"
> 공식 출처: https://...   ← 이 페이지에서 캡처
```

> **왜 자리표시인가?** Jira·Asana·Trello·Redmine의 라이브 화면은 저작권이 있고 UI가 수시로 바뀝니다. 교재 제작 시점의 **공식 문서 화면을 직접 캡처**하는 것이 가장 정확하고 안전합니다. 본 교재는 그 위치·캡션·출처를 모두 지정해 두었습니다.

---

## 📌 4개 툴 한눈에

| 툴 | 한 줄 정체성 | 무료로 가장 잘하는 것 | 비고 |
|---|---|---|---|
| **Trello** | 카드를 끌어다 놓는 가장 쉬운 **Kanban 보드** | Kanban(★ 네이티브) | 입문용 최적 |
| **Jira** | 게임/IT 업계 표준 **애자일·스크럼** 도구 | 백로그·스프린트·보드·Timeline | 현업 채용시장 1순위 |
| **Asana** | 깔끔한 UX의 **작업·일정 관리** | List·Board·Calendar | Timeline(Gantt)은 유료 |
| **Redmine** | 무료·오픈소스 **자체 호스팅** 트래커 | 내장 Gantt·이슈추적 | 직접 설치(Docker) 필요 |

자세한 비교와 "왜 4개 다 배우는가"는 [`02_Tool_Comparison_Matrix.md`](00_Overview/02_Tool_Comparison_Matrix.md)를 참고하세요.

---

## ⚠️ 시작 전 꼭 알아둘 것 (무료 요금제 한계)

무료 플랜만으로는 4개 툴 전부에서 Gantt·Kanban을 **똑같이** 만들 수 없습니다. 이는 결함이 아니라 **각 툴의 설계 철학**입니다. 본 과정은 각 툴의 강점으로 핵심을 가르치고, 빈 기능은 무료 대체법 또는 선택적 14일 체험판으로 보완합니다. (상세: 비교표 문서)

---

*제작 기준: 2026년 6월 · 각 툴 공식 문서 확인 완료 · Redmine 6.1.2 기준*

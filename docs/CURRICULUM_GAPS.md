# 교안 기능 설명 누락 — 보강 백로그

> 2026-06-14 3트랙(Jira·Asana·Trello) 병렬 라이브 리뷰 결과.
> 핵심 골격은 탄탄. **공통 약점: "항목 만들기"는 충실한데 "완료 표시·본문(Description)·분류 필드"가 얇음.**
> 🔴 = 우선 보강 / 🟡 = 선택. 모두 **무료 티어 기능**이며, 각 툴 자기 내용으로만 추가할 것.

---

## 🟦 Jira (10단계)
분류·기술 필드가 비어 있어, 뒤 단계(JQL·대시보드)가 "데이터가 채워졌다"고 가정 → 정합성 구멍.

### 🔴 우선
- **라벨(Labels) & 컴포넌트(Components)** — *현재: 이름만 스침, 실제 부여 0.* 라벨(`bug`/`combat`/`art`/`hotfix`)·컴포넌트(전투/던전/UI/오디오)는 매일 쓰는 기본 분류. Step8 JQL·Step10 파이차트가 이미 전제. **넣을 곳: Step3 백로그(에픽연결+포인트+담당 옆에 라벨 1~2개).**
- **이슈 상세 패널 한 바퀴 (특히 Description 본문)** — *현재: 필드가 Step3/4/7에 흩어짐, Description은 Bug에만.* "이슈 하나를 열면 무엇이 있나"(Description/Reporter/Due/Labels/Priority/Linked)를 통으로 본 적이 없음. **넣을 곳: Step3 "이슈 상세 한눈에" 미니 그림/표 1개.**
- **Priority 필드 (계획 작업에도)** — *현재: 버그 한정.* 우선순위는 말로만(Step3) 나오고 필드는 Bug(Step7)에서 처음 → Step8 블로커 JQL·Step10 차트가 전제. **넣을 곳: Step3 또는 Step4 스프린트 담기 직전.**

### 🟡 선택
- 백로그 ↔ 보드 = 같은 데이터의 두 화면 (멘탈모델 1~2문장, Step4 도입)
- Scrum vs Kanban 보드 선택 — 라이브 운영엔 칸반 (Step6 또는 Capstone 교차)
- 스프린트 종료(Complete sprint) & 미완료 이월 — 시작만 있고 닫기가 없음 (Step6)
- 이슈 링크 blocks/relates/duplicates — 현재 에픽 의존성만 (Step7 또는 Step3 끝)
- 퀵필터 & 스윔레인 (보드 가독성, Step4 B)
- 버전(Releases) & Fix version — Affects version만 가르치고 Fix version 비대칭 (Step7)

---

## 🟧 Asana (8단계)
일상 운영 동작이 빠짐.

### 🔴 우선
- **태스크 완료 처리(원형 체크 = Mark complete)** — *현재: 완전 누락.* 8단계 내내 만들기만 하고 "끝낸 표시"가 없음. 가장 치명적. 연쇄로 `Completed/Incomplete 필터`, 줄 그어짐도 빠짐. **넣을 곳: Step3 끝 또는 Step7.**
- **Inbox(받은 편지함)·알림** — *현재: 완전 누락.* @멘션·배정을 가르치면서 "어디로 오나"(좌측 Inbox)가 없음 → 협업 순환이 반만. **넣을 곳: Step5 말미 한 블록.**
- **반복 태스크(Set to repeat)** — *현재: 누락.* 주간 빌드·정기 QA 같은 운영 리듬(무료). **넣을 곳: Step4 또는 Step7.**
- **멀티홈잉(1 태스크 → 여러 프로젝트, Add to projects)** — *현재: 누락.* Asana 고유 모델, My Tasks와 직결. **넣을 곳: Step7 짧은 블록.**

### 🟡 선택
- 협력자/팔로워(Collaborators) & 코멘트 좋아요 (Step5 1줄)
- 시작일(Start date) vs 마감일 (Step3/6 각주)
- 워크플로 갤러리 기본 템플릿으로 시작 가능 (Step1 1줄)
- 단축키(Tab+M 나에게 배정 등)·모바일 My Tasks (Step7 박스)

---

## 🟦 Trello (8단계)
가이드가 "함께 쓴다"를 전제하는데 정작 공유가 빠짐.

### 🔴 우선
- **보드 공유·멤버 초대·공개범위(Private/Workspace/Public)** — *현재: "협업자 10명" 숫자만, 초대 방법·가시성 0.* 가장 큰 구멍(가이드 콘셉트가 협업인데 부르는 법이 없음). 외주 아티스트·사운드 초대가 1단계. **넣을 곳: Step1 끝 또는 Step6 앞.**
- **카드 보관(Archive) vs 삭제(Delete) + 되살리기** — *현재: 리스트 보관만 1줄, 카드 0.* 스프린트 마감 표준 동작인데 차이를 안 가르쳐 초보가 삭제로 이력 날림. Butler "Done→보관"과도 직결. **넣을 곳: Step6 또는 Step3 끝.**
- **카드 Description + 마크다운** — *현재: 부재.* Step5가 체크리스트·첨부·코멘트만, 본문(AC·재현 절차)을 건너뜀. **넣을 곳: Step5 맨 앞.**
- **시작일(Start date) + 마감 알림(Due reminder)** — *현재: 마감일만.* `Dates` 팝업 안에 무료로 같이 있음. 일정 관리=PM 본업인데 알림이 없음. **넣을 곳: Step4 ③ 마감일 옆.**

### 🟡 선택
- 카드 다른 리스트/보드로 Move·Copy (스프린트 이월, Step6)
- Watch(구독) — 담당 아닌 리스크 카드 변경 알림 (Step5/6)
- 카드 커버(Cover) — 스프라이트/콘셉트 썸네일 (Step4 보조)
- 검색 연산자(`@me`/`label:`/`due:week`) + 전역 검색 vs 보드 필터 (Step6 1줄)

---

## 의도적 제외 (gap 아님 — 올바른 스코프)
- **Jira**: 관리자급(워크플로/권한 스킴, 필드 스킴), 고급 자동화, 엔터프라이즈(Advanced Roadmaps) — 초보 PM 범위 밖.
- **Asana**: Timeline(간트)·커스텀필드·마일스톤·Rules·대시보드·의존성·고급검색 — Step6/8에서 유료로 명시 + 무료 우회법 제공.
- **Trello**: Premium 뷰(Table/Calendar-뷰/Timeline/Dashboard/Map) — Step8에서 유료로 선 그음. (단, **무료 Calendar Power-Up·List Limits는 이미 커버.**)
- 이메일-투-보드·스티커·키보드 단축키 등 꾸미기/편의 — 분량 대비 가치 낮아 제외(원하면 "더 해보기" 링크 한 줄).

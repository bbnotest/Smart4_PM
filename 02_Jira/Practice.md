# 🟦 Jira 직접 해보기 (연습)

> [가이드](Guide.md)를 봤으니, 같은 예제 [Pixel Dungeon Run](../00_Overview/03_Game_Project_Scenario.md)로 **백로그 + Sprint 1 + Timeline**을 직접 만들어 보세요.

---

## 🎯 만들 것

1. 에픽 7개 + 스토리/태스크 9개로 구성된 **제품 백로그**
2. 5개 이슈(15pt)를 담아 **시작된 Sprint 1**
3. 에픽 일정·마일스톤이 표시된 **Timeline**

---

## ✋ 따라 만들기 — 백로그 & 스프린트

### 1. 프로젝트
- 팀관리형 **Scrum** 프로젝트: 이름 `Pixel Dungeon Run`, 키 `PDR`
- 왼쪽에 Backlog · Board · Timeline 메뉴 확인 (없으면 Project settings → Features에서 켜기)

### 2. 에픽 7개
- E1 기획 / E2 코어 플레이 / E3 던전·콘텐츠 / E4 메타 진행 / E5 UI/UX / E6 오디오 / E7 QA·출시

### 3. 스토리/태스크 9개 (백로그)

| 키 | 요약 | 타입 | 에픽 | 포인트 | 담당 |
|---|---|---|---|:--:|:--:|
| PDR-1 | US-01 플레이어 자동 전진 | Story | E2 | 3 | DEV |
| PDR-2 | US-02 점프(탭) | Story | E2 | 2 | DEV |
| PDR-3 | US-03 슬라이드 | Story | E2 | 2 | DEV |
| PDR-4 | US-04 충돌/게임오버 | Story | E2 | 3 | DEV |
| PDR-5 | US-05 절차적 생성 | Story | E3 | 5 | DEV |
| PDR-6 | US-06 점수 집계 | Story | E3 | 2 | DEV |
| PDR-7 | US-07 결과 화면 | Story | E5 | 3 | ART |
| PDR-8 | US-08 효과음 | Story | E6 | 2 | ART |
| PDR-9 | US-09 프로토 빌드 | **Task** | E7 | 3 | DEV |

- 9개 생성 + 에픽 연결 + 포인트 + 담당자 모두 입력

### 4. 서브태스크 (WBS 심화)
- **PDR-5**에 서브태스크 3개: `바닥 생성` / `플랫폼 배치` / `난이도 점증`

### 5. Sprint 1
- Sprint 생성, 기간 07/06~07/17
- PDR-1·2·4·5·9 (합 **15pt**)를 Sprint 1로 이동
- Sprint goal `M1 프로토타입` 입력 후 **Start sprint**
- Board에서 PDR-9를 `Done`, PDR-4를 `In Progress`로 이동

## ✋ 따라 만들기 — Timeline

### 6. 에픽 일정
- Timeline에서 E1~E7 막대를 시나리오 일정대로 배치(7/06~8/28)
- **E2 → E3** 의존성 연결
- 마일스톤/스프린트 표시 켜기 → M1~M4 확인

> 다 만들었으면 [백로그 목업](../assets/jira_backlog_mockup.svg) · [Timeline 목업](../assets/jira_timeline_mockup.svg)과 비교해 보세요.

---

## ✅ 스스로 점검

- [ ] 에픽 7개가 있다
- [ ] 스토리/태스크 9개가 에픽에 연결돼 있다
- [ ] 모든 이슈에 포인트·담당자가 있다
- [ ] 서브태스크가 1개 이상 있다
- [ ] Sprint 1이 **시작**되어 Board에 표시된다
- [ ] Timeline에 에픽 막대·마일스톤이 보인다

---

## 🚀 더 해보기 (선택)

- **번다운**: 이슈 몇 개를 Done 처리한 뒤 Reports → Burndown 확인
- **JQL 저장 필터**: `project = PDR AND assignee = currentUser()` 저장
- **버전**: Releases에서 M1~M4 버전 생성 후 이슈에 Fix version 지정
- **컬럼 추가**: Board 설정에서 `Review` 컬럼 추가

> 💡 Backlog·Board·Timeline 화면을 **캡처해두면 면접/포트폴리오 자료**로 좋습니다.

---

## ⚠️ 흔한 실수

- 에픽 연결을 빼먹음 → Timeline·필터가 비어 보임. **모든 스토리에 에픽**.
- 스프린트를 시작 안 하고 백로그에만 둠 → Board가 빔. **Start sprint** 필수.
- 포인트 필드를 못 찾음 → Project settings → Features → **Estimation** 켜기.

---

## ➡️ 다음

다음 툴: [Asana 가이드](../03_Asana/Guide.md) — 같은 작업을 더 직관적인 Asana의 섹션·태스크·다중 뷰로 관리해 봅니다.

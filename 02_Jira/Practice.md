# 🟦 Jira 직접 해보기 (연습)

> [가이드](Guide.md)를 봤으니, 같은 예제 [Pixel Dungeon](../00_Overview/03_Game_Project_Scenario.md)로 **백로그 + Sprint 1 + Timeline**을 직접 만들어 보세요.

---

## 🎯 만들 것

1. 에픽 7개 + 스토리/태스크 9개로 구성된 **제품 백로그**
2. 5개 이슈(15pt)를 담아 **시작된 Sprint 1**
3. 에픽 일정·마일스톤이 표시된 **Timeline**

---

## ✋ 따라 만들기 — 백로그 & 스프린트

### 1. 프로젝트
- 팀관리형 **Scrum** 프로젝트: 이름 `Pixel Dungeon`, 키 `PD`
- 왼쪽에 Backlog · Board · Timeline 메뉴 확인 (없으면 Project settings → Features에서 켜기)

### 2. 에픽 7개
- E1 기획 / E2 코어 플레이 / E3 던전·콘텐츠 / E4 메타 진행 / E5 UI/UX / E6 오디오 / E7 QA·출시

### 3. 스토리/태스크 9개 (백로그)

| 키 | 요약 | 타입 | 에픽 | 포인트 | 담당 |
|---|---|---|---|:--:|:--:|
| PD-1 | US-01 플레이어 이동 | Story | E2 | 3 | DEV |
| PD-2 | US-02 공격 입력 | Story | E2 | 2 | DEV |
| PD-3 | US-03 이동 처리 | Story | E2 | 2 | DEV |
| PD-4 | US-04 턴제 전투(HP) | Story | E2 | 3 | DEV |
| PD-5 | US-05 던전 생성 | Story | E3 | 5 | DEV |
| PD-6 | US-06 적 추적 AI | Story | E3 | 2 | DEV |
| PD-7 | US-07 게임오버 화면 | Story | E5 | 3 | ART |
| PD-8 | US-08 효과음 | Story | E6 | 2 | ART |
| PD-9 | US-09 프로토 빌드 | **Task** | E7 | 3 | DEV |

- 9개 생성 + 에픽 연결 + 포인트 + 담당자 모두 입력

> 🙋 **키 번호 안내** — 위 표는 보기 쉽게 `PD-1`부터 적었지만, **에픽 7개(2단계)를 먼저 만들면 그게 `PD-1`~`PD-7`을 차지**해 실제 스토리 키는 **`PD-8`부터** 시작합니다. 번호 자체는 신경 쓰지 말고 **요약·에픽·포인트**만 맞추면 됩니다.

### 4. 서브태스크 (WBS 심화)
- **PD-5**에 서브태스크 3개: `방 생성` / `복도 연결` / `계단 배치`

### 5. Sprint 1
- Sprint 생성, 기간 07/06~07/17
- PD-1·2·4·5·9 (합 **15pt**)를 Sprint 1로 이동
- Sprint goal `M1 프로토타입` 입력 후 **Start sprint**
- Board에서 PD-9를 `Done`, PD-4를 `In Progress`로 이동

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
- **JQL 저장 필터**: `project = PD AND assignee = currentUser()` 저장
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

🎓 **트랙은 순서가 없어요** — 각 툴(Jira·Asana·Trello·Redmine)은 독립적이라 끌리는 걸 바로 시작하면 됩니다. 내게 맞는 툴 고르기 → **[툴 선택 가이드](../05_Capstone/Capstone.md)**

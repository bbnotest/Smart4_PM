# 🟥 Redmine 직접 해보기 (연습)

> [가이드](Guide.md)를 봤으니, Redmine을 직접 띄우고 같은 예제 [Pixel Dungeon](../00_Overview/03_Game_Project_Scenario.md)로 **상위/하위 이슈(WBS) + 버전 + 내장 Gantt**를 직접 만들어 보세요.

---

## 🎯 만들 것

상위 이슈 2개 + 하위 이슈 5개 + 버전(M1·M2) + 시작/마감/진행률이 입력된 **Gantt 차트**.

---

## ✋ 따라 만들기

### 0. 환경 띄우기
- Docker로 Redmine 실행: `docker run -d --name redmine -p 3000:3000 redmine:6.1`
- http://localhost:3000 접속, admin/admin 로그인 → 비밀번호 변경
- Administration → **Load the default configuration**

### 1. 프로젝트
- `Pixel Dungeon` 생성
- 모듈 체크: Issue tracking · **Gantt** · **Roadmap** · Time tracking · Calendar

### 2. 상위 이슈(에픽 역할)
- `E2 코어 플레이`(Feature), `E3 던전·콘텐츠`(Feature)

### 3. 하위 이슈 (Parent task 지정)

| 이슈 | 상위(Parent) | 시작 | 마감 | %Done |
|---|---|:--:|:--:|:--:|
| US-01 플레이어 이동 | E2 코어 플레이 | 7/06 | 7/12 | 60 |
| US-02 공격 입력 | E2 코어 플레이 | 7/06 | 7/19 | 30 |
| US-04 턴제 전투(HP) | E2 코어 플레이 | 7/13 | 7/19 | 0 |
| US-05 던전 생성 | E3 던전·콘텐츠 | 7/20 | 7/31 | 0 |
| US-06 적 추적 AI | E3 던전·콘텐츠 | 7/27 | 8/02 | 0 |

### 4. 버전(마일스톤)
- Settings → Versions: `M1 프로토타입`(7/17), `M2 알파`(7/31)
- 각 이슈에 **Target version** 지정 (US-01·02·04→M1, US-05·06→M2)

### 5. Gantt 확인
- **Gantt** 탭에서 막대·진행률·상위하위·버전선 확인

### 6. 시간 기록 & 로드맵
- US-01에 **Log time** 2시간 기록
- **Roadmap** 탭에서 M1 진척(%) 확인

> 다 만들었으면 [Gantt 목업](../assets/redmine_gantt_mockup.svg)과 비교해 보세요.

---

## ✅ 스스로 점검

- [ ] Redmine이 떠 있고 로그인된다
- [ ] 프로젝트에 Gantt·Roadmap 모듈이 켜져 있다
- [ ] 상위 이슈 2개 + 하위 이슈 5개가 있다
- [ ] 하위 이슈에 시작/마감/진행률이 입력돼 있다
- [ ] 버전 M1·M2가 있고 이슈에 연결돼 있다
- [ ] Gantt에 막대·진행률·버전선이 보인다

---

## 🚀 더 해보기 (선택)

- **의사 Kanban**: 상태(New/In Progress/Resolved/Closed)별 **저장된 쿼리** 4개 만들기
- **커스텀 쿼리**: "내게 할당된 미완료 이슈" 필터 저장
- **Wiki**: 프로젝트 Wiki에 회의록 페이지 1개 작성

> 💡 Gantt·Roadmap 화면을 **캡처해두면**, "직접 서버를 띄워 간트까지 만들어봤다"는 강한 면접 자료가 됩니다.

---

## ⚠️ 흔한 실수

- 모듈을 안 켜서 Gantt 탭이 없음 → Settings → Modules.
- 기본 구성을 안 불러와 트래커가 없음 → Administration → Load default configuration.
- 날짜를 안 넣어 Gantt가 비어 보임 → Start/Due/%Done 필수.

---

## ➡️ 다음

마지막: [마무리 — 툴 선택 가이드](../05_Capstone/Capstone.md) — 4개 툴을 다 해봤으니, 상황에 맞는 툴을 직접 골라봅니다.

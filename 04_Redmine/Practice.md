# 🟥 Day 4 — Redmine 실습 (Practice)

> **미션**: Redmine을 직접 띄우고, 공통 시나리오 [`Pixel Dungeon Run`](../00_Overview/03_Game_Project_Scenario.md)를 **상위/하위 이슈(WBS) + 버전(마일스톤) + 내장 Gantt**로 구축한다.
> 산출물(D4). 예상 90~120분(설치 포함).

---

## 🎯 최종 결과물

- 상위 이슈 2개(E2·E3) + 하위 이슈 6개 + 버전(M1·M2) + 시작/마감/진행률이 입력된 **Gantt 차트**.

---

## 📋 과제 단계

### Task 0. 환경 띄우기
- [ ] Docker로 Redmine 실행(`docker run -d --name redmine -p 3000:3000 redmine:6.1`)
- [ ] http://localhost:3000 접속, admin/admin 로그인 → 비밀번호 변경
- [ ] Administration → **Load the default configuration**

### Task 1. 프로젝트
- [ ] `Pixel Dungeon Run` 생성
- [ ] 모듈 체크: Issue tracking · **Gantt** · **Roadmap** · Time tracking · Calendar

### Task 2. 상위 이슈(에픽)
- [ ] `E2 코어 플레이`(Feature), `E3 던전·콘텐츠`(Feature) 생성

### Task 3. 하위 이슈 (Parent task 지정)

| 이슈 | 상위(Parent) | 시작 | 마감 | %Done |
|---|---|:--:|:--:|:--:|
| US-01 자동 전진 | E2 코어 플레이 | 7/06 | 7/12 | 60 |
| US-02 점프(탭) | E2 코어 플레이 | 7/06 | 7/19 | 30 |
| US-04 충돌/게임오버 | E2 코어 플레이 | 7/13 | 7/19 | 0 |
| US-05 절차적 생성 | E3 던전·콘텐츠 | 7/20 | 7/31 | 0 |
| US-06 점수 집계 | E3 던전·콘텐츠 | 7/27 | 8/02 | 0 |

- [ ] 하위 이슈 5개 생성 + Parent task 지정 + 날짜/진행률 입력

### Task 4. 버전(마일스톤)
- [ ] Settings → Versions: `M1 프로토타입`(7/17), `M2 알파`(7/31)
- [ ] 각 이슈에 **Target version** 지정(US-01·02·04→M1, US-05·06→M2)

### Task 5. Gantt 확인
- [ ] **Gantt** 탭에서 막대·진행률·상위하위·버전선 확인

### Task 6. 시간 기록 & 로드맵
- [ ] US-01에 **Log time** 2시간 기록
- [ ] **Roadmap** 탭에서 M1 진척(%) 확인

> 완성본을 [Gantt 목업](../assets/redmine_gantt_mockup.svg)과 비교하세요.

---

## ✅ 완성 기준 체크리스트

| # | 기준 | 충족 |
|:--:|---|:--:|
| 1 | Redmine이 떠 있고 로그인된다 | ☐ |
| 2 | 프로젝트에 Gantt·Roadmap 모듈이 켜져 있다 | ☐ |
| 3 | 상위 이슈 2개 + 하위 이슈 5개가 있다 | ☐ |
| 4 | 하위 이슈에 시작/마감/진행률이 입력돼 있다 | ☐ |
| 5 | 버전 M1·M2가 있고 이슈에 연결돼 있다 | ☐ |
| 6 | Gantt에 막대·진행률·버전선이 보인다 | ☐ |
| 7 | Roadmap에 M1 진척%가 집계된다 | ☐ |

7개 중 **6개 이상**이면 통과.

---

## 📤 제출물

1. **Gantt** 스크린샷
2. **Roadmap** 스크린샷
3. 상위 이슈 1개의 **Subtasks 목록**이 보이는 스크린샷
4. 한 줄 회고: "직접 서버를 운영하는 것의 장점과 단점은?"

> 파일명 예: `D4_Redmine_Gantt_홍길동.png`

---

## 🚀 도전 과제 (선택)

- **의사 Kanban**: 상태(New/In Progress/Resolved/Closed)별 **저장된 쿼리** 4개 만들기
- **커스텀 쿼리**: "내게 할당된 미완료 이슈" 필터 저장
- **Wiki**: 프로젝트 Wiki에 회의록 페이지 1개 작성
- **(고급) Agile 플러그인** 설치를 조사해 보고 칸반 보드 개념 정리(설치는 선택)

---

## ⚠️ 흔한 실수

- 모듈을 안 켜서 Gantt 탭이 없음 → Settings → Modules.
- 기본 구성을 안 불러와 트래커가 없음 → Administration → Load default configuration.
- 날짜를 안 넣어 Gantt가 비어 보임 → Start/Due/%Done 필수.
- 컨테이너를 지워 데이터가 사라짐 → 보존하려면 compose+볼륨(가이드 A-2).

---

## 🔗 다음

Day 5 — [`05_Capstone/Capstone.md`](../05_Capstone/Capstone.md): 4개 툴을 모두 경험했으니, 이제 **상황에 맞는 툴을 선택**하고 그 근거를 제시하는 캡스톤으로 마무리합니다.

/* ============================================================
   curriculum.js — LMS 콘텐츠 매니페스트
   기존 .md 파일을 강의 단위로 묶어 사이드바/대시보드에 노출한다.
   path 는 PM 루트(= index.html 위치) 기준 상대경로.
   ============================================================ */
window.CURRICULUM = {
  title: "게임 PM 협업툴 1주 과정",
  subtitle: "Jira · Asana · Redmine · Trello",
  sections: [
    {
      id: "overview",
      title: "📚 시작하기 (Overview)",
      items: [
        { path: "README.md",                               title: "과정 소개 (README)",        type: "doc",   day: 0 },
        { path: "00_Overview/00_Curriculum_Overview.md",    title: "과정 개요 · 5일 일정",       type: "doc",   day: 0 },
        { path: "00_Overview/01_PM_Concepts_to_Tools.md",   title: "개념 → 툴 매핑 (로제타표)",   type: "doc",   day: 0 },
        { path: "00_Overview/02_Tool_Comparison_Matrix.md", title: "툴 비교 · 선택 가이드",      type: "doc",   day: 0 },
        { path: "00_Overview/03_Game_Project_Scenario.md",  title: "공통 게임 시나리오",         type: "doc",   day: 0 }
      ]
    },
    {
      id: "day1",
      title: "Day 1 · Trello",
      badge: "Kanban",
      items: [
        { path: "01_Trello/Guide.md",    title: "Trello 가이드",  type: "guide",    day: 1 },
        { path: "01_Trello/Practice.md", title: "Trello 실습",    type: "practice", day: 1, deliverable: "Sprint 1 Kanban 보드" }
      ]
    },
    {
      id: "day2",
      title: "Day 2~3 · Jira",
      badge: "Scrum",
      items: [
        { path: "02_Jira/Guide.md",    title: "Jira 가이드",  type: "guide",    day: 2 },
        { path: "02_Jira/Practice.md", title: "Jira 실습",    type: "practice", day: 2, deliverable: "백로그 + Sprint 1 + Timeline" }
      ]
    },
    {
      id: "day3",
      title: "Day 3 · Asana",
      badge: "Views",
      items: [
        { path: "03_Asana/Guide.md",    title: "Asana 가이드", type: "guide",    day: 3 },
        { path: "03_Asana/Practice.md", title: "Asana 실습",   type: "practice", day: 3, deliverable: "다중 뷰 프로젝트" }
      ]
    },
    {
      id: "day4",
      title: "Day 4 · Redmine",
      badge: "Gantt",
      items: [
        { path: "04_Redmine/Guide.md",    title: "Redmine 가이드", type: "guide",    day: 4 },
        { path: "04_Redmine/Practice.md", title: "Redmine 실습",   type: "practice", day: 4, deliverable: "프로젝트 + 내장 Gantt" }
      ]
    },
    {
      id: "day5",
      title: "Day 5 · 캡스톤",
      badge: "Capstone",
      items: [
        { path: "05_Capstone/Capstone.md", title: "캡스톤: 툴 선택 & 미니 계획", type: "practice", day: 5, deliverable: "툴 선택 보고서 + 발표" }
      ]
    },
    {
      id: "instructor",
      title: "👨‍🏫 강사용",
      items: [
        { path: "90_Instructor/Instructor_Guide.md",  title: "강사 진행 가이드",  type: "doc", day: 9 },
        { path: "90_Instructor/Assessment_Rubric.md",  title: "평가 루브릭",      type: "doc", day: 9 }
      ]
    }
  ],

  /* 대시보드의 "5일 한눈에" 카드 */
  days: [
    { day: 1, title: "Trello",  subtitle: "Kanban 입문",       go: "01_Trello/Guide.md" },
    { day: 2, title: "Jira ①",  subtitle: "백로그·스프린트",    go: "02_Jira/Guide.md" },
    { day: 3, title: "Jira ②·Asana", subtitle: "Timeline·다중뷰", go: "03_Asana/Guide.md" },
    { day: 4, title: "Redmine", subtitle: "설치·내장 Gantt",    go: "04_Redmine/Guide.md" },
    { day: 5, title: "캡스톤",   subtitle: "툴 선택·발표",       go: "05_Capstone/Capstone.md" }
  ]
};

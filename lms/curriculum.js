/* ============================================================
   curriculum.js — LMS 콘텐츠 매니페스트
   트랙(PM 기초 + 4개 툴 + 마무리) 단위로 .md 문서를 묶는다.
   path 는 PM 루트(= index.html 위치) 기준 상대경로.
   ============================================================ */
window.CURRICULUM = {
  title: "게임 PM 협업툴 가이드",
  subtitle: "PM 기초 + Jira · Asana · Trello · Redmine",
  sections: [
    {
      id: "pm",
      title: "📚 PM 기초",
      badge: "기초",
      items: [
        { path: "00_PM_Basics/Guide.md", title: "PM 기초 개요",        type: "guide" },
        { path: "00_PM_Basics/Step1.md", title: "1단계 · 게임 PM의 일",  type: "step" },
        { path: "00_PM_Basics/Step2.md", title: "2단계 · 기본 용어",     type: "step" },
        { path: "00_PM_Basics/Step3.md", title: "3단계 · 협업툴 한눈에",  type: "step" }
      ]
    },
    {
      id: "jira",
      title: "Jira",
      badge: "Scrum",
      items: [
        { path: "02_Jira/Guide.md",    title: "Jira 개요",             type: "guide" },
        { path: "02_Jira/Step1.md",    title: "1단계 · 계정과 프로젝트", type: "step", group: "🟢 기초 단계" },
        { path: "02_Jira/Step2.md",    title: "2단계 · 작업 계층",      type: "step", group: "🟢 기초 단계" },
        { path: "02_Jira/Step3.md",    title: "3단계 · 백로그",         type: "step", group: "🔵 실무 단계" },
        { path: "02_Jira/Step4.md",    title: "4단계 · 스프린트",       type: "step", group: "🔵 실무 단계" },
        { path: "02_Jira/Step5.md",    title: "5단계 · Timeline",      type: "step", group: "🔵 실무 단계" },
        { path: "02_Jira/Step6.md",    title: "6단계 · 리포트",         type: "step", group: "🔵 실무 단계" },
        { path: "02_Jira/Step7.md",    title: "7단계 · JQL & 필터",    type: "step", group: "🟣 응용 단계" },
        { path: "02_Jira/Step8.md",    title: "8단계 · 자동화",         type: "step", group: "🟣 응용 단계" },
        { path: "02_Jira/Step9.md",    title: "9단계 · 대시보드",       type: "step", group: "🟣 응용 단계" },
        { path: "02_Jira/Practice.md", title: "Jira 직접 해보기",     type: "practice", deliverable: "백로그 + 스프린트 + Timeline" }
      ]
    },
    {
      id: "asana",
      title: "Asana",
      badge: "Views",
      items: [
        { path: "03_Asana/Guide.md",    title: "Asana 개요",            type: "guide" },
        { path: "03_Asana/Step1.md",    title: "1단계 · 계정과 프로젝트", type: "step" },
        { path: "03_Asana/Step2.md",    title: "2단계 · 섹션과 태스크",  type: "step" },
        { path: "03_Asana/Step3.md",    title: "3단계 · 태스크 꾸미기",  type: "step" },
        { path: "03_Asana/Step4.md",    title: "4단계 · 뷰 전환",        type: "step" },
        { path: "03_Asana/Step5.md",    title: "5단계 · 마일스톤 & 마무리", type: "step" },
        { path: "03_Asana/Practice.md", title: "Asana 직접 해보기",    type: "practice", deliverable: "다중 뷰 프로젝트" }
      ]
    },
    {
      id: "trello",
      title: "Trello",
      badge: "Kanban",
      items: [
        { path: "01_Trello/Guide.md",    title: "Trello 개요",          type: "guide" },
        { path: "01_Trello/Step1.md",    title: "1단계 · 계정과 보드",    type: "step" },
        { path: "01_Trello/Step2.md",    title: "2단계 · 리스트와 카드",  type: "step" },
        { path: "01_Trello/Step3.md",    title: "3단계 · 카드 꾸미기",    type: "step" },
        { path: "01_Trello/Step4.md",    title: "4단계 · 칸반 운영",      type: "step" },
        { path: "01_Trello/Step5.md",    title: "5단계 · 자동화 & 마무리", type: "step" },
        { path: "01_Trello/Practice.md", title: "Trello 직접 해보기",   type: "practice", deliverable: "Kanban 보드" }
      ]
    },
    {
      id: "redmine",
      title: "Redmine",
      badge: "Gantt",
      items: [
        { path: "04_Redmine/Guide.md",    title: "Redmine 개요",            type: "guide" },
        { path: "04_Redmine/Step1.md",    title: "1단계 · Redmine 띄우기",   type: "step" },
        { path: "04_Redmine/Step2.md",    title: "2단계 · 관리자 & 프로젝트", type: "step" },
        { path: "04_Redmine/Step3.md",    title: "3단계 · 이슈와 WBS",      type: "step" },
        { path: "04_Redmine/Step4.md",    title: "4단계 · 버전(마일스톤)",   type: "step" },
        { path: "04_Redmine/Step5.md",    title: "5단계 · 내장 간트",        type: "step" },
        { path: "04_Redmine/Step6.md",    title: "6단계 · 시간기록 & 마무리", type: "step" },
        { path: "04_Redmine/Practice.md", title: "Redmine 직접 해보기",   type: "practice", deliverable: "프로젝트 + 내장 Gantt" }
      ]
    },
    {
      id: "wrapup",
      title: "🏁 마무리",
      badge: "툴 선택",
      items: [
        { path: "05_Capstone/Capstone.md", title: "마무리 — 툴 고르기", type: "doc", deliverable: "상황별 툴 선택" }
      ]
    },
    {
      id: "ref",
      title: "📖 참고 자료",
      items: [
        { path: "README.md",                                title: "가이드 소개 (README)", type: "doc" },
        { path: "00_Overview/00_Curriculum_Overview.md",    title: "이 가이드 사용법",      type: "doc" },
        { path: "00_Overview/01_PM_Concepts_to_Tools.md",   title: "개념 → 툴 매핑",       type: "doc" },
        { path: "00_Overview/02_Tool_Comparison_Matrix.md", title: "툴 비교 · 선택",       type: "doc" },
        { path: "00_Overview/03_Game_Project_Scenario.md",  title: "공통 예제 시나리오",    type: "doc" }
      ]
    }
  ],

  /* 대시보드 세로 카드 (커버 이미지 + 이름 + 설명) */
  cards: [
    { label: "PM 기초", sub: "PM의 역할·책임과 WBS·스프린트 등 기본 용어부터", cover: "assets/cover_pm.svg",      go: "00_PM_Basics/Guide.md",   match: "00_PM_Basics/" },
    { label: "Jira",    sub: "에픽·백로그·스프린트·번다운까지 업계표준 스크럼", cover: "assets/cover_jira.svg",    go: "02_Jira/Guide.md",        match: "02_Jira/" },
    { label: "Asana",   sub: "섹션·태스크와 List·Board·Calendar 다중 뷰 관리", cover: "assets/cover_asana.svg",   go: "03_Asana/Guide.md",       match: "03_Asana/" },
    { label: "Trello",  sub: "카드를 끌어다 놓는 가장 쉬운 칸반 보드",          cover: "assets/cover_trello.svg",  go: "01_Trello/Guide.md",      match: "01_Trello/" },
    { label: "Redmine", sub: "직접 설치하는 오픈소스, 무료 내장 간트 차트",     cover: "assets/cover_redmine.svg", go: "04_Redmine/Guide.md",     match: "04_Redmine/" },
    { label: "마무리",  sub: "상황별로 어떤 툴이 맞는지 직접 고르는 연습",      cover: "assets/cover_wrap.svg",    go: "05_Capstone/Capstone.md", match: "05_Capstone/" }
  ]
};

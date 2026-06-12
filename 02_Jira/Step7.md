# 🟦 Jira · 7단계 — JQL & 저장된 필터

> 🎯 **개요** — 원하는 이슈만 빠르게 찾는 **검색(JQL)** 과, 자주 보는 화면을 **저장하는 필터**를 익힙니다.

<div class="scenario">
<span class="who">🎬 상황 · 스프린트 2회차</span>
<ul>
<li>이슈가 수백 개로 늘었습니다.</li>
<li>개발자는 "내 작업만", QA는 "이번 스프린트 버그만" 보고 싶어합니다.</li>
<li>매번 눈으로 찾는 대신, <b>검색으로 거르고 저장</b>해 한 번에 봅니다.</li>
</ul>
</div>

📍 [← 6단계](Step6.md) · [8단계 →](Step8.md)

---

## A. 쉬운 검색 (Basic)

1. 상단 돋보기 → **Filters → View all issues**(또는 Advanced search)
2. **Basic** 모드에서 프로젝트·담당자·상태·라벨 드롭다운으로 거릅니다 (코드 몰라도 됨)

## B. JQL (Advanced) — 외우지 말고 예시로

`Basic` 옆 **JQL** 로 전환하면 한 줄로 정밀 검색이 됩니다.

```
project = PD AND assignee = currentUser() AND statusCategory != Done   # 내 미완료
project = PD AND issuetype = Bug AND sprint in openSprints()           # 이번 스프린트 버그
project = PD AND "Epic Link" = "E2 코어 플레이"                          # 특정 에픽의 작업
```

## C. 필터 저장 & 공유

1. 검색 결과 위 **Save as** → 이름(예: `내 미완료`) 저장
2. 팀과 **공유(Share)** → 모두가 같은 화면을 봄
3. 저장한 필터는 **보드·대시보드**에서 재사용

> 🖼️ 공식 스크린샷 자리 — JQL 검색 / 필터 저장
> 출처: https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/

---

## ✅ 확인

- [ ] Basic으로 "내 작업"을 걸러낼 수 있다
- [ ] 검색을 **필터로 저장**해 다시 열 수 있다

---

👉 다음: **[8단계 · 자동화(Automation)](Step8.md)**

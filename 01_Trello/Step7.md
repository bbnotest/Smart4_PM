# 🟦 Trello · 7단계 — Butler 자동화

> 🎯 **개요** — 반복 작업을 **Butler 규칙**으로 자동 처리합니다. 무료도 **월 250회**까지 돼요.

<div class="scenario">
<span class="who">🎬 상황 · 반복 잡무</span>
<ul>
<li>"Done으로 옮길 때마다 마감 완료 체크하는 거, 자꾸 깜빡해요."</li>
<li>사람은 잊지만 규칙은 안 잊습니다. Butler로 자동화합니다.</li>
</ul>
</div>

📍 [← 6단계](Step6.md) · [8단계 →](Step8.md)

---

## Butler 규칙 1개 만들기

**언제(Trigger) → 무엇을(Action)** 순서로 규칙을 만듭니다.

![Trello Butler 규칙](../assets/trello_butler.svg)

1. 보드 오른쪽 위 **`Automation`**(Butler) → **`Rules`** → **`Create Rule`**
2. **Trigger**: `when a card is moved to list "Done"`
3. **Action**: `mark the due date as complete`
4. **Save** → 카드를 Done으로 옮겨 동작 확인

> 🙋 순서만 기억: **"언제 → 무엇을"**. Trigger 먼저, Action 나중.
> 💳 무료는 **워크스페이스 월 250회**까지 자동 실행. 개인·소규모엔 충분합니다.

> 🖼️ 공식 스크린샷 자리 — Butler 규칙 생성
> 출처: https://trello.com/butler-automation

---

## 바로 쓰는 규칙 예시

| 언제(Trigger) | 무엇을(Action) |
|---|---|
| 카드가 `Done`으로 이동 | 마감일 완료 표시 |
| 카드에 `버그` 라벨 추가 | `To Do` 맨 위로 이동 |
| 매주 월요일 아침 | `이번 주 회고` 카드 생성 |

---

## 🎮 현장 감각 — 게임 PM은 이렇게

> **Pixel Dungeon 맥락** — Butler는 Trello 무료의 **숨은 강점**입니다(Asana 무료엔 자동화가 아예 없음). 반복 잡무를 규칙으로 넘기면 PM은 콘텐츠·일정에 집중해요. 단 **월 250회** 한도가 있으니 "자주 도는 것"부터 자동화.

**⚠️ 흔한 실수**
- Trigger 없이 Action만 생각 → 항상 **"언제"부터**.
- 규칙을 과하게 → 250회 한도 초과. 핵심만 자동화.

**🎤 면접 한 줄**
> *"반복 잡무를 **Butler 규칙(트리거→액션)** 으로 자동화해 휴먼 에러를 줄였습니다."*

---

## ✅ 확인

- [ ] Butler 규칙을 1개 만들어 동작을 확인했다
- [ ] 트리거 → 액션 구조를 이해한다

---

👉 다음: **[8단계 · Power-Up·한계·마무리](Step8.md)**

# 🟧 Jenkins 직접 해보기 (연습)

> [가이드](Guide.md)를 봤으니, 이제 **직접** Jenkins를 띄우고 같은 예제 [Pixel Dungeon](../00_Overview/03_Game_Project_Scenario.md)의 Unity 프로젝트를 **자동으로 빌드**해 보세요. (Unity가 설치돼 있다고 가정합니다.)

---

## 🎯 만들 것

Jenkins 설치 + **Unity 빌드 Job** + **자동 트리거**(주기) + **Artifact 보관**까지 갖춘, 사람이 안 눌러도 도는 자동 빌드.

---

## ✋ 따라 만들기

### 0. 환경 준비
- **Java(JDK 21)** → **Jenkins** 설치 → http://localhost:8080 접속 → 관리자 계정 생성
- Unity 프로젝트의 `Assets/Editor/BuildScript.cs`에 빌드 함수 붙여넣기 (4단계 코드)
- 내 `Unity.exe` 경로 · 프로젝트 폴더 경로 확인

### 1. 첫 Job
- **`+ 새로운 Item`** → 이름 `pixel-dungeon-build` → **Freestyle project** → OK

### 2. Unity 빌드 단계
- `Build Steps` → **Execute Windows batch command** → 아래(경로 2개는 본인 것):
```bat
"C:\Program Files\Unity\Hub\Editor\6000.0.30f1\Editor\Unity.exe" ^
  -batchmode -quit ^
  -projectPath "C:\Work\PixelDungeon" ^
  -executeMethod BuildScript.PerformBuild ^
  -logFile -
```
- **Unity 에디터는 닫아두기** (동시 열기 충돌)

### 3. 빌드 실행
- **Build Now** → `Console Output`에서 진행 확인 → 성공 공 → `Builds\PixelDungeon.exe` 생성 → 실행해 보기

### 4. 자동 트리거
- `구성` → **`빌드 유발`** → **`Build periodically`** → 테스트로 `H/2 * * * *`(2분마다)
- 사람이 안 눌러도 `#N`이 쌓이는지 확인 → 확인했으면 **`H 2 * * *`(야간)**로 변경

### 5. 산출물 보관
- `빌드 후 조치` → **`Archive the artifacts`** → `Files to archive`에 `Builds/PixelDungeon.exe`
- 위쪽 **`Discard old builds`** → 최근 `20`개만 보관
- 빌드 후 페이지의 **`Build Artifacts`**에서 `.exe` 다운로드 확인

### 6. (선택) 실패 다뤄보기
- 빌드 명령을 잠깐 `exit 1`로 바꿔 **빨간 공** → `Console Output`에서 `FAILURE` 확인 → 원래대로 되돌려 다시 성공

> ✅ **성공 공 + Build Artifacts에 `.exe`가 보이면 완성!** (별도 정답 화면은 없습니다 — 직접 만든 결과물이 곧 정답이에요.)

---

## ✅ 스스로 점검

- [ ] http://localhost:8080 에서 Jenkins가 뜨고 로그인된다
- [ ] `pixel-dungeon-build` Freestyle Job이 있다
- [ ] Build Now로 **성공 공**이 뜨고 `.exe`가 생긴다
- [ ] 주기 트리거로 **사람이 안 눌러도** 빌드가 쌓인다
- [ ] Artifact로 `.exe`가 빌드 번호별로 보관·다운로드된다
- [ ] 빨간 공(실패)을 한 번 만들어 로그로 원인을 읽어봤다

---

## 🚀 더 해보기 (선택)

- **Git 연동**: 공개 저장소를 연결해 "push→자동 빌드" 확인 (9단계)
- **알림**: Slack/Discord 또는 메일로 **실패 알림** 걸기 (어디서 켜는지 찾아보기)
- **빌드 파라미터**: "This project is parameterized"로 **플랫폼 선택**(Windows/Android) 빌드
- **README 뱃지**: 저장소에 build passing/failing 상태 뱃지 붙이기

> 💡 완성한 **빌드 화면·Artifact·콘솔 로그를 캡처**해두면, "자동 빌드 파이프라인을 직접 세웠다"는 강한 면접/포트폴리오 자료가 됩니다.

---

## ⚠️ 흔한 실수

- Unity 에디터를 켜둔 채 빌드 → 충돌. **닫고** 실행.
- 경로에 공백인데 따옴표 누락 → 경로는 **큰따옴표**로.
- 테스트용 2분 주기를 안 바꿈 → PC가 쉴 새 없이 빌드. **확인 후 야간으로**.
- Archive 경로가 실제 출력 경로와 다름 → 보관 안 됨. **5단계 출력 경로와 일치**.

---

## ➡️ 다음

🎓 **트랙은 순서가 없어요** — Jira·Asana·Trello·Redmine은 '할 일 관리' 툴이고, **Jenkins는 거기에 더해지는 '빌드 자동화' 도구**예요. 무엇이든 끌리는 걸 골라 보세요. 내게 맞는 툴 고르기 → **[툴 선택 가이드](../05_Capstone/Capstone.md)**

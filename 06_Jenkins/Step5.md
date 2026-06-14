# 🟧 Jenkins · 5단계 — Jenkins로 Unity 빌드

> 🎯 **개요** — 4단계에서 준비한 명령을 **Jenkins Job에 넣어**, 버튼 하나로 게임 `.exe`까지 자동으로 뽑습니다. 드디어 진짜 빌드 자동화예요.

<div class="scenario">
<span class="who">🎬 상황 · 클릭 한 번에 게임이 빌드된다</span>
<ul>
<li>2단계에서 echo로 익힌 그 틀에, 이번엔 <b>Unity 빌드 명령</b>을 넣습니다.</li>
<li><b>Build Now</b> 한 번이면 Jenkins가 Unity를 불러 <code>.exe</code>를 만들어요.</li>
<li>이제 "빌드 좀 떠주세요"라고 개발자에게 부탁할 일이 사라집니다.</li>
</ul>
</div>

📍 [← 4단계](Step4.md) · [6단계 →](Step6.md)

---

## A. 어떤 프로젝트를 빌드할지

지금은 가장 간단하게, **내 PC에 이미 있는 Unity 프로젝트 폴더를 그대로** 빌드합니다. (Git에서 받아오는 방식은 9단계에서 다뤄요.) 그 폴더의 **절대경로**를 명령의 `-projectPath`에 적습니다.

## B. Job에 Unity 명령 넣기

1. 2단계에서 만든 **`pixel-dungeon-build`** Job → 좌측 **`구성`(Configure)**
2. **`Build Steps`** 의 기존 echo 명령을 지우고, 아래로 교체 (경로 2개는 본인 것으로!):

```bat
"C:\Program Files\Unity\Hub\Editor\6000.0.30f1\Editor\Unity.exe" ^
  -batchmode -quit ^
  -projectPath "C:\Work\PixelDungeon" ^
  -executeMethod BuildScript.PerformBuild ^
  -logFile -
```

3. **`Save`**

> 🙋 줄 끝의 **`^`** 는 "다음 줄에 계속"이라는 뜻(읽기 좋으라고 나눈 것). 한 줄로 길게 써도 똑같이 동작합니다.

## C. 빌드 실행 & 결과물 확인

1. **`Build Now`** 클릭 → `#N`이 깜빡이며 시작
2. 진행 중인 빌드 번호 → **`Console Output`**을 열면 Unity 빌드 로그가 주르륵 올라옵니다 (몇 분 걸려요)
3. 끝에 **성공 공** + `Finished: SUCCESS` → 프로젝트 폴더의 **`Builds\PixelDungeon.exe`**가 새로 생깁니다 → 실행해 보세요!

> 🙋 **첫 빌드는 느릴 수 있어요** — Unity가 에셋을 처음 정리(import)하느라 그렇습니다. 두 번째부터는 빨라져요.

## D. 막히면 (자주 나오는 것만)

| 증상 | 해결 |
|---|---|
| `another Unity instance is running` | Unity **에디터를 닫고** 다시 빌드 (같은 프로젝트 동시 열기 금지) |
| 라이선스 관련 경고로 멈춤 | 이 PC에서 Unity에 **로그인·활성화**돼 있으면 해결 (평소 에디터가 열리는 상태면 OK) |
| `executeMethod ... not found` | `Assets/Editor/BuildScript.cs`가 있는지, **클래스·함수명**(`BuildScript.PerformBuild`)이 정확한지 확인 |
| 경로 오류 / 중간에 끊김 | 경로를 **큰따옴표**로 감쌌는지, 버전 폴더가 맞는지 확인 |
| 빨간 에러가 콘솔에 | 3단계처럼 **맨 아래부터** 읽어 원인 줄 찾기 |

> 💡 잘 안 되면 **4단계 D(터미널 직접 실행)**로 돌아가 명령만 따로 검증해 보세요. 터미널에서 되면 Jenkins에서도 됩니다(같은 명령이니까요).

---

## 🎮 현장 감각 — 게임 PM은 이렇게

> **Pixel Dungeon 맥락**<br>
> 방금 **US-09(1층 플레이 프로토타입 빌드)**가 '사람 의존'에서 '버튼'으로 바뀌었습니다.<br>
> 빌드가 사람 손을 안 타면, "그 사람이 자리에 없어서 빌드를 못 받는" 병목이 사라집니다.<br>
> PM에게 이건 곧 **일정 리스크 하나를 제거**한 것 — 릴리스가 특정 개인에 묶이지 않게 돼요.

**⚠️ 흔한 실수**
- Unity 에디터를 켜둔 채 빌드 → 충돌. **닫고** 실행.
- 경로/버전 안 맞음 → Hub에서 실제 경로 재확인.
- 씬이 빌드에 없음 → `BuildScript.cs`의 씬 경로(또는 Build Settings) 확인.

**🎤 면접 한 줄**
> *"Jenkins에서 **Unity를 배치모드로 호출해 `.exe`를 자동 생성**하는 빌드 잡을 구성했습니다. 빌드가 더 이상 특정 개발자에게 묶이지 않습니다."*

---

## ✅ 확인

- [ ] Job의 빌드 단계에 Unity 명령을 넣고 저장했다
- [ ] **Build Now**로 성공 공이 뜨고 `Builds\PixelDungeon.exe`가 생겼다
- [ ] 만든 `.exe`를 실행해 게임이 켜지는 걸 확인했다

---

👉 다음: **[6단계 · 자동 트리거](Step6.md)**

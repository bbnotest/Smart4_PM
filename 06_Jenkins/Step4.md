# 🟧 Jenkins · 4단계 — Unity 빌드 준비

> 🎯 **개요** — Jenkins에 시키기 **전에**, Unity가 "메뉴 없이 명령어로 빌드"되도록 준비합니다. 작은 C# 파일 하나를 넣고, 빌드 명령어를 이해하면 끝이에요. (아직 Jenkins는 안 만집니다.)

<div class="scenario">
<span class="who">🎬 상황 · 자동화의 밑준비</span>
<ul>
<li>평소엔 사람이 Unity를 열고 <b>File ▸ Build</b> 메뉴를 눌러 빌드합니다.</li>
<li>자동화하려면 "사람·메뉴 없이" 빌드돼야 합니다 — 그러려면 <b>빌드 방법을 코드로 한 번</b> 적어둬야 해요.</li>
<li>걱정 마세요. <b>제공하는 15줄</b>을 붙여넣기만 하면 됩니다.</li>
</ul>
</div>

📍 [← 3단계](Step3.md) · [5단계 →](Step5.md)

---

## A. 왜 "빌드 스크립트"가 필요한가

명령줄에서 Unity를 부르면, Unity는 **"어떤 씬을 / 어디에 / 어떤 플랫폼으로"** 빌드할지 알아야 합니다. 그 정보를 담은 **함수(메서드) 하나**를 C#으로 적어두고, Jenkins가 그 함수를 호출하게 할 거예요.

## B. 빌드 스크립트 붙여넣기

1. 내 Unity 프로젝트의 **`Assets`** 안에 **`Editor`** 폴더를 만듭니다 (없다면). → `Assets/Editor/`
   - `Editor`는 Unity의 **특별 폴더**로, 에디터·빌드용 코드가 들어갑니다.
2. 그 안에 **`BuildScript.cs`** 파일을 만들고 아래를 그대로 붙여넣기:

```csharp
using UnityEditor;

public class BuildScript
{
    // Jenkins(명령줄)에서 이 함수를 호출합니다.
    public static void PerformBuild()
    {
        string[] scenes = { "Assets/Scenes/SampleScene.unity" }; // 빌드할 씬
        string output = "Builds/PixelDungeon.exe";               // 결과물이 저장될 경로
        BuildPipeline.BuildPlayer(
            scenes, output,
            BuildTarget.StandaloneWindows64,   // 윈도우용 빌드
            BuildOptions.None);
    }
}
```

3. Unity 에디터로 돌아가면 자동으로 컴파일됩니다(잠깐). 콘솔에 빨간 에러가 없으면 OK.

> 🙋 **씬 경로를 본인 것으로** — `Assets/Scenes/SampleScene.unity`는 예시입니다. 내 프로젝트의 실제 씬 경로로 바꾸세요. (Unity 상단 **File ▸ Build Settings**에 올라가 있는 씬을 그대로 적으면 됩니다. 모르면 보통 `Assets/Scenes/SampleScene.unity`.)

## C. Unity 빌드 명령어 뜯어보기

5단계에서 Jenkins에 넣을 명령은 이렇게 생겼습니다. 지금은 **뜻만** 이해하세요:

```bat
"C:\Program Files\Unity\Hub\Editor\6000.0.30f1\Editor\Unity.exe" -batchmode -quit -projectPath "C:\Work\PixelDungeon" -executeMethod BuildScript.PerformBuild -logFile -
```

| 부분 | 뜻 |
|---|---|
| `…\Unity.exe` | 내 PC에 깔린 Unity 실행파일 (경로는 사람마다 다름) |
| `-batchmode` | **화면 없이** 조용히 실행 (자동화용) |
| `-quit` | 빌드가 끝나면 **자동 종료** |
| `-projectPath "…"` | 빌드할 **프로젝트 폴더** |
| `-executeMethod BuildScript.PerformBuild` | 우리가 B에서 만든 **함수 실행** |
| `-logFile -` | 진행 로그를 **화면(콘솔)으로** 출력 |

> 🙋 **내 `Unity.exe` 경로 찾기** — Unity Hub → 왼쪽 **`설치`(Installs)** → 쓰는 버전의 **톱니 ▸ "Show in Explorer"** → 열린 폴더의 `Editor\Unity.exe`. 경로의 버전 숫자(`6000.0.30f1` 등)를 **본인 것**으로 바꾸세요.

## D. 터미널에서 먼저 한 번 테스트 (중요!)

Jenkins에 넣기 전에, **PowerShell**에서 위 명령을 직접 돌려 빌드가 되는지 확인하면 5단계가 훨씬 수월합니다.

1. **Unity 에디터를 닫습니다.** (같은 프로젝트를 두 곳에서 열면 충돌나요.)
2. PowerShell을 열고, 위 명령에서 **경로 2개**(Unity.exe·projectPath)를 본인 것으로 바꿔 실행
3. 잠시 후 프로젝트 폴더에 **`Builds\PixelDungeon.exe`**가 생기면 성공! 실행해 보세요.

> 🙋 **에디터가 열려 있으면** "another Unity instance / project is already open"류 오류가 납니다 → Unity를 닫고 다시 실행하세요.

---

## 🎮 현장 감각 — 게임 PM은 이렇게

> **Pixel Dungeon 맥락**<br>
> 자동화의 첫걸음은 "사람이 하던 일을 **기계가 따라 할 수 있게 글로 적는 것**"입니다.<br>
> 빌드 스크립트가 바로 그 '레시피'예요 — 한 번 적어두면 누가·언제 돌려도 결과가 같습니다.<br>
> PM이 코드를 다 몰라도, "이 레시피가 무엇을 빌드하는지"는 읽고 설명할 수 있어야 합니다.

**⚠️ 흔한 실수**
- 경로에 **공백**(예: `Program Files`)인데 따옴표를 안 씀 → 경로는 항상 **큰따옴표**로 감싸기.
- Unity **버전 경로**가 안 맞음 → Hub에서 실제 경로 확인.
- `Assets/Editor/`가 아닌 곳에 스크립트를 둠 → 빌드 함수가 안 잡힘. **반드시 `Editor` 폴더 안**.

**🎤 면접 한 줄**
> *"Unity를 **명령줄(배치모드)로 빌드**하도록 에디터 빌드 스크립트를 작성하고, 터미널에서 검증한 뒤 자동화에 연결했습니다."*

---

## ✅ 확인

- [ ] `Assets/Editor/BuildScript.cs`를 만들고 컴파일 에러가 없다
- [ ] 내 `Unity.exe` 경로와 프로젝트 경로를 안다
- [ ] (권장) PowerShell에서 명령을 직접 돌려 `Builds\PixelDungeon.exe`를 만들었다

---

👉 다음: **[5단계 · Jenkins로 Unity 빌드](Step5.md)**

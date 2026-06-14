# 🟥 Redmine · 1단계 — Redmine 띄우기 (Docker)

> 🎯 **개요** — 다른 클라우드 툴은 "가입"만 하면 되지만, Redmine은 **내 컴퓨터에 서버를 직접 띄웁니다.** `Docker` 명령어 한 줄이면 돼요. 이 관문만 넘으면 나머지는 쉽습니다.

<div class="scenario">
<span class="who">🎬 상황 · 첫날 — 서버부터</span>
<ul>
<li>회사가 "데이터를 외부 클라우드에 두기 어렵다"고 합니다. 그래서 <b>자체 호스팅</b> 도구인 Redmine을 씁니다.</li>
<li>PM인 내가 직접 서버를 띄워 팀에게 열어줘야 합니다.</li>
<li>겁먹지 마세요 — <b>명령어 한 줄</b>로 띄웁니다.</li>
</ul>
</div>

📍 [← 개요](Guide.md) · [2단계 →](Step2.md)

---

## A. Docker Desktop 설치

**Docker**는 "프로그램을 통째로 담아 어디서나 똑같이 실행"해 주는 도구입니다. Redmine을 직접 설치하는 복잡한 과정을 한 줄로 줄여줘요.

1. **https://www.docker.com/products/docker-desktop/** 에서 내 OS용을 받아 설치
2. 설치 후 **Docker Desktop 실행** → 왼쪽 아래 고래 아이콘이 **`Engine running`** 이면 준비 완료

> 🙋 Windows에서 "WSL2 설치" 안내가 나오면 그대로 따르세요(재부팅이 필요할 수 있어요).

## B. Redmine 실행 (명령어 한 줄)

1. **터미널**을 엽니다 (Windows = PowerShell, Mac = 터미널)
2. 아래를 복사해 붙여넣고 Enter:

```bash
docker run -d --name redmine -p 3000:3000 redmine:6.1
```

- `-d` 백그라운드 실행 · `--name redmine` 이름표 · `-p 3000:3000` 3000번 포트로 연결 · `redmine:6.1` 받아올 버전

3. 이미지를 내려받느라 **1~3분** 걸립니다. 끝나면 긴 글자(컨테이너 ID)가 한 줄 나와요.

## C. 접속 & 첫 로그인

1. 브라우저에서 **http://localhost:3000** 접속
2. 오른쪽 위 **`로그인`(Sign in)** → 아이디 **`admin`** / 비번 **`admin`**
3. 첫 로그인이라 **비밀번호 변경**을 요구합니다 → 새 비번 설정

![Redmine 띄우기](../assets/redmine_docker.svg)

> 🙋 **막히면**
> - 화면이 안 뜨면 1분 더 기다렸다 새로고침(서버가 켜지는 중).
> - `port is already allocated`(포트 충돌) → `-p 3001:3000` 으로 바꿔 실행하고 **http://localhost:3001** 접속.
> - Docker 오류 → Docker Desktop이 먼저 켜져 있는지 확인.

> 💡 **끄고 켜기** — `docker stop redmine`(끄기) · `docker start redmine`(다시 켜기). 한 번 만든 컨테이너는 데이터가 그대로 남습니다.

---

## 🎮 현장 감각 — 게임 PM은 이렇게

> **Pixel Dungeon 맥락**<br>
> Redmine은 남의 서버(클라우드)가 아니라 우리 서버에 직접 띄워 쓰는 도구입니다.<br>
> 그래서 외부에 데이터를 두기 어려운 회사(예산·보안 제약)에서 자주 선택됩니다.<br>
> "Docker 한 줄로 직접 띄워 봤다"는 경험은 흔치 않아, 면접에서 강한 인상을 줍니다.

**⚠️ 흔한 실수**
- Docker Desktop을 안 켜고 명령만 실행 → 먼저 고래 아이콘이 `running`인지 확인합니다.
- 포트 충돌(3000 사용 중) → `-p 3001:3000`으로 바꿔 띄웁니다.

**🎤 면접 한 줄**
> *"Redmine을 **Docker로 직접 띄워** 봤습니다. 자체 호스팅이 필요한 환경을 이해하고 있습니다."*

---

## ✅ 확인

- [ ] http://localhost:3000 에서 Redmine 화면이 뜬다
- [ ] **admin**으로 로그인하고 비밀번호를 바꿨다

> 🎉 가장 어려운 관문을 통과했습니다!

---

👉 다음: **[2단계 · 관리자 설정 & 프로젝트](Step2.md)**

# 🟥 Redmine · 1단계 — Redmine 띄우기 (가장 큰 관문)

> 🎯 이번 단계 목표: **Docker로 Redmine을 띄우고 로그인한다.**
> 📍 [← 개요](Guide.md) · 다음 [2단계 →](Step2.md)

> 이 단계만 넘으면 나머지는 쉬워요. 천천히 따라오세요. 💪

---

## A. Docker Desktop 설치

1. **https://www.docker.com/products/docker-desktop/** 에서 OS용 받아 설치
2. 설치 후 **Docker Desktop 실행** → 고래 아이콘이 "Engine running"이면 준비 완료

> 🙋 Windows에서 "WSL2 설치" 안내가 나오면 그대로 따르세요(재부팅 필요할 수 있음).

## B. Redmine 실행 (명령어 한 줄)

1. **터미널** 열기 (Windows = PowerShell)
2. 아래를 복사해 붙여넣고 Enter:

```bash
docker run -d --name redmine -p 3000:3000 redmine:6.1
```

3. 이미지 내려받느라 1~3분. 끝나면 긴 글자(컨테이너 ID)가 나옵니다.
4. 브라우저에서 **http://localhost:3000** 접속

![Redmine 띄우기](../assets/redmine_docker.svg)

5. 로그인: 아이디 **admin** / 비번 **admin** (첫 로그인 시 비번 변경)

> 🙋 **막히면**
> - 안 뜨면 1분 더 기다렸다 새로고침(서버 켜지는 중)
> - `port is already allocated` → `-p 3001:3000` 으로 바꿔 실행, `http://localhost:3001` 접속
> - Docker 오류 → Docker Desktop 먼저 실행

> 🖼️ 공식 스크린샷 자리 — Redmine 첫 화면
> 출처: https://hub.docker.com/_/redmine

---

## ✅ 확인

- [ ] http://localhost:3000 에서 Redmine 화면이 뜬다
- [ ] admin 으로 로그인했다

> 🎉 가장 어려운 관문을 통과했습니다!

---

👉 다음: **[2단계 · 관리자 설정 & 프로젝트](Step2.md)**

@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "PORT=8000"

echo ============================================================
echo   게임 PM 협업툴 LMS - 로컬 서버 시작
echo   주소: http://localhost:%PORT%/
echo   * 잠시 후 브라우저가 자동으로 열립니다.
echo   * 처음에 빈 화면이면 한 번 새로고침(F5) 하세요.
echo   * 종료: 이 검은 창에서 Ctrl + C, 그 후 창 닫기
echo ============================================================
echo.

REM 브라우저 자동 열기 (서버는 아래에서 계속 실행)
start "" "http://localhost:%PORT%/"

REM 1) Python 3 우선
python --version >nul 2>nul
if %errorlevel%==0 (
  python -m http.server %PORT%
  goto :end
)

REM 2) Windows py 런처
py -3 --version >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server %PORT%
  goto :end
)

REM 3) Node.js npx serve
where npx >nul 2>nul
if %errorlevel%==0 (
  npx --yes serve -l %PORT%
  goto :end
)

echo.
echo [!] Python 또는 Node.js 가 설치되어 있지 않습니다.
echo     아래 중 하나를 설치한 뒤 다시 실행하세요.
echo       - Python:  https://www.python.org/downloads/  (설치 시 "Add to PATH" 체크)
echo       - Node.js: https://nodejs.org/
echo     또는 VS Code 의 "Live Server" 확장으로 index.html 을 여세요.
echo.
pause

:end

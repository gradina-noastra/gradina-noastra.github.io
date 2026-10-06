@echo off
rem Creeaza paginile articolelor si reface sitemap.xml
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js nu este instalat pe acest calculator.
  echo Instaleaza-l de la https://nodejs.org ^(varianta LTS^), apoi incearca din nou.
  echo.
  pause
  exit /b 1
)
node build.js
pause

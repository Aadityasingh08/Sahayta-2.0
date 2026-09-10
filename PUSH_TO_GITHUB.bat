@echo off
title Push Sahayta 2.0 to GitHub
color 0B
echo ========================================================
echo         SAHAYTA 2.0 - GITHUB REPOSITORY PUSHER
echo ========================================================
echo.
set "PATH=%LOCALAPPDATA%\Programs\MinGit\cmd;%PATH%"

echo Checking Git status...
git status
echo.

set /p REPO_URL="Enter your GitHub Repository URL (e.g., https://github.com/USERNAME/REPO_NAME.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Exiting.
    pause
    exit /b
)

echo.
echo Setting remote origin to: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo Pushing branch 'main' to GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  [SUCCESS] Code successfully pushed to GitHub!
    echo ========================================================
) else (
    echo.
    echo [NOTE] If authentication failed, please ensure you are logged into GitHub in your browser or Personal Access Token is active.
)

echo.
pause

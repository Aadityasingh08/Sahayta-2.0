@echo off
title Sahayta 2.0 - Crisis Response Platform
color 0B

echo ===================================================
echo        SAHAYTA 2.0 - CRISIS RESPONSE PLATFORM
echo ===================================================
echo.
echo [1/3] Starting Sahayta Server...
cd /d "%~dp0"

start /b "" node server.js

echo [2/3] Waiting for server initialization...
timeout /t 2 /nobreak >nul

echo [3/3] Opening Sahayta in your browser...
start http://localhost:5000

echo.
echo ===================================================
echo  Sahayta 2.0 is now RUNNING!
echo  URL: http://localhost:5000
echo.
echo  Keep this window open while using the application.
echo  To STOP the server, close this window or press Ctrl+C.
echo ===================================================
echo.

node server.js
pause

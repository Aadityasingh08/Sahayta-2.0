@echo off
title Sahayta 2.0 - Crisis Response Platform
color 0B

echo ===================================================
echo        SAHAYTA 2.0 - CRISIS RESPONSE PLATFORM
echo ===================================================
echo.
echo [1/2] Navigating to project directory...
cd /d "%~dp0"

echo [2/2] Opening Sahayta in your browser...
start http://localhost:5000

echo.
echo ===================================================
echo  Sahayta 2.0 is starting on http://localhost:5000
echo  Keep this window open while using the application.
echo  To STOP the server, close this window or press Ctrl+C.
echo ===================================================
echo.

node server.js
pause

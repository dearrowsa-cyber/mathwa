@echo off
echo ========================================
echo  Mathwaa Charity - Frontend React
echo ========================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting development server...
echo.
echo UI will open at: https://mathwaa.org.sa
echo Make sure XAMPP Apache is running for API
echo.
call npm run dev

pause

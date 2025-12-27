@echo off
echo ========================================
echo   IIIT Kottayam - Backend Setup
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created! Please edit it with your MongoDB URI.
) else (
    echo .env file already exists.
)

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo 1. Edit .env file with your MongoDB URI
echo 2. Make sure MongoDB is running
echo 3. Run: npm run dev
echo ========================================
echo.
pause

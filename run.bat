@echo off
echo Starting Student Dashboard Application...
echo.
echo Opening Backend Server...
start "Backend Server" cmd /k "cd server && npm start"

timeout /t 3 /nobreak > nul

echo Opening Frontend Client...
start "Frontend Client" cmd /k "cd client && npm run dev"

echo.
echo Both applications are starting!
echo - Backend Server: http://localhost:5000
echo - Frontend Client: http://localhost:5173
echo.
echo Press any key to exit this window...
pause > nul

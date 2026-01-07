# MP Tourism Booking System - Startup Script
# This script starts all services: MongoDB, Backend, and Frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MP Tourism Booking System Launcher   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running
Write-Host "Checking MongoDB status..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue

if ($mongoService -and $mongoService.Status -eq 'Running') {
    Write-Host "✓ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "✗ MongoDB is not running" -ForegroundColor Red
    Write-Host "  Starting MongoDB service..." -ForegroundColor Yellow
    Start-Service -Name MongoDB -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 3
    Write-Host "✓ MongoDB started" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Backend Server (Port 5000)   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Start backend in new window
$backendPath = "c:\Users\prakh\OneDrive\Desktop\mp tourism hackathon\mern-app\server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Backend Server Starting...' -ForegroundColor Green; node app.js"

Write-Host "✓ Backend server started in new window" -ForegroundColor Green
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Starting Frontend Server (Port 5173)   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Start frontend in new window
$frontendPath = "c:\Users\prakh\OneDrive\Desktop\mp tourism hackathon\mern-app\client"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Frontend Server Starting...' -ForegroundColor Green; npm run dev"

Write-Host "✓ Frontend server started in new window" -ForegroundColor Green
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "     ALL SERVICES RUNNING!             " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Services Status:" -ForegroundColor Cyan
Write-Host "  ✓ MongoDB:  Running" -ForegroundColor Green
Write-Host "  ✓ Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "  ✓ Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Quick Access:" -ForegroundColor Yellow
Write-Host "  • Frontend:        http://localhost:5173" -ForegroundColor White
Write-Host "  • Backend API:     http://localhost:5000/api" -ForegroundColor White
Write-Host "  • Health Check:    http://localhost:5000/api/health" -ForegroundColor White
Write-Host "  • Properties API:  http://localhost:5000/api/properties" -ForegroundColor White
Write-Host ""
Write-Host "New Features Available:" -ForegroundColor Magenta
Write-Host "  ✓ Homestay Booking System" -ForegroundColor White
Write-Host "  ✓ Real-time Availability Checking" -ForegroundColor White
Write-Host "  ✓ Payment Gateway (Razorpay)" -ForegroundColor White
Write-Host "  ✓ Admin Dashboard & Reports" -ForegroundColor White
Write-Host "  ✓ Automated Email Notifications" -ForegroundColor White
Write-Host "  ✓ Cancellation & Refund System" -ForegroundColor White
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  • Quick Start: HOMESTAY_BOOKING_QUICKSTART.md" -ForegroundColor White
Write-Host "  • Full Docs:   HOMESTAY_BOOKING_SYSTEM_DOCUMENTATION.md" -ForegroundColor White
Write-Host ""

# Open browser
Write-Host "Opening website in browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

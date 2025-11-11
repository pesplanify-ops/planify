@echo off
echo 🏠 Starting Houseyog Clone Application...
echo ========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Create uploads directory if it doesn't exist
if not exist "uploads" (
    echo 📁 Creating uploads directory...
    mkdir uploads
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Check if database is initialized
echo 🗄️  Checking database...
node -e "const mongoose = require('mongoose'); require('dotenv').config({ path: './config.env' }); mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/houseyog_clone').then(async () => { const Package = require('./models/Package'); const count = await Package.countDocuments(); if (count === 0) { console.log('📊 Initializing database with sample data...'); require('./init-db.js'); } else { console.log('✅ Database already initialized'); process.exit(0); } }).catch(err => { console.error('❌ Database connection failed:', err.message); process.exit(1); });"

REM Start the application
echo 🚀 Starting the application...
echo    Frontend: http://localhost:5000
echo    API: http://localhost:5000/api
echo.
echo Press Ctrl+C to stop the server
echo ========================================

npm start
pause


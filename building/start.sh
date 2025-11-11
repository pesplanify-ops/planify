#!/bin/bash

# Houseyog Clone - Startup Script
echo "🏠 Starting Houseyog Clone Application..."
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Ubuntu: sudo systemctl start mongod"
    echo "   On Windows: Start MongoDB service"
    exit 1
fi

# Create uploads directory if it doesn't exist
if [ ! -d "uploads" ]; then
    echo "📁 Creating uploads directory..."
    mkdir uploads
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if database is initialized
echo "🗄️  Checking database..."
node -e "
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/houseyog_clone')
  .then(async () => {
    const Package = require('./models/Package');
    const count = await Package.countDocuments();
    if (count === 0) {
      console.log('📊 Initializing database with sample data...');
      require('./init-db.js');
    } else {
      console.log('✅ Database already initialized');
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });
"

# Start the application
echo "🚀 Starting the application..."
echo "   Frontend: http://localhost:5000"
echo "   API: http://localhost:5000/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"

npm start


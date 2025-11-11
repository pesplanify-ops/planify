#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏠 Planify - Starting with Email Notifications');
console.log('==============================================\n');

// Check if email is already configured
const configPath = path.join(__dirname, 'email-config.js');
const configContent = fs.readFileSync(configPath, 'utf8');

if (configContent.includes('your_app_password')) {
    console.log('⚠️  Email not fully configured yet.');
    console.log('📧 To enable real email notifications:');
    console.log('   1. Run: node setup-email.js');
    console.log('   2. Follow the Gmail setup instructions');
    console.log('   3. Enter your Gmail App Password\n');
    console.log('🚀 Starting in demo mode (email preview in console)...\n');
} else {
    console.log('✅ Email notifications: ENABLED');
    console.log('📧 Admin will receive emails at: ritheesh21505@gmail.com\n');
}

// Start the server
const { spawn } = require('child_process');
const server = spawn('node', ['demo-server.js'], {
    cwd: __dirname,
    stdio: 'inherit'
});

server.on('error', (err) => {
    console.error('❌ Error starting server:', err);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.kill();
    process.exit(0);
});

console.log('🎯 Server starting...');
console.log('🌐 Open: http://localhost:3000');
console.log('📧 Test: Submit a consultation form to see email notifications!');
console.log('\nPress Ctrl+C to stop the server\n');

#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('📧 ENABLE REAL EMAIL NOTIFICATIONS');
console.log('===================================\n');

console.log('Currently, all forms work perfectly and show success messages,');
console.log('but emails are only shown in the console (Demo Mode).\n');

console.log('To receive REAL emails at ritheesh21505@gmail.com:');
console.log('1. Go to: https://myaccount.google.com/security');
console.log('2. Enable 2-Factor Authentication');
console.log('3. Go to: https://myaccount.google.com/apppasswords');
console.log('4. Select "Mail" and generate a password');
console.log('5. Copy the 16-character password\n');

rl.question('Enter your Gmail App Password (16 characters): ', (appPassword) => {
    if (appPassword.length !== 16) {
        console.log('❌ Error: App Password must be exactly 16 characters');
        console.log('Please generate a new App Password from Google Account settings');
        process.exit(1);
    }

    // Update email-config.js
    const configPath = path.join(__dirname, 'email-config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    configContent = configContent.replace(
        "pass: 'your_app_password'",
        `pass: '${appPassword}'`
    );
    
    fs.writeFileSync(configPath, configContent);
    
    console.log('\n✅ Email configuration updated successfully!');
    console.log('📧 Admin email: ritheesh21505@gmail.com');
    console.log('🔐 App password: [CONFIGURED]');
    
    console.log('\n🚀 Restarting server with REAL email notifications...\n');
    
    // Kill existing server and start new one
    const { spawn } = require('child_process');
    
    // Kill existing server
    const killProcess = spawn('pkill', ['-f', 'node demo-server.js'], { stdio: 'ignore' });
    
    killProcess.on('close', () => {
        // Start new server
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
        
        console.log('🎯 Server restarted with REAL email notifications!');
        console.log('📧 You will now receive emails at: ritheesh21505@gmail.com');
        console.log('🌐 Test it: http://localhost:3000');
        console.log('\nPress Ctrl+C to stop the server\n');
    });
    
    rl.close();
});

rl.on('close', () => {
    console.log('\n💡 All forms now send REAL emails to ritheesh21505@gmail.com!');
    console.log('🎉 Test any form on the website to see the emails arrive!');
});

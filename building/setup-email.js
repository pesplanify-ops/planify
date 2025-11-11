#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('📧 Planify Email Setup Assistant');
console.log('================================\n');

console.log('This will help you set up real email notifications for your Planify website.\n');

console.log('📋 STEP 1: Gmail Setup Required');
console.log('1. Go to: https://myaccount.google.com/security');
console.log('2. Enable 2-Factor Authentication if not already enabled');
console.log('3. Go to: https://myaccount.google.com/apppasswords');
console.log('4. Select "Mail" as the app');
console.log('5. Copy the 16-character password that appears\n');

rl.question('Enter your Gmail App Password (16 characters): ', (appPassword) => {
    if (appPassword.length !== 16) {
        console.log('❌ Error: App Password must be exactly 16 characters');
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
    console.log('🔐 App password: [HIDDEN]');
    
    console.log('\n🚀 Starting server with real email notifications...\n');
    
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
    
    rl.close();
});

rl.on('close', () => {
    console.log('\n💡 If you need to change the email settings later, edit email-config.js');
    console.log('🎯 Your website is now running with real email notifications!');
});

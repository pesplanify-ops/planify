# 📧 Email Setup Guide for Planify

## Current Status
✅ **Admin Email**: ritheesh21505@gmail.com  
✅ **Email Notifications**: Demo Mode (shows preview in console)  
⚠️ **Real Emails**: Not yet configured

## To Enable Real Email Notifications

### Step 1: Gmail Setup
1. **Enable 2-Factor Authentication** on your Gmail account (ritheesh21505@gmail.com)
   - Go to Google Account settings
   - Security → 2-Step Verification
   - Follow the setup process

2. **Generate App Password**
   - In Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" as the app
   - Copy the generated 16-character password

### Step 2: Update Configuration
Edit `email-config.js` and replace:
```javascript
gmail: {
    service: 'gmail',
    auth: {
        user: 'ritheesh21505@gmail.com', // Your Gmail
        pass: 'your_16_character_app_password' // Generated app password
    }
}
```

### Step 3: Restart Server
```bash
cd /Users/lucky/Downloads/building
node demo-server.js
```

## What Happens After Setup

### Demo Mode (Current)
- ✅ Consultation submissions work
- ✅ Email preview shown in console
- ✅ All form data captured

### Production Mode (After Setup)
- ✅ Real emails sent to ritheesh21505@gmail.com
- ✅ Beautiful HTML email templates
- ✅ Instant notifications for new consultations
- ✅ Reply-to functionality

## Email Template Preview
When someone submits a consultation, you'll receive an email with:
- **Client Information**: Name, email, phone, service type
- **Project Details**: Plot size, budget, timeline
- **Requirements**: Detailed message from client
- **Reply Button**: Direct link to email the client back

## Testing
1. Go to http://localhost:3000
2. Click "Get Free Consultation"
3. Fill out the form and submit
4. Check your email (ritheesh21505@gmail.com) for the notification!

---
**Note**: Keep your App Password secure and don't share it publicly.

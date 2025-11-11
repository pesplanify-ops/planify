# How to Get Gmail App Password (for email-config.js)

## 🔐 What is a Gmail App Password?

A Gmail App Password is a special 16-character password that allows your Node.js application to send emails through Gmail without compromising your main Gmail password. It's secure and can be revoked anytime.

---

## 📋 Step-by-Step Guide

### Step 1: Enable 2-Factor Authentication (2FA)

**Important:** You MUST have 2-Factor Authentication enabled to create App Passwords.

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **"Security"** in the left sidebar
3. Scroll down to **"How you sign in to Google"**
4. Click on **"2-Step Verification"**
5. Follow the prompts to enable it (you'll need your phone number)

---

### Step 2: Generate App Password

After enabling 2FA:

1. **Go to Google Account Settings:**

   - Visit: https://myaccount.google.com/
   - Or search "Google Account Settings" in Google

2. **Navigate to Security:**

   - Click **"Security"** on the left sidebar

3. **Find App Passwords:**

   - Scroll to **"How you sign in to Google"** section
   - Click on **"2-Step Verification"**
   - Scroll down and click on **"App passwords"** at the bottom

   **Direct Link:** https://myaccount.google.com/apppasswords

4. **Create App Password:**

   - You might need to sign in again
   - Under "Select app", choose: **"Mail"**
   - Under "Select device", choose: **"Other (Custom name)"**
   - Type: **"Planify Website"** or any name you want
   - Click **"Generate"**

5. **Copy the Password:**
   - Google will show you a **16-character password** like: `abcd efgh ijkl mnop`
   - **Copy this password** (spaces don't matter, but you can remove them)
   - This is what you need for the `pass` field!

---

## 🔧 How to Use the App Password

### Method 1: Update email-config.js

Open `/Users/lucky/Downloads/building/email-config.js` and update:

```javascript
gmail: {
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',        // Your Gmail address
        pass: 'abcd efgh ijkl mnop'          // The 16-char password you just copied
    }
},
```

**Example with real format:**

```javascript
gmail: {
    service: 'gmail',
    auth: {
        user: 'ritheesh21505@gmail.com',
        pass: 'swjp ebiz mmlh tsew'          // This format is correct
    }
},
```

### Method 2: Remove Spaces (Optional)

Both formats work, but you can remove spaces if you prefer:

```javascript
pass: "swjpebizmmlhtsew"; // Without spaces - also works!
```

---

## 🎯 Quick Visual Guide

### Finding App Passwords Location:

```
Google Account
    └── Security
        └── 2-Step Verification
            └── App passwords (at the bottom)
                └── Generate new app password
```

---

## 📱 For Each Admin Email

### Important Notes:

1. **Only the SENDING email needs an App Password**

   - This is the email in `gmail.auth.user`
   - Currently: `ritheesh21505@gmail.com`

2. **Other admin emails DON'T need App Passwords**
   - Emails in the `admin.emails` array just RECEIVE notifications
   - They can be ANY email (Gmail, Yahoo, Outlook, etc.)
   - No setup needed for receiving emails!

### Example:

```javascript
module.exports = {
  gmail: {
    service: "gmail",
    auth: {
      user: "ritheesh21505@gmail.com", // ← This email needs App Password
      pass: "swjp ebiz mmlh tsew", // ← Generated for THIS email only
    },
  },

  admin: {
    emails: [
      "ritheesh21505@gmail.com", // ← No App Password needed
      "colleague@gmail.com", // ← No App Password needed
      "manager@yahoo.com", // ← No App Password needed (works with any email!)
      "boss@outlook.com", // ← No App Password needed
    ],
  },
};
```

---

## ❗ Common Issues & Solutions

### Issue 1: "Can't find App Passwords option"

**Solution:** You need to enable 2-Factor Authentication first

- Go to: https://myaccount.google.com/security
- Enable "2-Step Verification"
- Then "App passwords" will appear

### Issue 2: "Invalid credentials" error

**Solution:** Make sure you're using App Password, not your regular Gmail password

- Regular Gmail password = ❌ Won't work
- App Password (16 characters) = ✅ Will work

### Issue 3: "Less secure app access"

**Solution:** Google removed "Less secure apps" in 2022

- You MUST use App Passwords now
- No way around it - just generate an App Password!

### Issue 4: "Username and Password not accepted"

**Solutions:**

1. Make sure email address is correct
2. Make sure App Password is copied correctly (16 characters)
3. Try removing spaces from the password
4. Generate a NEW App Password and try again

---

## 🔒 Security Best Practices

### ✅ DO:

- Keep your App Password private
- Use different App Passwords for different apps
- Revoke App Passwords you're not using
- Store passwords in config files (not in public GitHub!)

### ❌ DON'T:

- Share your App Password publicly
- Use your regular Gmail password
- Commit passwords to public repositories
- Give App Passwords to untrusted people

---

## 🔄 Revoking App Passwords

If you need to revoke/delete an App Password:

1. Go to: https://myaccount.google.com/apppasswords
2. You'll see list of all App Passwords you created
3. Click the ❌ (X) button next to the one you want to remove
4. Generate a new one if needed

---

## 🎓 Complete Example for Your Project

Here's exactly what your `email-config.js` should look like after getting the App Password:

```javascript
// email-config.js

module.exports = {
  gmail: {
    service: "gmail",
    auth: {
      // STEP 1: Put your Gmail address here
      user: "ritheesh21505@gmail.com",

      // STEP 2: Put your 16-character App Password here
      // Get it from: https://myaccount.google.com/apppasswords
      pass: "swjp ebiz mmlh tsew", // Replace with YOUR App Password
    },
  },

  admin: {
    email: "ritheesh21505@gmail.com",
    name: "Planify Admin",

    // STEP 3: Add all admin emails who should receive notifications
    emails: [
      "ritheesh21505@gmail.com", // These emails just receive
      "colleague@gmail.com", // No App Password needed for these
      "manager@gmail.com", // Any email provider works here
    ],
  },

  templates: {
    consultation: {
      subject: "New Consultation Request - Planify",
      from: "Planify Notifications <ritheesh21505@gmail.com>",
    },
  },
};
```

---

## 🧪 Testing After Setup

1. **Save your `email-config.js`** with the new App Password

2. **Restart your server:**

   ```bash
   node demo-server.js
   ```

3. **Submit a test form** on your website

4. **Check your email** - you should receive a notification!

5. **Check the console** - you should see:
   ```
   📧 Email notification sent to 3 admin(s): email1@gmail.com, email2@gmail.com, email3@gmail.com
   ```

---

## 📞 Still Having Issues?

If emails still don't work:

1. **Double-check** the App Password is copied correctly
2. **Try generating** a NEW App Password
3. **Check** that 2FA is enabled on your Gmail
4. **Verify** your Gmail address is correct
5. **Look at** server console for error messages
6. **Test with** just one admin email first

---

## 🎉 Quick Checklist

- [ ] 2-Factor Authentication is enabled on my Gmail
- [ ] I generated an App Password from Google Account Settings
- [ ] I copied the 16-character password
- [ ] I pasted it in `email-config.js` under `gmail.auth.pass`
- [ ] I added all admin emails in the `admin.emails` array
- [ ] I saved the file
- [ ] I restarted the server
- [ ] Emails are working! 🎊

---

## 🔗 Useful Links

- **Google Account Security:** https://myaccount.google.com/security
- **App Passwords (Direct):** https://myaccount.google.com/apppasswords
- **2-Step Verification:** https://myaccount.google.com/signinoptions/two-step-verification

---

**Need more help?** Check the server console logs when you restart - it will tell you if the email configuration is working!

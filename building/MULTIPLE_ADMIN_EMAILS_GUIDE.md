# How to Add Multiple Admin Email Addresses

## ✅ Setup Complete!

Your system is now configured to send emails to multiple admins. All admins will receive notifications on their phones/devices when someone:

- Submits a consultation request
- Sends a contact message
- Creates a new project

---

## 📧 How to Add More Admin Emails

### Step 1: Open `email-config.js`

Find the `admin` section which now looks like this:

```javascript
admin: {
    email: 'ritheesh21505@gmail.com', // Primary admin email
    name: 'Ritheesh - Planify Admin',
    emails: [
        'ritheesh21505@gmail.com',          // Admin 1
        'admin2@gmail.com',                  // Admin 2
        'admin3@gmail.com'                   // Admin 3
    ]
},
```

### Step 2: Replace with Actual Gmail Addresses

Simply replace `'admin2@gmail.com'` and `'admin3@gmail.com'` with the real Gmail addresses of your other admins:

```javascript
emails: [
  "ritheesh21505@gmail.com", // Your email
  "john.doe@gmail.com", // Second admin
  "jane.smith@gmail.com", // Third admin
  "manager@gmail.com", // Fourth admin (add as many as needed)
];
```

### Step 3: Add or Remove Admin Emails

**To add more admins:**

```javascript
emails: [
  "ritheesh21505@gmail.com",
  "admin2@gmail.com",
  "admin3@gmail.com",
  "admin4@gmail.com", // Just add a new line with comma
  "admin5@gmail.com", // Keep adding as needed
];
```

**To have just 2 admins:**

```javascript
emails: ["ritheesh21505@gmail.com", "secondadmin@gmail.com"];
```

**To have just 1 admin (original setup):**

```javascript
emails: ["ritheesh21505@gmail.com"];
```

---

## 📱 How It Works

When someone submits a form on your website:

1. **Email is sent to ALL addresses** in the `emails` array
2. **Each admin receives the notification** on their phone/computer
3. **All admins can see** the consultation request, contact message, or new project details
4. **Any admin can respond** to the client

---

## 🔧 Important Notes

### Gmail Notifications on Phone

For each admin to receive notifications on their phone:

1. **Install Gmail App** on their phone
2. **Login with their Gmail account**
3. **Enable notifications** in Gmail app settings:
   - Open Gmail app
   - Tap menu (☰) → Settings
   - Select their email account
   - Enable "Notifications"
   - Choose notification sound

### Email Format

All admins receive emails with:

- ✅ Client name and contact details
- ✅ Service/project information
- ✅ Direct reply button
- ✅ Beautiful formatted HTML email
- ✅ Timestamp of submission

---

## 🧪 Testing

After updating `email-config.js`:

1. **Restart your server**:

   ```bash
   npm start
   ```

   or

   ```bash
   node demo-server.js
   ```

2. **Submit a test consultation** on your website

3. **Check all admin inboxes** - everyone should receive the email!

4. **Look at server console** - you'll see:
   ```
   📧 Email notification sent to 3 admin(s): admin1@gmail.com, admin2@gmail.com, admin3@gmail.com
   ```

---

## 📝 Example Configuration

Here's a complete example for a team of 4 admins:

```javascript
// email-config.js

module.exports = {
  gmail: {
    service: "gmail",
    auth: {
      user: "ritheesh21505@gmail.com",
      pass: "swjp ebiz mmlh tsew",
    },
  },

  admin: {
    email: "ritheesh21505@gmail.com",
    name: "Planify Admin Team",
    emails: [
      "ritheesh21505@gmail.com", // Lead Developer
      "manager@gmail.com", // Project Manager
      "sales@gmail.com", // Sales Team
      "support@gmail.com", // Customer Support
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

## ❓ FAQ

**Q: Do all admins need Gmail app passwords?**  
A: No! Only the main sending email (in `gmail.auth.user`) needs the app password. The other admin emails just receive the notifications.

**Q: Can I use different email providers (not Gmail)?**  
A: The sending email must be Gmail (or you need to configure SMTP). But the receiving admin emails can be any email provider (Gmail, Yahoo, Outlook, etc.)

**Q: Will this cost anything?**  
A: No! Gmail allows sending emails for free. There are daily limits but they're more than enough for a business website.

**Q: Can I add or remove admins later?**  
A: Yes! Just edit the `emails` array in `email-config.js` and restart the server.

**Q: What if one admin email is invalid?**  
A: The email will still be sent to all valid addresses. The invalid one will bounce back but won't affect others.

---

## 🎉 That's It!

Your multiple admin email setup is complete! All admins will now receive notifications whenever a customer:

- 📞 Requests a consultation
- 💬 Sends a contact message
- 🏗️ Creates a new project

**Need help?** Check the server console for detailed email logs!

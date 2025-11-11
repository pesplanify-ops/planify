// Email Configuration for Demo Server
// This file contains email settings for sending notifications

module.exports = {
  // Gmail Configuration (Recommended for demo)
  gmail: {
    service: "gmail",
    auth: {
      user: "pesplanify@gmail.com", // Your Gmail
      pass: "ahsj xrol sasu fvvr", // Gmail App Password - REPLACE THIS
    },
  },

  // Alternative: SMTP Configuration
  smtp: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pesplanify@gmail.com",
      pass: "your_app_password",
    },
  },

  // Admin email settings - Multiple admins supported
  admin: {
    email: "pesplanify@gmail.com", // Primary admin email (for backwards compatibility)
    name: "PES Planify Admin",
    // Add multiple admin emails here - all will receive notifications
    emails: [
      "pesplanify@gmail.com", // Primary admin email
      // Add more admin emails as needed - make sure they exist and are accessible!
      // "admin2@gmail.com", // Uncomment and replace with real working email
      // "admin3@gmail.com"  // Uncomment and replace with real working email
    ],
  },

  // Email templates
  templates: {
    consultation: {
      subject: "New Consultation Request - Planify",
      from: "Planify Notifications <pesplanify@gmail.com>",
    },
  },
};

// Instructions for Gmail Setup:
// 1. Enable 2-Factor Authentication on your Gmail account
// 2. Generate an App Password:
//    - Go to Google Account settings
//    - Security > 2-Step Verification > App passwords
//    - Generate a password for "Mail"
// 3. Replace 'your_app_password' with the generated password
// 4. Replace 'your_email@gmail.com' with your actual Gmail address
// 5. Update admin email address as needed

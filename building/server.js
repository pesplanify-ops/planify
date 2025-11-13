const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const emailConfig = require('./email-config');
require('dotenv').config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'pesplanify@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Mproject0836';
const ADMIN_SESSION_COOKIE = 'planify_admin_session';
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || process.env.JWT_SECRET || 'planify-secret';
const ADMIN_SESSION_VALUE = crypto
  .createHash('sha256')
  .update(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}:${ADMIN_SESSION_SECRET}`)
  .digest('hex');

const isEmailConfigured =
  emailConfig.gmail.auth.user !== 'your_email@gmail.com' &&
  emailConfig.gmail.auth.pass !== 'your_app_password';

const adminEmails = emailConfig.admin.emails || [emailConfig.admin.email];
const loginTransporter = isEmailConfigured
  ? nodemailer.createTransport(emailConfig.gmail)
  : null;

const notifyAdminLoginAttempt = async ({ attemptedEmail, success, req }) => {
  const subject = success
    ? 'Planify Admin Login Successful'
    : 'Planify Admin Login Failed';

  const statusText = success ? '✅ Successful' : '⚠️ Failed';
  const accentColor = success ? '#2ecc71' : '#e74c3c';
  const html = `
    <div style="font-family: 'Poppins', Arial, sans-serif; background: #f5f7fb; padding: 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);">
        <tr>
          <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0; letter-spacing: 0.5px;">Planify Admin Center</h1>
            <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 6px 0 0;">Security Insight from Planify</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 28px 32px 16px;">
            <div style="display: inline-flex; align-items: center; padding: 10px 16px; border-radius: 999px; background: rgba(${success ? '46, 204, 113' : '231, 76, 60'},0.12); color: ${accentColor}; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.6px;">
              ${statusText} Admin Login
            </div>
            <h2 style="font-size: 20px; color: #1f2937; margin: 20px 0 10px;">Login attempt detected</h2>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">
              An admin login ${success ? 'was completed successfully' : 'failed due to invalid credentials'}. Review the details below.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 32px 24px;">
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px 20px; margin-top: 18px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px;">Email Used</td>
                  <td style="text-align: right; color: #111827; font-weight: 600;">${attemptedEmail || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px; padding-top: 12px;">Time</td>
                  <td style="text-align: right; color: #111827; font-weight: 600; padding-top: 12px;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 32px 32px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">If this wasn’t you, consider updating the admin credentials immediately.</p>
          </td>
        </tr>
        <tr>
          <td style="background: #f3f4f6; padding: 16px 32px; text-align: center; color: #9ca3af; font-size: 11px;">
            © ${new Date().getFullYear()} Planify. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;

  if (!isEmailConfigured || !loginTransporter) {
    console.log(
      `[ADMIN LOGIN ALERT] ${subject} — Email: ${attemptedEmail}`
    );
    return;
  }

  await loginTransporter.sendMail({
    from: emailConfig.templates.consultation.from,
    to: adminEmails.join(', '),
    subject,
    html,
  });
};

const adminAuth = (req, res, next) => {
  const session = req.cookies?.[ADMIN_SESSION_COOKIE];
  if (session === ADMIN_SESSION_VALUE) {
    return next();
  }

  const acceptsHtml =
    req.headers.accept && req.headers.accept.includes('text/html');
  if (acceptsHtml && req.method === 'GET') {
    return res.redirect('/admin-login.html');
  }

  return res.status(401).json({ message: 'Unauthorized' });
};

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body || {};

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    notifyAdminLoginAttempt({ attemptedEmail: email, success: true, req }).catch(
      (err) => console.error('Error sending admin login success email:', err)
    );

    res.cookie(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ success: true });
  }

  notifyAdminLoginAttempt({ attemptedEmail: email, success: false, req }).catch(
    (err) => console.error('Error sending admin login failure email:', err)
  );

  return res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/admin/logout', adminAuth, (req, res) => {
  res.clearCookie(ADMIN_SESSION_COOKIE);
  return res.json({ success: true });
});

app.use(['/admin.html'], adminAuth);

app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/consultations', require('./routes/consultations'));
app.use('/api/packages', require('./routes/packages'));

// Serve frontend
app.get('/admin', adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'admin.html'));
});

app.get('/admin-login', (req, res) => {
  if (req.cookies?.[ADMIN_SESSION_COOKIE] === ADMIN_SESSION_VALUE) {
    return res.redirect('/admin.html');
  }
  return res.sendFile(path.join(__dirname, 'frontend', 'admin-login.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/houseyog_clone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

if (process.env.VERCEL) {
  module.exports = app;
} else {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


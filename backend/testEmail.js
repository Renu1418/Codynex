const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO,
  subject: 'Test Email',
  text: 'If you received this, your backend is working.'
}, (err, info) => {
  if (err) {
    return console.error("❌ Email failed:", err.message);
  }
  console.log("✅ Email sent:", info.response);
});

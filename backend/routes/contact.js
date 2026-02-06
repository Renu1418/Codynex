const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact'); // ✅ DB MODEL

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please fill all fields' });
  }

  try {
    // ✅ 1. Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    // ✅ 2. Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Codynex Contact Form - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });

    res.status(200).json({ msg: 'Message sent successfully!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      msg: 'Please fill all fields'
    });
  }

  try {
    // 1. Save message in MongoDB
    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    // 2. Send email using Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          email: process.env.EMAIL_FROM
        },
        to: [
          {
            email: process.env.EMAIL_TO
          }
        ],
        subject: `Codynex Contact Form - ${name}`,
        htmlContent: `
          <h2>New Contact Form Message</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('BREVO ERROR:', data);

      return res.status(500).json({
        msg: 'Email could not be sent'
      });
    }

    res.status(200).json({
      msg: 'Message sent successfully!'
    });

  } catch (err) {
    console.error('CONTACT FORM ERROR:', err);

    res.status(500).json({
      msg: 'Server error'
    });
  }
});

export default router;
const express = require('express');
const nodemailer = require('nodemailer');
const { createEvent } = require('ics');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' })); // Update with frontend origin


app.post('/api/register', (req, res) => {
  const { name, email, eventDetails } = req.body;

  const event = {
    start: [eventDetails.date.year, eventDetails.date.month, eventDetails.date.day, eventDetails.time.hour, eventDetails.time.minute],
    duration: { hours: 1, minutes: 30 },
    title: eventDetails.name,
    description: eventDetails.description,
    location: eventDetails.location,
    organizer: { name, email },
  };

  createEvent(event, (error, value) => {
    if (error) {
      return res.status(500).json({ error: 'Error generating calendar invite' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: `Invitation to ${eventDetails.name}`,
      text: `You are invited to ${eventDetails.name}. Please find the invite attached.`,
      attachments: [{ filename: 'invite.ics', content: value, contentType: 'text/calendar' }],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ error: 'Error sending email' });
      }
      res.status(200).json({ message: 'Registration successful, email sent' });
    });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));

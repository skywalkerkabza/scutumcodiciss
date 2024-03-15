const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route for form submission
app.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Create transporter object using secure SMTP transport with environment variables (recommended)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER , // Use environment variable or fallback
      pass: process.env.GMAIL_PASSWORD // Use environment variable for password (recommended)
    }
  });

  // Email options
  const mailOptions = {
    from: 'Your Name <your_gmail_address@gmail.com>', // Sender address
    to: 'recipient_email@example.com', // Replace with recipient address(es)
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}\n
      Email: ${email}\n
      Phone: ${phone}\n
      Message: ${message}\n
    `
  };

  // Send email with error handling and logging
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log detailed error
      res.status(500).send('There was an error sending your email. Please try again later.');
    } else {
      console.log('Email sent:', info.response); // Log email details
      res.status(200).send('Your email has been sent successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

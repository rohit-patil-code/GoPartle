const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Requirement = require('./models/Requirement');
const Otp = require('./models/OTP');
const User = require('./models/User');
const sgMail = require('@sendgrid/mail');

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.use(cors({
  origin: ['http://localhost:3000', 'https://go.rohitcodes.tech'],
  credentials: true
}));
app.use(express.json());

app.post('/api/requirements', async (req, res) => {
  try {
    const { eventName, eventType, eventDate, location, hiringFor, details } = req.body;

    if (!eventName || !eventType || !eventDate || !location || !hiringFor || !details) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const requirement = new Requirement({
      eventName,
      eventType,
      eventDate,
      location,
      hiringFor,
      details,
    });

    const savedRequirement = await requirement.save();
    res.status(201).json(savedRequirement);
  } catch (error) {
    console.error('Error saving requirement:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    if(!email) return res.status(400).json({ message: 'Enter a email ID' });

    const existingUser = await User.findOne({email: email});

    if(!existingUser) return res.status(400).json({ message: 'You dont have an account. Please create a account first!' });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
        { email: email },
        { otp: otpCode, createdAt: new Date() },
        { upsert: true, new: true }
    );

    const msg = {
        to: email,
        from: 'rohitpatilwork7797@gmail.com',
        subject: 'Your OTP for Event Planner',
        text: `Please use this OTP for logging in: ${otpCode}. Note that the OTP will expire after 5 minutes.`,
    }
    
    const sent = await sgMail.send(msg);

    if(!sent) return res.status(400).json({ message: 'There was some error while sending OTP. Please try again after some time.' })
    
    return res.status(200).json({ 
      success: true, 
      message: "Email sent successfully" 
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP. Please try again!', error: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const existingUser = await User.findOne({email: email});

    if(existingUser) return res.status(400).json({ message: 'An account exist with this email ID. Please login.' });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
        { email: email },
        { otp: otpCode, createdAt: new Date() },
        { upsert: true, new: true }
    );

    const msg = {
        to: email,
        from: 'rohitpatilwork7797@gmail.com',
        subject: 'Your OTP for Event Planner',
        text: `Please use this OTP for logging in: ${otpCode}. Note that the OTP will expire after 5 minutes.`,
    }
    
    const sent = await sgMail.send(msg);

    if(!sent) return res.status(400).json({ message: 'There was some error while sending OTP. Please try again after some time.' })
    
    return res.status(200).json({ 
      success: true, 
      message: "Email sent successfully" 
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP. Please try again!', error: error.message });
  }
});

app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const otpRecord = await Otp.findOne({ email: email });

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    const otpAge = Date.now() - new Date(otpRecord.createdAt).getTime();
    if (otpAge > 5 * 60 * 1000) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, delete it
    await Otp.deleteOne({ email: email });

    return res.status(200).json({
      success: true,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

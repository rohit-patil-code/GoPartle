const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Requirement = require('./models/Requirement');

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create Requirement Route
app.post('/api/requirements', async (req, res) => {
  try {
    const { eventName, eventType, eventDate, location, hiringFor, details } = req.body;

    // Basic validation
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

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

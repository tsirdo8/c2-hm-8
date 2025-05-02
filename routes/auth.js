const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Director = require('../models/Director');

const router = express.Router();


router.post('/register', async (req, res) => {
  const { name, email, password, birthDate, nationality } = req.body;

 
  const existing = await Director.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  
  const newDirector = new Director({
    name,
    email,
    password, 
    birthDate,
    nationality
  });

  try {
    await newDirector.save();
    res.status(201).json({ message: 'Director registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering director', error });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const director = await Director.findOne({ email });
  if (!director) return res.status(404).json({ message: 'User not found' });

 
  const isMatch = await bcrypt.compare(password, director.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });


  const token = jwt.sign({ directorId: director._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;

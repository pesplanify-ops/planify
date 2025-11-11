const express = require('express');
const { body, validationResult } = require('express-validator');
const Consultation = require('../models/Consultation');

const router = express.Router();

// Submit consultation request
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('service').notEmpty().withMessage('Service is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      service,
      message,
      plotSize,
      budget,
      timeline
    } = req.body;

    const consultation = new Consultation({
      name,
      email,
      phone,
      service,
      message,
      plotSize,
      budget,
      timeline
    });

    await consultation.save();

    res.status(201).json({
      message: 'Consultation request submitted successfully',
      consultation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all consultations (admin only)
router.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update consultation status
router.put('/:id', async (req, res) => {
  try {
    const { status, notes, scheduledAt } = req.body;
    
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status, notes, scheduledAt },
      { new: true }
    );

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.json(consultation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


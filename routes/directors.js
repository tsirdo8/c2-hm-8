const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

router.get('/', async (req, res) => {
    try {
        const directors = await Director.find().populate('movies');
        res.json(directors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const director = await Director.findById(req.params.id).populate('movies');
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.json(director);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const director = new Director({
        name: req.body.name,
        birthDate: req.body.birthDate,
        nationality: req.body.nationality
    });

    try {
        const newDirector = await director.save();
        res.status(201).json(newDirector);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const director = await Director.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.json(director);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.json({ message: 'Director deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Director = require('../models/Director');

// Get all movies with director info
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().populate('director');
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one movie with director info
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('director');
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new movie (director ID should be in headers)
router.post('/', async (req, res) => {
    const directorId = req.headers['director-id'];
    
    if (!directorId) {
        return res.status(400).json({ message: 'Director ID is required in headers' });
    }

    try {
        const director = await Director.findById(directorId);
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }

        const movie = new Movie({
            title: req.body.title,
            releaseYear: req.body.releaseYear,
            genre: req.body.genre,
            director: directorId
        });

        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a movie
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('director');
        
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
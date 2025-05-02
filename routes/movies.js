const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Director = require('../models/Director');
const validateDirector = require('../middleware/validateDirector');
const isAuth = require('../middleware/isAuth');



router.get('/', async (req, res) => {
  
        try {
            const { genre, year } = req.query;
    
            const filter = {};
            if (genre) filter.genre = genre;
            if (year) filter.releaseYear = year;
    
            const movies = await Movie.find(filter).populate('director');
            res.json(movies);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('director');
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.post('/', validateDirector,isAuth, async (req, res) => {
    try {
        const movie = new Movie({
            title: req.body.title,
            releaseYear: req.body.releaseYear,
            genre: req.body.genre,
            director: req.directorId
        });

        const newMovie = await movie.save();
        await Director.findByIdAndUpdate(req.directorId, { $push: { movies: newMovie._id } });

        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('director');

        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
  
    if (movie.director.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed to delete this movie' });
    }
  
    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  });
  


module.exports = router;
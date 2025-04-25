const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
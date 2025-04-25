const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    nationality: {
        type: String
    }
});

directorSchema.virtual('movies', {
    ref: 'Movie',
    localField: '_id',
    foreignField: 'director'
});

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;
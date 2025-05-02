const Director = require('../models/Director');

const validateDirector = async (req, res, next) => {
    const directorId = req.headers['director-id'];
    if (!directorId) {
        return res.status(400).json({ message: 'Director ID is required in headers' });
    }

    const director = await Director.findById(directorId);
    if (!director) {
        return res.status(404).json({ message: 'Director not found' });
    }

    req.director = director;
    next();
};

module.exports = validateDirector;


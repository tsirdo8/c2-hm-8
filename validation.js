const Joi = require('joi');


const directorSchema = Joi.object({
    name: Joi.string().required(),
    birthDate: Joi.date().optional(),
    nationality: Joi.string().optional()
});


const movieSchema = Joi.object({
    title: Joi.string().required(),
    releaseYear: Joi.number().required(),
    genre: Joi.string().valid('comedy', 'action', 'drama', 'horror').optional(),
    directorId: Joi.string().required() 
});

module.exports = { directorSchema, movieSchema };

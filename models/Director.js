
const mongoose = require('mongoose');
const Movie = require('./Movie');
const bcrypt = require('bcrypt');

const directorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date },
    nationality: { type: String },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true } 
});


directorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});


directorSchema.pre('findOneAndDelete', async function (next) {
    const directorId = this.getQuery()["_id"];
    await Movie.deleteMany({ director: directorId });
    next();
});

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;

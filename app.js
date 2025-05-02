const express = require('express');
const mongoose = require('mongoose');
const directorRoutes = require('./routes/directors');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();


app.use(express.json());



mongoose.connect(process.env.MONGO_URI, {
    
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));


app.use('/api/directors', directorRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});                                                                     
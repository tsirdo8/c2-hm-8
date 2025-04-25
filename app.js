const express = require('express');
const mongoose = require('mongoose');
const directorRoutes = require('./routes/directors');
const movieRoutes = require('./routes/movies');
require('dotenv').config();

const app = express();


app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/directors', directorRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});                                                                     
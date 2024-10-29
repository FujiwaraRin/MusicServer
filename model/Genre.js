const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: String,
        required: true
    },
    picture: String
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
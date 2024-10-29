const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    album_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    release_date: Date,
    genre_id: {
        type: Number,
        ref: 'Genre'
    },
    artist_id: {
        type: Number,
        ref: 'Artist'
    }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
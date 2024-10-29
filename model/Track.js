const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    track_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    duration: String, // Consider using a specific time format or storing in seconds
    release_date: Date,
    album_id: {
        type: Number,
        ref: 'Album'
    }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
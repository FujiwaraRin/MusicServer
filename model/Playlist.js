const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    playlist_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Number,
        ref: 'User' // Reference to the User model
    }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
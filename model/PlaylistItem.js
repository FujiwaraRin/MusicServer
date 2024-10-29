const mongoose = require('mongoose');

const playlistItemSchema = new mongoose.Schema({
    playlist_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Number,
        ref: 'User'
    },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
});

const PlaylistItem = mongoose.model('Playlist', playlistItemSchema);

module.exports = PlaylistItem;
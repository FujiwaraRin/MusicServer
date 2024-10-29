const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artist_id: {
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

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
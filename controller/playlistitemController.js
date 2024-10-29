const express = require('express');
const Playlist = require('../model/Playlist');
const Track = require('../model/Track'); 

const router = express.Router();

// Tạo playlist item
router.post('/playlists', async (req, res) => {
    try {
        const { user_id, tracks } = req.body;
        const newPlaylist = new Playlist({ user_id, tracks });
        const savedPlaylist = await newPlaylist.save();
        res.status(201).json(savedPlaylist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating playlist' });
    }
});

// Lấy tất cả danh sách
router.get('/users/:userId/playlists', async (req, res) => {
    try {
        const playlists = await Playlist.find({ user_id: req.params.userId }).populate('tracks');
        res.json(playlists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching playlists' });
    }
});

// Lấy 1 playlist item
router.get('/playlists/:id', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('tracks');
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.json(playlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching playlist' });
    }
});

// Thêm
router.post('/playlists/:playlistId/tracks', async (req, res) => {
    try {
        const { trackId } = req.body;
        const playlist = await Playlist.findById(req.params.playlistId);
        playlist.tracks.push(trackId);
        await playlist.save();
        res.json(playlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error adding track to playlist' });
    }
});

// Xóa bài hát khỏi playlist
router.delete('/playlists/:playlistId/tracks/:trackId', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.playlistId);
        playlist.tracks.pull(req.params.trackId);
        await playlist.save();
        res.json({ message: 'Track removed from playlist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error removing track from playlist' });
    }
});

// Xóa playlist
router.delete('/playlists/:id', async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
        if (!deletedPlaylist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.json({ message: 'Playlist deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting playlist' });
    }
});

module.exports = router;
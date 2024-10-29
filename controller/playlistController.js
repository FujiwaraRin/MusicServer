const express = require('express');
const Playlist = require('../model/Playlist'); // Thay thế đường dẫn nếu cần
const User = require('../model/User'); // Để populate user

const router = express.Router();

// Tạo một playlist mới
router.post('/playlists', async (req, res) => {
    try {
        const { user_id } = req.body;
        const newPlaylist = new Playlist({ user_id });
        const savedPlaylist = await newPlaylist.save();
        res.status(201).json(savedPlaylist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi tạo playlist' });
    }
});

// Lấy danh sách tất cả các playlist của một user
router.get('/users/:userId/playlists', async (req, res) => {
    try {
        const playlists = await Playlist.find({ user_id: req.params.userId }).populate('user');
        res.json(playlists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách playlist' });
    }
});

// Lấy thông tin một playlist theo ID
router.get('/playlists/:id', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('user');
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist không tìm thấy' });
        }
        res.json(playlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin playlist' });
    }
});


// Xóa một playlist
router.delete('/playlists/:id', async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
        if (!deletedPlaylist) {
            return res.status(404).json({ error: 'Playlist không tìm thấy' });
        }
        res.json({ message: 'Playlist đã được xóa' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa playlist' });
    }
});

module.exports = router;
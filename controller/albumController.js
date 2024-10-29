const express = require('express');
const Album = require('../model/Album'); // Thay thế đường dẫn nếu cần
const Genre = require('../model/Genre'); // Để populate genre
const Artist = require('../model/Artist'); // Để populate artist

const router = express.Router();

// Tạo một album mới
router.post('/albums', async (req, res) => {
    try {
        const { title, release_date, genre_id, artist_id } = req.body;
        const newAlbum = new Album({ title, release_date, genre_id, artist_id });
        const savedAlbum = await newAlbum.save();
        res.status(201).json(savedAlbum);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi tạo album' });
    }
});

// Lấy danh sách tất cả các album
router.get('/albums', async (req, res) => {
    try {
        const albums = await Album.find().populate('genre').populate('artist');
        res.json(albums);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách album' });
    }
});

// Lấy thông tin một album theo ID
router.get('/albums/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('genre').populate('artist');
        if (!album) {
            return res.status(404).json({ error: 'Album không tìm thấy' });
        }
        res.json(album);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin album' });
    }
});

// Cập nhật thông tin một album
router.put('/albums/:id', async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('genre').populate('artist');
        if (!updatedAlbum) {
            return res.status(404).json({ error: 'Album không tìm thấy' });
        }
        res.json(updatedAlbum);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi cập nhật album' });
    }
});

// Xóa một album
router.delete('/albums/:id', async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) {
            return res.status(404).json({ error: 'Album không tìm thấy' });
        }
        res.json({ message: 'Album đã được xóa' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa album' });
    }
});

module.exports = router;
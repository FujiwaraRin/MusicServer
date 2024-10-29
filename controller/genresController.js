const express = require('express');
const Genre = require('../model/Genre'); // Thay thế đường dẫn nếu cần

const router = express.Router();

// Tạo một thể loại mới
router.post('/genres', async (req, res) => {
    try {
        const { name, picture } = req.body;
        const newGenre = new Genre({ name, picture });
        const savedGenre = await newGenre.save();
        res.status(201).json(savedGenre);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi tạo thể loại' });
    }
});

// Lấy danh sách tất cả các thể loại
router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách thể loại' });
    }
});

// Lấy thông tin một thể loại theo ID
router.get('/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).json({ error: 'Thể loại không tìm thấy' });
        }
        res.json(genre);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin thể loại' });
    }
});

// Cập nhật thông tin một thể loại
router.put('/genres/:id', async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGenre) {
            return res.status(404).json({ error: 'Thể loại không tìm thấy' });
        }
        res.json(updatedGenre);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi cập nhật thể loại' });
    }
});

// Xóa một thể loại
router.delete('/genres/:id', async (req, res) => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        if (!deletedGenre) {
            return res.status(404).json({ error: 'Thể loại không tìm thấy' });
        }
        res.json({ message: 'Thể loại đã được xóa' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa thể loại' });
    }
});

module.exports = router;
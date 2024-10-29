const express = require('express');
const Artist = require('../model/Artist'); // Thay thế đường dẫn nếu cần

const router = express.Router();

// Tạo một nghệ sĩ mới
router.post('/artists', async (req, res) => {
    try {
        const { name, picture } = req.body;
        const newArtist = new Artist({ name, picture });
        const savedArtist = await newArtist.save();
        res.status(201).json(savedArtist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi tạo nghệ sĩ' });
    }
});

// Lấy danh sách tất cả các nghệ sĩ
router.get('/artists', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách nghệ sĩ' });
    }
});

// Lấy thông tin một nghệ sĩ theo ID
router.get('/artists/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ error: 'Nghệ sĩ không tìm thấy' });
        }
        res.json(artist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin nghệ sĩ' });
    }
});

// Cập nhật thông tin một nghệ sĩ
router.put('/artists/:id', async (req, res) => {
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArtist) {
            return res.status(404).json({ error: 'Nghệ sĩ không tìm thấy' });
        }
        res.json(updatedArtist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi cập nhật nghệ sĩ' });
    }
});

// Xóa một nghệ sĩ
router.delete('/artists/:id', async (req, res) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
        if (!deletedArtist) {
            return res.status(404).json({ error: 'Nghệ sĩ không tìm thấy' });
        }
        res.json({ message: 'Nghệ sĩ đã được xóa' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa nghệ sĩ' });
    }
});

module.exports = router;
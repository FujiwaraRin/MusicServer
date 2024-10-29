const express = require('express');
const Comment = require('../model/Comment');
const User = require('../model/User'); // Để populate user
const Track = require('../model/Track'); // Để populate track

const router = express.Router();

// Tạo một bình luận mới
router.post('/comments', async (req, res) => {
    try {
        const { user_id, track_id, content } = req.body;
        const newComment = new Comment({ user_id, track_id, content });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi tạo bình luận' });
    }
});

// Lấy tất cả các bình luận của một bài hát
router.get('/tracks/:trackId/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ track_id: req.params.trackId }).populate('user');
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách bình luận' });
    }
});

// Lấy thông tin một bình luận theo ID
router.get('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('user').populate('track');
        if (!comment) {
            return res.status(404).json({ error: 'Bình luận không tìm thấy' });
        }
        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin bình luận' });
    }
});

// Cập nhật nội dung của một bình luận
router.put('/comments/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { content }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ error: 'Bình luận không tìm thấy' });
        }
        res.json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi cập nhật bình luận' });
    }
});

// Xóa một bình luận
router.delete('/comments/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ error: 'Bình luận không tìm thấy' });
        }
        res.json({ message: 'Bình luận đã được xóa' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa bình luận' });
    }
});

module.exports = router;
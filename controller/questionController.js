const express = require('express');
const Question = require('../model/Question');
const Track = require('../model/Track'); // Để populate track

const router = express.Router();

// Tạo một câu hỏi mới
router.post('/questions', async (req, res) => {
    try {
        const { title, track_id } = req.body;
        const newQuestion = new Question({ title, track_id });
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi tạo câu hỏi' });
    }
});

// Lấy tất cả các câu hỏi của một bài hát
router.get('/tracks/:trackId/questions', async (req, res) => {
    try {
        const questions = await Question.find({ track_id: req.params.trackId });
        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách câu hỏi' });
    }
});

// Lấy thông tin một câu hỏi theo ID
router.get('/questions/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('track');
        if (!question) {
            return res.status(404).json({ error: 'Câu hỏi không tìm thấy' });
        }
        res.json(question);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy thông tin câu hỏi' });
    }
});

// Cập nhật nội dung của một câu hỏi
router.put('/questions/:id', async (req, res) => {
    try {
        const { title } = req.body;
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, { title }, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Câu hỏi không tìm thấy' });
        }
        res.json(updatedQuestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi cập nhật câu hỏi' });
    }
});

// Xóa một câu hỏi
router.delete('/questions/:id', async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ error: 'Câu hỏi không tìm thấy' });
        }
        res.json({ message: 'Câu hỏi đã được xóa' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa câu hỏi' });
    }
});

module.exports = router;
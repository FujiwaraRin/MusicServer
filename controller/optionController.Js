const express = require('express');
const Option = require('../model/Option');
const Question = require('../model/Question'); 

const router = express.Router();

// Tạo câu trả lời
router.post('/options', async (req, res) => {
    try {
        const { title, isCorrect, question_id } = req.body;
        const newOption = new Option({ title, isCorrect, question_id });
        const savedOption = await newOption.save();
        res.status(201).json(savedOption);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating option' });
    }
});

// Lấy tất cả danh sách
router.get('/questions/:questionId/options', async (req, res) => {
    try {
        const options = await Option.find({ question_id: req.params.questionId });
        res.json(options);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching options' });
    }
});

// Lấy 1 câu trả lời
router.get('/options/:id', async (req, res) => {
    try {
        const option = await Option.findById(req.params.id);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }
        res.json(option);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching option' });
    }
});

// Cập nhật
router.put('/options/:id', async (req, res) => {
    try {
        const { title, isCorrect } = req.body;
        const updatedOption = await Option.findByIdAndUpdate(req.params.id, { title, isCorrect }, { new: true });
        if (!updatedOption) {
            return res.status(404).json({ error: 'Option not found' });
        }
        res.json(updatedOption);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating option' });
    }
});

// Xóa
router.delete('/options/:id', async (req, res) => {
    try {
        const deletedOption = await Option.findByIdAndDelete(req.params.id);
        if (!deletedOption) {
            return res.status(404).json({ error: 'Option not found' });
        }
        res.json({ message: 'Option deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting option' });
    }
});

module.exports = router;
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    track_id: {
        type: Number,
        ref: 'Track'
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
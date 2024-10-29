const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    option_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    isCorrect: Boolean,
    question_id: {
        type: Number,
        ref: 'Question'
    }
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
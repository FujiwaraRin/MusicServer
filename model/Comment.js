const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Number,
        ref: 'User'
    },
    track_id: {
        type: Number,
        ref: 'Track'
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    fullname: String,
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    birthday: Date,
    point: {
        type: Number,
        default: 0
    },
    type_user_id: {
        type: Number,
        ref: 'TypeUser'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
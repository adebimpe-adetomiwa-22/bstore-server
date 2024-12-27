const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        trim: true,
    },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

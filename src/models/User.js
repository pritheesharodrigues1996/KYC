const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
}, {
    timestamps: true
}
);
const User = mongoose.model('user', userSchema);

module.exports = User;
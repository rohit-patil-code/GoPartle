const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpAt: {
        type: Date,
        default: Date.now,
        index: {expires: 300}
    }
})

module.exports = mongoose.model('User', userSchema);
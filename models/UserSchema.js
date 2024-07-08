const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
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
    connected: {
        type: Boolean,
        default: true  // indicates if the user is connected to the real-time service
    },
    creatadAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.index({ username: 'text', email: 'text', userId: 'text' });
module.exports = mongoose.model('User', UserSchema);
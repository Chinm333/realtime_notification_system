const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    notificationId: {
        type: String,
        required: true
    },
    senderUserId: {
        type: String,
        required: true
    },
    receiverUsers: [
        {
            receiverUserId: {
                type: String,
                required: true
            },
            read: {
                type: Boolean,
                default: false
            }
        }
    ],
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

NotificationSchema.index({ notificationId: 'text', message: 'text',senderUserId: 'text','receiverUsers.receiverUserId': 'text' });

module.exports = mongoose.model('Notification', NotificationSchema);
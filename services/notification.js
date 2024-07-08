const Notification = require('../models/NotificationSchema');
const rabbitmq = require('./rabbitmq');
const { generateRandomString } = require('../services/common');
const createNotification = async (senderUserId, receiverUsers, message) => {
    const notificationId = generateRandomString(4);
    const notification = await Notification.create({
        notificationId,
        senderUserId,
        receiverUsers,
        message
    });
    await rabbitmq.publishNotification(notification);
    return notification;
};

const getNotification = async (filter) => {
    const notification = await Notification.find(filter);
    return notification;
};

const updateNotification = async (notificationId, data) => {
    const notification = await Notification.findOneAndUpdate(
        { notificationId },
        data,
        { new: true }
    );
    return notification;
};

const deleteNotification = async (notificationId) => {
    const notification = await Notification.findOneAndDelete({ notificationId });
    return 'Notification deleted successfully';
};

const markAsRead = async (notificationId, userId) => {
    const notification = await Notification.findOneAndUpdate(
        { notificationId, receiverUsers: { $elemMatch: { receiverUserId: userId } } },
        { $set: { 'receiverUsers.$.read': true } },
        { new: true }
    );
    return notification;
};

const getUnreadMessageCountByUserId = async (userId) => {
    const unreadCounts = await Notification.aggregate([
        { $unwind: '$receiverUsers' },
        { $match: { 'receiverUsers.read': false, 'receiverUsers.receiverUserId': userId } },
        {
            $group: {
                _id: '$receiverUsers.receiverUserId',
                unreadCount: { $sum: 1 }
            }
        }
    ]);
    return unreadCounts;
};

module.exports = {
    createNotification,
    getNotification,
    updateNotification,
    deleteNotification,
    markAsRead,
    getUnreadMessageCountByUserId
};
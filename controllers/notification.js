const notificationService = require('../services/notification');

const createNotification = async (req, res) => {
    try {
        const { senderUserId, receiverUsers, message } = req.body;
        const notification = await notificationService.createNotification(senderUserId, receiverUsers, message);
        return res.status(201).json({
            status: 201,
            message: 'Notification created successfully',
            data: notification
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Notification creation unsuccessful' + error.message
        });
    }
};

const getNotification = async (req, res) => {
    try {
        const filter = {};
        if (req.query.senderUserId) filter.senderUserId = req.query.senderUserId;
        if (req.query.message) filter.message = { $regex: req.query.message, $options: 'i' };

        if (req.query.receiverUserId) {
            filter.receiverUsers = { $elemMatch: { receiverUserId: req.query.receiverUserId } };
        }

        if (req.query.read !== undefined) {
            const read = req.query.read === 'true';
            filter.receiverUsers = { $elemMatch: { read } };
        }

        const notifications = await notificationService.getNotification(filter);

        return res.status(200).json({
            status: 200,
            message: 'Notification retrieval successful',
            data: notifications
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Notification retrieval unsuccessful' + error.message
        });
    }
};

const updateNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const payload = req.body;
        const notification = await notificationService.updateNotification(notificationId, payload);
        return res.status(200).json({
            status: 200,
            message: 'Notification update successful',
            data: notification
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Notification update unsuccessful' + error.message
        });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await notificationService.deleteNotification(notificationId);
        return res.status(200).json({
            status: 200,
            message: 'Notification delete successful',
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Notification delete unsuccessful' + error.message
        });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { notificationId, userId } = req.query;
        const notification = await notificationService.markAsRead(notificationId, userId);
        return res.status(200).json({
            status: 200,
            message: 'Notification mark as read successful',
            data: notification
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Notification mark as read unsuccessful' + error.message
        });
    }
};

const getUnreadMessageCountByUserId = async (req, res) => {
    try {
        const count = await notificationService.getUnreadMessageCountByUserId(req.query.userId);
        return res.status(200).json({
            status: 200,
            message: 'Notification count retrieval successful',
            data: count
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Notification count retrieval unsuccessful' + error.message
        });
    }
};

module.exports = {
    createNotification,
    getNotification,
    updateNotification,
    deleteNotification,
    markAsRead,
    getUnreadMessageCountByUserId
};
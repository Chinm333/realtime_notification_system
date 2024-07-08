const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, notificationController.createNotification);
router.get('/', authMiddleware, notificationController.getNotification);
router.get('/unreadCount', authMiddleware, notificationController.getUnreadMessageCountByUserId);
router.put('/:notificationId', authMiddleware, notificationController.updateNotification);
router.delete('/:notificationId', authMiddleware, notificationController.deleteNotification);
router.get('/markAsread', authMiddleware, notificationController.markAsRead);



module.exports = router;

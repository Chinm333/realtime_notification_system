const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/notification:
 *   post:
 *     summary: Create a notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderUserId:
 *                 type: string
 *               receiverUsers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     receiverUserId:
 *                       type: string
 *                     read:
 *                       type: boolean
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       500:
 *         description: Notification creation unsuccessful
 */
router.post('/', authMiddleware, notificationController.createNotification);

/**
 * @swagger
 * /api/notification:
 *   get:
 *     summary: Get notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *       500:
 *         description: Notifications retrieval unsuccessful
 */
router.get('/', authMiddleware, notificationController.getNotification);

/**
 * @swagger
 * /api/notification/unreadCount:
 *   get:
 *     summary: Get unread notification count
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Unread notification count retrieved successfully
 *       500:
 *         description: Notification count retrieval unsuccessful
 */
router.get('/unreadCount', authMiddleware, notificationController.getUnreadMessageCountByUserId);

/**
 * @swagger
 * /api/notification/{notificationId}:
 *   put:
 *     summary: Update a notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Notification ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       500:
 *         description: Notification update unsuccessful
 */
router.put('/:notificationId', authMiddleware, notificationController.updateNotification);

/**
 * @swagger
 * /api/notification/{notificationId}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       500:
 *         description: Notification deletion unsuccessful
 */
router.delete('/:notificationId', authMiddleware, notificationController.deleteNotification);

/**
 * @swagger
 * /api/notification/markAsread:
 *   get:
 *     summary: Mark notification as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Notification ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       500:
 *         description: Notification mark as read unsuccessful
 */
router.get('/markAsread', authMiddleware, notificationController.markAsRead);

module.exports = router;

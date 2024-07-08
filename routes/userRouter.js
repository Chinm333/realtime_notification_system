const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, userController.getUser);
router.put('/:userId', authMiddleware, userController.updateUser);
router.delete('/:userId', authMiddleware, userController.deleteUser);

module.exports = router;

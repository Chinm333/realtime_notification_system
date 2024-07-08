const jwt = require('../utils/jwt');
const User = require('../models/UserSchema');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ status: 401, message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ status: 401, message: 'Unauthorized: Token is malformed' });
  }

  try {
    const decoded = jwt.verifyToken(token);
    const user = await User.findOne({ userId: decoded.id });

    if (!user) {
      return res.status(401).json({ status: 401, message: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized: Please authenticate',
      error: error.message,
    });
  }
};

module.exports = authMiddleware;

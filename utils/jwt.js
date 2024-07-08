const jwt = require('jsonwebtoken');
const config = require('../config/config');
const generateToken = (id) => {
    return jwt.sign({ id },
        config.jwtSecretKey,
        {
            expiresIn: '1h',
        }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecretKey);
};

module.exports = {
    generateToken,
    verifyToken
}
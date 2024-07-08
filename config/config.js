const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    mongodbUrl: process.env.MONGODB_URL,
    jwtSecretKey: process.env.JWT_SECURITY_KEY,
    rabbitMqUrl: process.env.RABBITMQ_URL,
};
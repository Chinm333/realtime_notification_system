const amqplib = require('amqplib');
const config = require('../config/config');

let channel;

const init = async () => {
    try {
        const connection = await amqplib.connect(config.rabbitMqUrl);
        console.log('RabbitMQ connection established');
        channel = await connection.createChannel();
        console.log('Channel created');
        await channel.assertQueue('notification', { durable: false }); 
        console.log('Queue asserted');
    } catch (error) {
        console.error('RabbitMQ connection error:', error);
        throw error;
    }
};

const publishNotification = async (notification) => {
    if (!channel) {
        throw new Error('Channel is not initialized');
    }
    await channel.sendToQueue('notification', Buffer.from(JSON.stringify(notification)));
};

const consumeNotifications = async (callback) => {
    if (!channel) {
        throw new Error('Channel is not initialized');
    }
    await channel.consume('notification', (msg) => {
        if (msg !== null) {
            const notification = JSON.parse(msg.content.toString());
            callback(notification);
            channel.ack(msg);
        }
    });
};

module.exports = {
    init,
    publishNotification,
    consumeNotifications
};

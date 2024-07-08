const request = require('supertest');
const app = require('../index');
const jwt = require('../utils/jwt');
const mongoose = require('mongoose');
const config = require('../config/config');

let server;
let token;

beforeAll(async () => {
    // Mock RabbitMQ
    jest.mock('../services/rabbitmq', () => {
        return {
            connect: jest.fn(),
            consumeNotifications: jest.fn((callback) => callback({ content: Buffer.from('{"message": "test"}') })),
        };
    });

    // Start server
    server = app.listen(4000, () => {
        console.log(`Server running on port ${4000}`);
    });

    // Connect to DB and create test user
    await mongoose.connect(config.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create a valid JWT token
    token = jwt.generateToken('3996d608');

});

afterAll(async () => {
    // Close server and DB connection
    await mongoose.connection.close();
    await server.close();
});

describe('Auth API', () => {
    it('should register a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser13',
                email: 'test2@example13.com',
                password: 'password',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.data).toHaveProperty('userId');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "email": "test@example2.com",
                "password": "password"
            });

        expect(res.statusCode).toEqual(200);
        // expect(res.body.data).toHaveProperty('token');
    });
});

describe('Notification API', () => {
    it('should create a notification', async () => {
        const res = await request(app)
            .post('/api/notification')
            .set('Authorization', `Bearer ${token}`)
            .send({
                'senderUserId': '3996d608',
                'receiverUsers': [{ 'receiverUserId': 'c2704e6d', 'read': false }],
                'message': 'Test notification',
            });
        expect(res.statusCode).toEqual(201);
    });

    it('should get notifications', async () => {
        const res = await request(app)
            .get('/api/notification')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });

    it('mark as read notifications', async () => {
        const res = await request(app)
            .get('/api/notification/markAsread?notificationId=4dcd0b97&userId=3996d608')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });

    it('get count of unread notifications with id', async () => {
        const res = await request(app)
            .get('/api/notification/unreadCount?userId=3996d608')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
    });
});

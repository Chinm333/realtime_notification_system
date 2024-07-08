const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./config/config');
const authRouter = require('./routes/authRouter');
const notificationRouter = require('./routes/notificationRouter');
const userRouter = require('./routes/userRouter');
const rabbitmq = require('./services/rabbitmq');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification API',
      version: '1.0.0',
      description: 'API documentation for Notification System',
    },
  },
  apis: ['./swagger_api_docs/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

function connectToDB(){
    const url = config.mongodbUrl;
    mongoose.connect(url)
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log(err));
}
connectToDB();

app.use('/api/auth', authRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/user', userRouter);
app.use(authMiddleware)

const startServer = async () => {
    try {
        await rabbitmq.init();
        rabbitmq.consumeNotifications((notification) => {
            io.emit('notification', notification);
        });
        server.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();

module.exports = app;
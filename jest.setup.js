const mongoose = require('mongoose');
const rabbitmq = require('./services/rabbitmq');

beforeAll(async () => {
  rabbitmq.init();
});

afterAll(async () => {
  await mongoose.connection.close();
  if (rabbitmq.connection) {
    await rabbitmq.connection.close();
  }
});

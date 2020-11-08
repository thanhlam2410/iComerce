import { ConsumeMessage } from 'amqplib';
import { connectRabbitMQ } from './common/rabbitmq';
import dotenv from 'dotenv';
dotenv.config();

const doSendEmail = (message: ConsumeMessage) => {
  try {
    const content = message.content.toString();
    const input = JSON.parse(content);
    console.log('worker sent message to', input.toEmail);
  } catch (err) {
    console.log(err);
  }
};

connectRabbitMQ()
  .then(async (channel) => {
    await channel.assertQueue('PRODUCT_PURCHASE_EMAIL', {
      durable: true
    });

    console.log('worker', 'channel ready');
    channel.consume('PRODUCT_PURCHASE_EMAIL', doSendEmail, { noAck: true });
  })
  .catch((err) => console.log(err));

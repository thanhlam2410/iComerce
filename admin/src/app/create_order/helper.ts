import { isEmpty, isNil } from 'lodash';
import { fetchRedisKey, setRedisKey } from '../../common/redis';
import { ProductModel } from '../../models/product';
import { IPaginationModel } from '../../mongodb';
import { CurrencyValue } from './metadata';
import redis from 'redis';
import { connectRabbitMQ } from '../../common/rabbitmq';

export const findAndCheckProductAvaibility = async (
  productId: string,
  db: IPaginationModel<ProductModel>,
  redisClient: redis.RedisClient
) => {
  const product = await db.findById(productId);
  if (isNil(product)) return null;

  const productStock = await fetchRedisKey(redisClient, product._id.toString());
  if (
    isEmpty(productStock) ||
    isNaN(Number.parseInt(productStock)) ||
    Number.parseInt(productStock) < 1
  ) {
    return null;
  }

  await setRedisKey(
    redisClient,
    product._id.toString(),
    (Number.parseInt(productStock) - 1).toString()
  );

  return product;
};

export const convertPriceToPaymentValue = async (
  price: number,
  currency: string
) => {
  const exchangeRate = CurrencyValue[currency.toLowerCase()];
  return Math.floor((exchangeRate * price * 100) / 100);
};

export const publishEmailTask = async (
  toEmail: string,
  productName: string,
  totalPrice: number,
  currency: string
) => {
  try {
    const channel = await connectRabbitMQ();
    const message = JSON.stringify({
      toEmail,
      productName,
      totalPrice,
      currency
    });

    const QUEUE_NAME = 'PRODUCT_PURCHASE_EMAIL';

    await channel.assertQueue(QUEUE_NAME, {
      durable: true
    });

    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), {
      persistent: true
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

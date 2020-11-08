import dotenv from 'dotenv';
import { MongoDBConnection } from './src/mongodb';
dotenv.config();
import { createApiServer } from './src/server';
import * as Countly from 'countly-sdk-nodejs';
import redis from 'redis';

const connectRedis = () => {
  return new Promise((resolve, reject) => {
    const client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: Number.parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD
    });

    client.on('connect', () => {
      resolve(client);
    });

    client.on('error', (err) => {
      reject(err);
    });
  });
};

const mongoConnection = new MongoDBConnection();
mongoConnection
  .connect({ connectionString: process.env.MONGO_CONNECTION_STRING })
  .then(() => {
    return connectRedis();
  })
  .then((redisClient: redis.RedisClient) => {
    Countly.init({
      app_key: process.env.COUNTLY_API_KEY,
      url: process.env.COUNTLY_SERVER,
      debug: process.env.DEV === 'true'
    });

    Countly.track_errors();
    return Promise.resolve(redisClient);
  })
  .then((redisClient: redis.RedisClient) => {
    const server = createApiServer(mongoConnection, redisClient);
    server.listen(process.env.PORT, () =>
      console.log(`running on ${process.env.PORT}`)
    );
  });

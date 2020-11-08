import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { MongoDBConnection } from './mongodb';
import { connectMongo } from './middlewares/connect_mongo';
import { RequestHanler } from './common/request_handler';
import { initializePassport } from './middlewares/passport';
import {
  createOrderFromAdmin,
  createOrderFromAdminLogger,
  createOrderFromAdminValidator
} from './app/create_order/create_order';
import redis from 'redis';
import { connectRedis } from './middlewares/connect_redis';
import {
  updateStockFromAdmin,
  updateStockFromAdminValidator
} from './app/admin_update_stock/admin_update_product';

export const createApiServer = (
  mongoConnection: MongoDBConnection,
  redisClient: redis.RedisClient,
  production = false
): express.Express => {
  const server = express();

  //middlewares
  server.use(cors({ credentials: true, origin: true }));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(connectMongo(mongoConnection));
  server.use(connectRedis(redisClient));

  const adminRoute = express.Router();
  adminRoute.use(initializePassport(mongoConnection));
  adminRoute.post(
    '/order',
    RequestHanler(
      createOrderFromAdmin,
      createOrderFromAdminValidator,
      createOrderFromAdminLogger
    )
  );

  adminRoute.post(
    '/stock',
    RequestHanler(updateStockFromAdmin, updateStockFromAdminValidator)
  );

  server.use('/admin', adminRoute);

  //404
  server.use((req, res) => {
    res.status(404).send(`unknown resource: ${req.originalUrl}`);
  });

  server.use((err: Error, req: express.Request, res: express.Response) => {
    if (production) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(500).send(err.stack);
    }
  });

  return server;
};

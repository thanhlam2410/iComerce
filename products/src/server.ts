import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { MongoDBConnection } from './mongodb';
import { connectMongo } from './middlewares/connect_mongo';
import { RequestHanler } from './common/createApiRoute';
import {
  findProductList,
  findProductListValidator
} from './app/products/find_product_list';
import {
  findShopHotline,
  findShopHotlineValidator
} from './app/about/find_shop_hotline';

export const createApiServer = (
  mongoConnection: MongoDBConnection,
  production = false
): express.Express => {
  const server = express();

  //middlewares
  server.use(cors({ credentials: true, origin: true }));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(connectMongo(mongoConnection));

  //endpoints
  const apiRoute = express.Router();
  apiRoute.get(
    '/products',
    RequestHanler(findProductList, findProductListValidator)
  );

  apiRoute.get(
    '/hotline',
    RequestHanler(findShopHotline, findShopHotlineValidator)
  );

  server.use('/api', apiRoute);

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

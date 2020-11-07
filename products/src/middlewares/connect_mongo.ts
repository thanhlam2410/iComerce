import { IRequest } from '../metadata';
import { DataModel, MongoDBConnection } from '../mongodb';
import express from 'express';
import { ProductModel, PRODUCT_SCHEMA } from '../models/product';
import { ADMIN_ACCOUNT_SCHEMA } from '../models/admin_account';

export const connectMongo = (mongodb: MongoDBConnection) => {
  return (req: IRequest, res: express.Response, next: express.NextFunction) => {
    req.mongodb = mongodb;
    initializeDataModel(req);
    return next();
  };
};

const initializeDataModel = (req: IRequest) => {
  const mongodb = req.mongodb;

  req.productModel = new DataModel(mongodb, PRODUCT_SCHEMA, 'product').getModel<
    ProductModel
  >();

  req.adminAccountModel = new DataModel(
    mongodb,
    ADMIN_ACCOUNT_SCHEMA,
    'admin'
  ).getModel();
};

import { IRequest } from '../metadata';
import { DataModel, MongoDBConnection } from '../mongodb';
import express from 'express';
import { ProductModel, PRODUCT_SCHEMA } from '../models/product';

export const connectMongo = (mongodb: MongoDBConnection) => {
  return (req: IRequest, res: express.Response, next: express.NextFunction) => {
    req.mongodb = mongodb;
    initializeDataModel(req);
    return next();
  };
};

const initializeDataModel = (req: IRequest) => {
  const mongodb = req.mongodb;
  const productModel = new DataModel(mongodb, PRODUCT_SCHEMA, 'product');

  req.productModel = productModel.getModel<ProductModel>();
};

import { Request } from 'express';
import { ProductModel } from './models/product';
import { IPaginationModel, MongoDBConnection } from './mongodb';

export interface IRequest extends Request {
  mongodb?: MongoDBConnection;
  productModel?: IPaginationModel<ProductModel>;
}

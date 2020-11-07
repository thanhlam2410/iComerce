import { Request } from 'express';
import { AdminAccountModel } from './models/admin_account';
import { OrderModel } from './models/order';
import { ProductModel } from './models/product';
import { IPaginationModel, MongoDBConnection } from './mongodb';

export interface IRequest extends Request {
  mongodb?: MongoDBConnection;
  productModel?: IPaginationModel<ProductModel>;
  adminAccountModel?: IPaginationModel<AdminAccountModel>;
  orderModel?: IPaginationModel<OrderModel>;
}

import { IRequest } from '../metadata';
import { Response } from 'express';

export const getProducts = async (req: IRequest, res: Response) => {
  const { productModel } = req;

  const products = await productModel.find({});

  res.send({
    payload: products
  });
};

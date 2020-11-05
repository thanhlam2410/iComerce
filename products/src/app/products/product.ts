import { IRequest } from '../../metadata';
import { Response } from 'express';
import { buildQuery, validateAndExtract } from './helper';

export const getProducts = async (req: IRequest, res: Response) => {
  const { productModel } = req;
  const input = await validateAndExtract(req, res);
  const products = await productModel.find(buildQuery(input));

  res.send({
    payload: products
  });
};

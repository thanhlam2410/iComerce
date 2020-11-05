import { IRequest } from '../metadata';
import { Response } from 'express';

export const getProducts = (req: IRequest, res: Response) => {
  res.send({
    payload: []
  });
};

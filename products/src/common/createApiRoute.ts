import { IRequest } from '../metadata';
import express from 'express';

export type Validator<T> = (req: IRequest) => Promise<T>;
export type Controller<T> = (
  input: T,
  req: IRequest,
  res: express.Response,
  next: express.NextFunction
) => Promise<void>;

export const RequestHanler = <T>(
  controller: Controller<T>,
  validator: Validator<T>
) => {
  return async (
    req: IRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let input;
    try {
      input = await validator(req);
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }

    await controller(input, req, res, next);
  };
};

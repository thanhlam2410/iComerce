import { IRequest } from '../metadata';
import express from 'express';
import { isNil } from 'lodash';

export type Validator<T> = (req: IRequest) => Promise<T>;
export type Controller<T> = (
  input: T,
  req: IRequest,
  res: express.Response,
  next: express.NextFunction
) => Promise<void>;
export type Logger<T> = (input: T) => Promise<void>;

export const RequestHanler = <T>(
  controller: Controller<T>,
  validator: Validator<T>,
  logger?: Logger<T>
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

    try {
      if (isNil(logger)) return;
      input = await logger(input);
    } catch (err) {
      console.log(err);
    }
  };
};

import { IRequest } from '../metadata';
import redis from 'redis';
import express from 'express';

export const connectRedis = (redisClient: redis.RedisClient) => {
  return (req: IRequest, res: express.Response, next: express.NextFunction) => {
    req.redis = redisClient;
    return next();
  };
};

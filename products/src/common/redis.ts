import { isNil } from 'lodash';
import redis from 'redis';

export const fetchRedisKey = (client: redis.RedisClient, key: string) => {
  return new Promise<string>((resolve, reject) => {
    client.get(key, (err, value) => {
      if (!isNil(err)) return reject(err);
      resolve(isNil(value) ? '' : value.toString());
    });
  });
};

export const setRedisKey = (
  client: redis.RedisClient,
  key: string,
  value: string
) => {
  return new Promise<string>((resolve, reject) => {
    client.set(key, value, (err, value) => {
      if (!isNil(err)) return reject(err);
      resolve(value);
    });
  });
};

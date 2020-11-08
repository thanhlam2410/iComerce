import { isEmpty, isNil } from 'lodash';
import { IProductSearchInput, ProductOutput } from './metadata';
import redis from 'redis';
import { fetchRedisKey } from '../../common/redis';

export const buildQuery = (input: IProductSearchInput) => {
  const query = {
    brand: { $regex: new RegExp(`.*${input.brand}*`, 'i') },
    name: { $regex: new RegExp(`.*${input.name}*`, 'i') },
    price: {
      $lt: input.lessThan,
      $gt: isNil(input.greaterThan) ? 0 : input.greaterThan
    }
  };

  if (isNil(input.name)) {
    delete query.name;
  }

  if (isNil(input.brand)) {
    delete query.brand;
  }

  if (isNil(input.lessThan)) {
    delete query.price.$lt;
  }

  return query;
};

export const buildSortQuery = (sortField: string, order: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: { [key: string]: any } = {};
  query[sortField] = order === 'asc' ? 1 : -1;

  return query;
};

export const populateProductAvaibility = async (
  client: redis.RedisClient,
  product: ProductOutput
) => {
  const value = await fetchRedisKey(client, product._id.toString());
  console.log(product.name, value);
  return {
    ...product,
    inStock:
      isEmpty(value) || isNaN(Number.parseInt(value))
        ? 0
        : Number.parseInt(value)
  };
};

export const checkProductAvailability = async (
  client: redis.RedisClient,
  products: ProductOutput[]
) => {
  const promises = products.map((item) =>
    populateProductAvaibility(client, item)
  );

  const populatedProducts = await Promise.all(promises);
  return populatedProducts;
};

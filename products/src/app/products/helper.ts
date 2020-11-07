import { isNil } from 'lodash';
import { IProductSearchInput } from './metadata';

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

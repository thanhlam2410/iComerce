import { buildQuery, buildSortQuery, checkProductAvailability } from './helper';
import { Controller, Logger, Validator } from '../../common/request_handler';
import joi from 'joi';
import { IProductSearchInput } from './metadata';
import { isNil } from 'lodash';
import * as Countly from 'countly-sdk-nodejs';
import { ALLOWED_CHARACTER } from '../../common/regex';

export const findProductList: Controller<IProductSearchInput> = async (
  input,
  req,
  res
) => {
  const { productModel } = req;
  const products = await productModel
    .find(buildQuery(input))
    .sort(buildSortQuery(input.sortBy, input.order))
    .lean();

  const payload = await checkProductAvailability(req.redis, products);

  res.send({
    payload
  });
};

export const findProductListValidator: Validator<IProductSearchInput> = async (
  req
) => {
  const { query } = req;
  const INPUT_SCHEMA = joi.object<IProductSearchInput>({
    brand: joi.string().regex(ALLOWED_CHARACTER),
    name: joi.string().regex(ALLOWED_CHARACTER),

    lessThan: joi.number().integer(),
    greaterThan: joi.number().integer(),

    order: joi.string().valid('asc', 'desc'),
    sortBy: joi.string().valid('price', 'name')
  });

  await INPUT_SCHEMA.validateAsync(query);
  const input = query as IProductSearchInput;

  input.order = input.order === 'asc' ? 'asc' : 'desc';

  if (isNil(input.sortBy)) {
    input.sortBy = 'price';
  }

  return input;
};

export const findProductListLogger: Logger<IProductSearchInput> = async (
  input
) => {
  Countly.add_event({
    key: 'product-search',
    segmentation: {
      brand: input.brand,
      maximumPrice: input.greaterThan,
      terms: input.name
    },
    count: 1
  });
};

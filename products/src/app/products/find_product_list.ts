import { buildQuery, buildSortQuery } from './helper';
import { Controller, Validator } from '../../common/createApiRoute';
import joi from 'joi';
import { IProductSearchInput } from './metadata';
import { isNil } from 'lodash';

export const findProductList: Controller<IProductSearchInput> = async (
  input,
  req,
  res
) => {
  const { productModel } = req;
  const products = await productModel
    .find(buildQuery(input))
    .sort(buildSortQuery(input.sortBy, input.order));

  res.send({
    payload: products
  });
};

export const findProductListValidator: Validator<IProductSearchInput> = async (
  req
) => {
  const { query } = req;
  const ALLOWED_CHARACTER = new RegExp("[a-zA-Z0-9,.;:_'\\s-]*");
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

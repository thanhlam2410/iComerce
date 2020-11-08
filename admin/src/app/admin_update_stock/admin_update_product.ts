import { isNil } from 'lodash';
import { Controller, Validator } from '../../common/request_handler';
import { IUpdateStockFromAdminInput } from './metadata';
import joi from 'joi';
import { ID_REGEX } from '../../common/regex';
import { setRedisKey } from '../../common/redis';

export const updateStockFromAdmin: Controller<IUpdateStockFromAdminInput> = async (
  input,
  req,
  res
) => {
  const { redis, productModel } = req;
  const product = await productModel.findById(input.productId);

  if (isNil(product)) {
    res.status(400).send({ error: 'Invalid Product' });
    return;
  }

  await setRedisKey(redis, input.productId.toString(), input.amount.toString());

  res.send({
    success: true
  });
};

export const updateStockFromAdminValidator: Validator<IUpdateStockFromAdminInput> = async (
  req
) => {
  const { body } = req;
  const INPUT_SCHEMA = joi.object<IUpdateStockFromAdminInput>({
    amount: joi.number().integer().min(1).required(),
    productId: joi.string().regex(ID_REGEX).required()
  });

  await INPUT_SCHEMA.validateAsync(body);
  return body as IUpdateStockFromAdminInput;
};

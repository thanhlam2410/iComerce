import { isNil } from 'lodash';
import { Controller, Validator } from '../../common/createApiRoute';
import {
  convertPriceToPaymentValue,
  findAndCheckProductAvaibility
} from './helper';
import { ICreateOrderFromAdminInput } from './metadata';
import joi from 'joi';
import { ALLOWED_CHARACTER } from '../../common/regex';

export const createOrderFromAdmin: Controller<ICreateOrderFromAdminInput> = async (
  input,
  req,
  res
) => {
  const { orderModel, productModel } = req;
  const product = await findAndCheckProductAvaibility(
    input.productId,
    productModel
  );

  if (isNil(product)) {
    res.status(400).send({ error: 'Product is not available' });
    return;
  }

  const { client, paymentCurrency, shippingAddress } = input;
  await orderModel.create({
    client,
    payment: {
      currency: paymentCurrency,
      total: await convertPriceToPaymentValue(product.price, paymentCurrency)
    },
    shipping: { address: shippingAddress }
  });

  res.send({
    success: true
  });
};

export const createOrderFromAdminValidator: Validator<ICreateOrderFromAdminInput> = async (
  req
) => {
  const { body } = req;
  const VIETNAM_PHONE_REGEX = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'g');
  const ID_REGEX = new RegExp(/^[a-f\d]{24}$/, 'i');

  const INPUT_SCHEMA = joi.object<ICreateOrderFromAdminInput>({
    client: joi
      .object({
        name: joi.string().regex(ALLOWED_CHARACTER).required(),
        phone: joi
          .string()
          .custom((value, helpers) => {
            const isValid = VIETNAM_PHONE_REGEX.test(value);
            if (!isValid) {
              return helpers.error('any.invalid');
            }

            return value;
          })
          .required(),
        email: joi.string().email().required(),
        gender: joi.string().valid('M', 'F')
      })
      .required(),
    paymentCurrency: joi.string().valid('vnd', 'usd').required(),
    productId: joi.string().regex(ID_REGEX).required(),
    shippingAddress: joi.string().base64().required().max(255)
  });

  await INPUT_SCHEMA.validateAsync(body);
  return body as ICreateOrderFromAdminInput;
};

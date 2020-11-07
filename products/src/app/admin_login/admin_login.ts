import { Controller, Validator } from '../../common/createApiRoute';
import { IAdminLoginInput } from './metadata';
import joi from 'joi';
import bcrypt from 'bcrypt';
import { isNil } from 'lodash';
import { createJWTToken } from './helper';

export const loginAdminAccount: Controller<IAdminLoginInput> = async (
  input,
  req,
  res
) => {
  const { adminAccountModel } = req;
  const adminUser = await adminAccountModel.findOne({ email: input.email });

  if (isNil(adminUser)) {
    res.status(400).send('Invalid User or Password');
    return;
  }

  const isValidPassword = await bcrypt.compare(
    input.password,
    adminUser.password
  );

  if (!isValidPassword) {
    res.status(400).send('Invalid User or Password');
    return;
  }

  res.send({
    token: createJWTToken(adminUser)
  });
};

export const loginAdminAccountValidator: Validator<IAdminLoginInput> = async (
  req
) => {
  const { body } = req;

  const INPUT_SCHEMA = joi
    .object<IAdminLoginInput>({
      email: joi.string().email().required(),
      password: joi.string().required()
    })
    .required();

  await INPUT_SCHEMA.validateAsync(body);
  return body as IAdminLoginInput;
};

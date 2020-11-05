import joi from 'joi';
import { IRequest } from '../../metadata';
import express from 'express';
import { isNil } from 'lodash';

const ALLOWED_CHARACTER = new RegExp("[a-zA-Z0-9,.;:_'\\s-]*");

interface IProductSearchInput {
  brand?: string;
  name?: string;
  sort?: number;
  lessThan?: number;
  greaterThan?: number;
}

const INPUT_SCHEMA = joi.object<IProductSearchInput>({
  brand: joi.string().regex(ALLOWED_CHARACTER),
  name: joi.string().regex(ALLOWED_CHARACTER),
  sort: joi.number().valid(0, 1),
  lessThan: joi.number().integer(),
  greaterThan: joi.number().integer()
});

export const validateAndExtract = async (
  req: IRequest,
  res: express.Response
) => {
  try {
    const { query } = req;
    await INPUT_SCHEMA.validateAsync(query);
    return query as IProductSearchInput;
  } catch (err) {
    res.status(400).send(err);
  }
};

export const buildQuery = (input: IProductSearchInput) => {
  const query = {
    brand: { $regex: new RegExp(`.*${input.brand}*`, 'i') },
    name: { $regex: new RegExp(`.*${input.name}*`, 'i') }
  };

  if (isNil(input.name)) {
    delete query.name;
  }

  return query;
};

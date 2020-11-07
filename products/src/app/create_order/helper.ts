import { isNil } from 'lodash';
import { ProductModel } from '../../models/product';
import { IPaginationModel } from '../../mongodb';
import { CurrencyValue } from './metadata';

export const findAndCheckProductAvaibility = async (
  productId: string,
  db: IPaginationModel<ProductModel>
) => {
  const product = await db.findById(productId);
  if (isNil(product)) return null;

  return product;
};

export const convertPriceToPaymentValue = async (
  price: number,
  currency: string
) => {
  const exchangeRate = CurrencyValue[currency.toLowerCase()];
  return Math.floor((exchangeRate * price * 100) / 100);
};

import { IClient } from '../../models/order';

export interface ICreateOrderFromAdminInput {
  productId: string;
  client: IClient;
  paymentCurrency: string;
  shippingAddress: string;
}

export const CurrencyValue: {
  [key: string]: number;
} = {
  usd: 1,
  vnd: 23000
};

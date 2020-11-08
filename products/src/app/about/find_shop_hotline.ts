import { Controller, Validator } from '../../common/request_handler';
import { SHOP_INFO } from './shop_info';

export const findShopHotline: Controller<unknown> = async (input, req, res) => {
  res.send(SHOP_INFO);
};

export const findShopHotlineValidator: Validator<unknown> = async () => {
  return {};
};

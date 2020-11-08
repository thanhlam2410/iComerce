import { ProductModel } from '../../models/product';

export interface IProductSearchInput {
  brand?: string;
  name?: string;

  lessThan?: number;
  greaterThan?: number;

  order?: string;
  sortBy?: string;
}

export type ProductOutput = Pick<
  ProductModel,
  | '_id'
  | 'name'
  | 'image'
  | 'price'
  | 'category'
  | 'brand'
  | 'description'
  | 'createdAt'
>;

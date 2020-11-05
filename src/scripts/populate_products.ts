import {
  IProduct,
  ProductModel,
  PRODUCT_SCHEMA,
  ProductCategories
} from '../models/product';
import { connectDatabase } from './connect_database';

const PRODUCTS: IProduct[] = [
  {
    name: 'iPhone 12',
    brand: 'Apple',
    category: ProductCategories.Phones,
    image: '',
    price: 500,
    description: 'iphone'
  },
  {
    name: 'iPhone 11',
    brand: 'Apple',
    category: ProductCategories.Phones,
    image: '',
    price: 300,
    description: 'iphone'
  },
  {
    name: 'iPhone X',
    brand: 'Apple',
    category: ProductCategories.Phones,
    image: '',
    price: 100,
    description: 'iphone'
  },
  {
    name: 'Samsung Note 20',
    brand: 'Samsung',
    category: ProductCategories.Phones,
    image: '',
    price: 500,
    description: 'samsung'
  }
];

const populateProducts = async () => {
  const productModel = await connectDatabase<ProductModel>(
    'product',
    PRODUCT_SCHEMA
  );

  const result = await productModel.create<IProduct[]>(PRODUCTS);
  console.log({
    added: result
  });
};

populateProducts().then(() => console.log('done'));

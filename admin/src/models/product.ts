import { SchemaDefinition, Document } from 'mongoose';

export const PRODUCT_SCHEMA: SchemaDefinition = {
  name: { type: String, required: true },
  image: { type: String, default: '' },
  price: { type: Number, default: 0, required: true },
  brand: { type: String, default: 'Unknown', required: true },
  category: { type: String, enum: ['computers', 'phones', 'accesories'] },
  description: String,
  createdAt: { type: Date, default: Date.now }
};

export interface IProduct {
  name: string;
  image: string;
  price: number;
  category: string;
  brand: string;
  description?: string;
  createdAt?: Date;
}

export enum ProductCategories {
  Computers = 'computers',
  Phones = 'phones',
  Accessories = 'accesories'
}

export type ProductModel = IProduct & Document;

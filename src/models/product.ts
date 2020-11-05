import { SchemaDefinition, Document } from 'mongoose';

export const PRODUCT_SCHEMA: SchemaDefinition = {
  name: String,
  image: String,
  price: { type: Number, default: 0, required: true },
  category: { type: String, enum: ['computers', 'phones', 'accesories'] },
  description: String,
  createdAt: { type: Date, default: Date.now }
};

export interface IProduct {
  name: string;
  image: string;
  price: number;
  category: string;
  description?: string;
  createdAt?: Date;
}

export type ProductModel = IProduct & Document;

import { SchemaDefinition, Document } from 'mongoose';

export const ORDER_SCHEMA: SchemaDefinition = {
  client: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true, enum: ['M', 'F'] }
  },
  payment: {
    total: { type: Number, required: true },
    currency: { type: String, required: true, enum: ['vnd', 'usd'] }
  },
  shipping: {
    address: { type: String, required: true }
  }
};

export enum Gender {
  Male = 'M',
  Female = 'F'
}

export interface IClient {
  name: string;
  phone: string;
  email: string;
  gender: Gender;
}

export interface IShipping {
  address: string;
}

export interface IPayment {
  total: number;
  currency: string;
}

export interface IOrder {
  client: IClient;
  shipping: IShipping;
  payment: IPayment;
}

export type OrderModel = IOrder & Document;

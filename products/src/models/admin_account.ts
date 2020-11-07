import { SchemaDefinition, Document } from 'mongoose';

export const ADMIN_ACCOUNT_SCHEMA: SchemaDefinition = {
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
};

export interface IAdminAccount {
  email: string;
  name: string;
  password: string;
}

export type AdminAccountModel = IAdminAccount & Document;

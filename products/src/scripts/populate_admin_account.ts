import {
  AdminAccountModel,
  ADMIN_ACCOUNT_SCHEMA,
  IAdminAccount
} from '../models/admin_account';
import { connectDatabase } from './connect_database';
import bcrypt from 'bcrypt';

const populateProducts = async () => {
  const productModel = await connectDatabase<AdminAccountModel>(
    'admin',
    ADMIN_ACCOUNT_SCHEMA
  );

  const password = await bcrypt.hash(process.env.ICOMMERCE_ADMIN_PASSWORD, 10);
  const result = await productModel.create<IAdminAccount>({
    name: 'Default',
    email: process.env.ICOMMERCE_ADMIN_EMAIL,
    password
  });

  console.log({
    added: result
  });
};

populateProducts().then(() => console.log('done'));

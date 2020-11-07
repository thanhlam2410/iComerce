import {
  AdminAccountModel,
  ADMIN_ACCOUNT_SCHEMA,
  IAdminAccount
} from '../models/admin_account';
import { connectDatabase } from './connect_database';

const populateProducts = async () => {
  const productModel = await connectDatabase<AdminAccountModel>(
    'admin',
    ADMIN_ACCOUNT_SCHEMA
  );

  const result = await productModel.create<IAdminAccount>({
    name: 'Default',
    email: process.env.ICOMMERCE_ADMIN_EMAIL,
    password: process.env.ICOMMERCE_ADMIN_PASSWORD
  });

  console.log({
    added: result
  });
};

populateProducts().then(() => console.log('done'));

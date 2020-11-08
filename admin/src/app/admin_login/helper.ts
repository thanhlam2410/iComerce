import { AdminAccountModel } from '../../models/admin_account';
import jwt from 'jsonwebtoken';

export const createJWTToken = (user: AdminAccountModel) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name
    },
    process.env.JWTSECRET,
    { expiresIn: '1h' }
  );
};

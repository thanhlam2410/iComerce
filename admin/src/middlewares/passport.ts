import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { DataModel, MongoDBConnection } from '../mongodb';
import {
  AdminAccountModel,
  ADMIN_ACCOUNT_SCHEMA
} from '../models/admin_account';
import express from 'express';
import { RequestHanler } from '../common/request_handler';
import {
  loginAdminAccount,
  loginAdminAccountValidator
} from '../app/admin_login/admin_login';
import { isNil } from 'lodash';

export const initializePassport = (mongodb: MongoDBConnection) => {
  const route = express.Router();
  const adminModel = new DataModel(mongodb, ADMIN_ACCOUNT_SCHEMA, 'admin');

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWTSECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      async (jwt_payload, done) => {
        const user = await adminModel
          .getModel<AdminAccountModel>()
          .findById(jwt_payload.id);

        if (isNil(user)) {
          done('Invalid Token');
          return;
        }

        done(null, user);
      }
    )
  );

  route.use(passport.initialize());
  route.post(
    '/auth',
    RequestHanler(loginAdminAccount, loginAdminAccountValidator)
  );

  route.use(passport.authenticate('jwt'));
  return route;
};

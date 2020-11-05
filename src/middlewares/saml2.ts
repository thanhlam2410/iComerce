import * as samlify from 'samlify';
import * as fs from 'fs';
import * as path from 'path';
import * as validator from '@authenio/samlify-node-xmllint';
import express from 'express';
import { ISaml2Request } from '../metadata';

const binding = samlify.Constants.namespace.binding;
samlify.setSchemaValidator(validator);

export const saml2 = (projectRoot: string) => {
  const identityProvider = samlify.IdentityProvider({
    metadata: fs.readFileSync(path.join(projectRoot, '/keys/identity.xml')),
    wantLogoutRequestSigned: true
  });

  const serviceProvider = samlify.ServiceProvider({
    entityID: process.env.CALLBACK_URL,
    authnRequestsSigned: false,
    wantAssertionsSigned: true,
    wantMessageSigned: true,
    wantLogoutResponseSigned: true,
    wantLogoutRequestSigned: true,
    privateKey: fs.readFileSync(projectRoot + '/keys/privKey.pem'),
    assertionConsumerService: [
      {
        Binding: binding.post,
        Location: process.env.LOGIN_CALLBACK_URL
      }
    ],
    singleLogoutService: [
      {
        Binding: binding.post,
        Location: process.env.LOGIN_CALLBACK_URL
      }
    ]
  });

  return (
    req: ISaml2Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    req.saml2Instance = {
      identityProvider: identityProvider,
      serviceProvider: serviceProvider
    };

    return next();
  };
};

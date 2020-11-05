# NDM SAML2 Service Provider

## Pre-requisite

- Prepare identity provider and their SAML2 metadata

## Setup Application

- Generate a RSA private key for service provider via tool like `openssl`

- Replace production private key in `keys/privKey.pem`

- Replace production identity provider in `keys/identity.xml`

- Copy `.env.sample` to `.env` in same directory level. Fill the file with your production information

- Run `yarn build:release` or `npm run build:realease` to build the application into Dockerimage

- Host the Dockerimage on your production evironment

## Setup Identity Provider

- Configure callback url on service provider based on the information filled inside `.env`

## APIs

- `saml2/login`: handle login request from client and redirect to identity provider site
- `saml2/logout`: handle logout request from client and redirect to identity provider site
- `saml2/metadata`: generate service provider's metadata
  
- `callback/login`: receive login callback from Identity Provider - Redirect to `callback/done` with `isLogin=true` and `token=JWT_TOKEN`
- `callback/logout`: receive logout callback from Identity Provider - Redirect to `callback/done` with `isLogin=false`

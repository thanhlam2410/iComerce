# iCommerce Admin Service

## Important Configurations

- DEV: Development Mode. Required
- PORT: Application's Port. Required
- JWTSECRET: JWT SIGNING KEY. Required
- MONGO_CONNECTION_STRING: Connection String to MONGODB. Required
- COUNTLY_API_KEY: Countly API key. Required
- COUNTLY_SERVER: Endpoint to Countly server. Required
- ICOMMERCE_ADMIN_EMAIL: Default admin email. Required only for running `scripts/populate_admin_account`
- ICOMMERCE_ADMIN_PASSWORD: Default admin password. Required only for running `scripts/populate_admin_account`
- REDIS_PASSWORD: Redis Database password. Required
- REDIS_HOST: Redis Database host. Required
- REDIS_PORT: Redis Database port. Required
- RABBITMQ_URL: Connection String to RabbitMQ. Required

## Run with local node environment

- Copy .env.sample into .env at the same directory
- Populate with correct .env configurations
- Run `yarn start` to start development
- Run `yarn test` to execute unit test

## Run with docker

- Copy .env.sample into .env at the same directory
- Populate with correct .env configurations
- Run `yarn build:release` to build docker image
- Run `docker run --rm -d  -p <YOUR PORT ON HOST MACHINE>:8080/tcp icommerce_admin:latest` to boost up container

## Run Mail Worker

- Copy .env.sample into .env at the same directory
- Populate with correct .env configurations

## First Time Running

- Run `yarn execute scripts/populate_admin_account` to create default admin account
- Run `yarn execute scripts/populate_products` to create default admin account

import dotenv from 'dotenv';
import { MongoDBConnection } from './src/mongodb';
dotenv.config();
import { createApiServer } from './src/server';
import * as Countly from 'countly-sdk-nodejs';

const mongoConnection = new MongoDBConnection();
mongoConnection
  .connect({ connectionString: process.env.MONGO_CONNECTION_STRING })
  .then(() => {
    Countly.init({
      app_key: process.env.COUNTLY_API_KEY,
      url: process.env.COUNTLY_SERVER,
      debug: process.env.DEV === 'true'
    });

    Countly.track_errors();
    return Promise.resolve();
  })
  .then(() => {
    const server = createApiServer(mongoConnection);
    server.listen(process.env.PORT, () =>
      console.log(`running on ${process.env.PORT}`)
    );
  });

import dotenv from 'dotenv';
import { MongoDBConnection } from './src/mongodb';
dotenv.config();
import { createApiServer } from './src/server';

const mongoConnection = new MongoDBConnection();
mongoConnection
  .connect({ connectionString: process.env.MONGO_CONNECTION_STRING })
  .then(() => {
    const server = createApiServer(mongoConnection);
    server.listen(process.env.PORT, () =>
      console.log(`running on ${process.env.PORT}`)
    );
  });

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoDBConnection } from '../mongodb';

dotenv.config();

export const connectDatabase = async <T extends mongoose.Document>(
  collectionName: string,
  schema: mongoose.SchemaDefinition
) => {
  const connection = new MongoDBConnection();
  await connection.connect({
    connectionString: process.env.MONGO_CONNECTION_STRING
  });

  return mongoose.model<T>(collectionName, new mongoose.Schema(schema));
};

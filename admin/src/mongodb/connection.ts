import { IConnectionInterface, IDatabaseOptions } from './metadata';
import mongoose from 'mongoose';

export class MongoDBConnection implements IConnectionInterface {
  private _isConnected = false;
  private _connectionString: string;
  private _instance: typeof mongoose;

  public async connect(opts: IDatabaseOptions) {
    this._connectionString = opts.connectionString;
    this._instance = await mongoose.connect(this._connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this._isConnected = true;
    return this._isConnected;
  }

  public getConnectionString() {
    return this._connectionString;
  }

  public isConnected() {
    return this._isConnected;
  }

  public disconnect() {
    return mongoose.disconnect();
  }

  public getInstance() {
    return this._instance;
  }
}

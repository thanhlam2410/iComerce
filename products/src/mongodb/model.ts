import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IDataRepository, IConnectionInterface } from '.';
import { IPaginationModel } from './metadata';

export class DataModel implements IDataRepository {
  private _schema: mongoose.Schema;
  private _modelName: string;

  constructor(
    private _database: IConnectionInterface,
    schema: mongoose.SchemaDefinition,
    modelName: string,
    options?: mongoose.SchemaOptions
  ) {
    schema.createdAt = {
      type: Number,
      default: Date.now
    };

    this._schema = new mongoose.Schema(schema, options);
    this._schema.plugin(paginate);
    this._modelName = modelName;
  }

  public getModel<T extends mongoose.Document>(): IPaginationModel<T> {
    const mongoose = this._database.getInstance();
    const models = mongoose.modelNames();
    if (models.indexOf(this._modelName) >= 0) {
      return mongoose.model<T>(this._modelName) as IPaginationModel<T>;
    } else {
      return mongoose.model<T>(
        this._modelName,
        this._schema
      ) as IPaginationModel<T>;
    }
  }

  protected ensureConnectionAlive() {
    if (!this._database.isConnected())
      throw new Error('database is not connected');
  }

  public async startTransaction() {
    const session = await mongoose.startSession();
    session.startTransaction();

    return session;
  }
}

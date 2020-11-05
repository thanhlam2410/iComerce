import mongoose from 'mongoose';

export interface IDatabaseOptions {
  connectionString: string;
}

export interface IConnectionInterface {
  connect(opts: IDatabaseOptions): boolean | Promise<boolean>;
  disconnect(): void;
  getInstance(): typeof mongoose;
  isConnected(): boolean;
}

export class ConnectionOptions {
  autoIndex = false;
  reconnectTries: number = Number.MAX_VALUE;
  reconnectInterval = 500;
  poolSize = 5;
  bufferMaxEntries = 0;
  appname = '';
  useNewUrlParser = true;
}

export interface IDataRepository {
  getModel<T extends mongoose.Document>(): mongoose.Model<T>;
}

export interface IPaginationOptions {
  select?: typeof Object | string;
  sort?: typeof Object | string;
  populate?: typeof Object | string;
  pagination?: boolean;
  forceCountFn?: boolean;
  lean?: boolean;
  leanWithId?: boolean;
  offset?: number;
  page?: number;
  limit?: number;
}

export interface IPaginationResults<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
  offset: number;
  prevPage: number;
  nextPage: number;
  pagingCounter: number;
}

export interface IPaginationModel<T extends mongoose.Document>
  extends mongoose.Model<T> {
  paginate: (
    query: typeof Object,
    options: IPaginationOptions
  ) => Promise<IPaginationResults<T>>;
}

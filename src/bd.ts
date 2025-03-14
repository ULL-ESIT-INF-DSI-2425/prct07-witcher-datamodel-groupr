// db.ts
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

export interface Database<T> {
  data: T[];
}

export abstract class GenericDatabase<T> {
  protected _db: LowSync<Database<T>>;

  constructor(dbFile: string = './db/db.json') {
    const adapter = new JSONFileSync<Database<T>>(dbFile);
    
    this._db = new LowSync<Database<T>>(adapter, {data: []});
    this._db.read();
  }

  addEntry(value: T): void {
    if (this.filterEntry(value) != undefined) {
      throw new Error('Value not inserted. Value alredy in table.')
    }
    this._db.data.data.push(value);
    this._db.write();
  }

  getAllEntries(): T [] {
    return this._db.data.data;
  }

  abstract findValues(filter: {}): T[];
  abstract filterEntry(value: T): T | undefined;
  abstract deleteEntry(filter: {}): void;
  abstract modifyEntry(filter: {}): void;
}
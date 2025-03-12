// db.ts
import {Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

type GenericValue = string | number | boolean | object | null;

export interface DataEntry {
  id: number;
  key: string;
  value: GenericValue;
  type: string;
}

export interface Database {
  data: DataEntry[];
}

export class GenericDatabase {
  private _db: Low<Database>;

  constructor(dbFile: string = 'db.json') {
    const adapter = new JSONFile<Database>(dbFile);
    this._db = new Low<Database>(adapter, { data: [] });
  }

  // async init() {
  //   await this.db.read();
  // }

  // async add(key: string, value: GenericValue): Promise<void> {
  //   await this.init();
  //   const newEntry: DataEntry = {
  //     id: this.db.data.data.length + 1,
  //     key,
  //     value,
  //     type: typeof value
  //   };
  //   this.db.data.data.push(newEntry);
  //   await this.db.write();
  // }

  // async findByKey(key: string): Promise<DataEntry | undefined> {
  //   await this.init();
  //   return this.db.data.data.find(entry => entry.key === key);
  // }

  // async getAll(): Promise<DataEntry[]> {
  //   await this.init();
  //   return this.db.data.data;
  // }
}
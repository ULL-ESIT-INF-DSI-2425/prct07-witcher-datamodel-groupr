import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

/**
 * Interface representing the database structure.
 * @template T - The type of data stored in the database.
 */
interface Database<T> {
  /** Array of stored data entries. */
  data: T[];
}

/**
 * Abstract class providing a generic database implementation.
 * Uses LowDB with synchronous file storage.
 * @template T - The type of data entries stored in the database.
 */
export abstract class GenericDatabase<T> {
  /** LowDB instance handling database operations. */
  protected _db: LowSync<Database<T>>;

  /**
   * Initializes the database with the given file path.
   * @param dbFile - The file path for the database storage.
   */
  constructor(dbFile: string = './db/db.json') {
    const adapter = new JSONFileSync<Database<T>>(dbFile);
    this._db = new LowSync<Database<T>>(adapter, { data: [] });
    this._db.read();
  }

  /**
   * Adds a new entry to the database.
   * @param value - The entry to add.
   * @throws Error if the value already exists in the database.
   */
  addEntry(value: T): void {
    if (this.filterEntry(value) != undefined) {
      throw new Error('Value not inserted. Value already in table.');
    }
    this._db.data.data.push(value);
    this._db.write();
  }

  /**
   * Retrieves all entries from the database.
   * @returns An array of all stored entries.
   */
  getAllEntries(): T[] {
    return this._db.data.data;
  }

  /**
   * Finds entries that match the specified filter criteria.
   * Must be implemented by subclasses.
   * @param filter - The criteria to filter entries.
   * @returns An array of matching entries.
   */
  abstract findValues(filter: {}): T[];

  /**
   * Searches for a specific entry in the database.
   * Must be implemented by subclasses.
   * @param value - The entry to search for.
   * @returns The matching entry if found, otherwise undefined.
   */
  abstract filterEntry(value: T): T | undefined;

  /**
   * Deletes entries matching the specified filter criteria.
   * Must be implemented by subclasses.
   * @param filter - The criteria for deletion.
   */
  abstract deleteEntry(filter: {}): void;

  /**
   * Modifies an existing entry based on the provided criteria.
   * Must be implemented by subclasses.
   * @param key - The key identifying the entry to modify.
   * @param filter - The fields to update.
   */
  abstract modifyEntry(key: number, filter: {}): void;

  resetDB(): void {
    this._db.data.data = []; // Vacía los datos
    this._db.write(); // Guarda los cambios en el fichero
  }
}

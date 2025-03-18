import { GenericDatabase } from "./genericDatabase.js";
import { Trader, TraderTypes } from "./traders.js";

/**
 * Database class for managing traders.
 */
export class TradersDB extends GenericDatabase<Trader> {
  /**
   * Initializes the TradersDB instance and sets the database file path.
   */
  constructor() {
    super('./db/TradersDB.json');
  }

  /**
   * Searches for a specific trader in the database by its ID.
   * @param tr - The trader to search for.
   * @returns The matching trader if found, otherwise undefined.
   */
  filterEntry(tr: Trader): Trader | undefined {
    return this._db.data.data.find((t: Trader) => tr.id === t.id);
  }

  /**
   * Retrieves traders that match the specified filter criteria.
   * @param filter - Object containing optional filter criteria.
   * @returns An array of traders matching the filter.
   */
  findValues(filter: {
    id?: number;
    name?: string;
    type?: TraderTypes;
    location?: string;
  }): Trader[] {
    return this._db.data.data.filter((tr: Trader) => {
      return (
        (filter.id == undefined || tr.id === filter.id) &&
        (filter.name == undefined || tr.name === filter.name) &&
        (filter.location == undefined || tr.location === filter.location) &&
        (filter.type == undefined || tr.type === filter.type)
      );
    });
  }

  /**
   * Deletes traders that match the specified filter criteria.
   * @param filter - Object containing optional filter criteria.
   */
  deleteEntry(filter: {
    id?: number;
    name?: string;
    type?: TraderTypes;
    location?: string;
  }): void {
    const deleteData: Trader[] = this.findValues(filter);
    let result: Trader[] = [];
    this._db.data.data.forEach((tr: Trader) => {
      if (deleteData.find((t) => t.id == tr.id) == undefined) {
        result.push(tr);
      }
    });
    this._db.data.data = result;
    this._db.write();
  }

  /**
   * Modifies an existing trader based on the provided filter criteria.
   * @param id - The ID of the trader to modify.
   * @param filter - Object containing the fields to update.
   */
  modifyEntry(
    id: number,
    filter: {
      name?: string;
      type?: TraderTypes;
      location?: string;
    }
  ): void {
    this._db.data.data.forEach((tr: Trader) => {
      if (tr.id === id) {
        if (filter.name) tr.name = filter.name;
        if (filter.location) tr.location = filter.location;
        if (filter.type) tr.type = filter.type;
      }
    });
    this._db.write();
  }
}
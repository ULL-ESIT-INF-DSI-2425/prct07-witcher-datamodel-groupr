import { GenericDatabase } from "./genericDatabase.js";
import { Transactions } from "./transactions.js";

/**
 * Database class for managing transactions.
 */
export class TransactionsDB extends GenericDatabase<Transactions> {
  /**
   * Initializes the TransactionsDB instance and sets the database file path.
   */
  constructor() {
    super('./db/TransactionsDB.json');
  }

  /**
   * Searches for a specific transaction in the database by its ID.
   * @param asset - The transaction to search for.
   * @returns The matching transaction if found, otherwise undefined.
   */
  filterEntry(asset: Transactions): Transactions | undefined {
    return this._db.data.data.find((a: Transactions) => a.id === asset.id);
  }

  /**
   * Retrieves transactions that match the specified filter criteria.
   * @param filter - Object containing optional filter criteria.
   * @returns An array of transactions matching the filter.
   */
  findValues(filter: {
    id?: number;
    date?: string;
    productName?: string;
    productID?: number;
    buying?: boolean;
    clientID?: number;
    involver_crowns?: number;
  }): Transactions[] {
    return this._db.data.data.filter((tr: Transactions) => {
      return (
        (filter.id == undefined || tr.id === filter.id) &&
        (filter.date == undefined || tr.date === filter.date) &&
        (filter.clientID === undefined || tr.clientID === filter.clientID) &&
        (filter.involver_crowns == undefined || tr.involver_crowns === filter.involver_crowns) &&
        (filter.productName == undefined || tr.productName === filter.productName) &&
        (filter.productID == undefined || tr.productID === filter.productID) &&
        (filter.buying == undefined || tr.buying === filter.buying)
      );
    });
  }

  /**
   * Deletes transactions that match the specified filter criteria.
   * @param filter - Object containing optional filter criteria.
   */
  deleteEntry(filter: {
    id?: number;
    date?: string;
    productName?: string;
    productID?: number;
    buying?: boolean;
    clientID?: number;
    involver_crowns?: number;
  }): void {
    const deleteData: Transactions[] = this.findValues(filter);
    let result: Transactions[] = [];
    this._db.data.data.forEach((tr: Transactions) => {
      if (deleteData.find((t) => t.id == tr.id) == undefined) {
        result.push(tr);
      }
    });
    this._db.data.data = result;
    this._db.write();
  }

  /**
   * Modifies an existing transaction based on the provided filter criteria.
   * @param id - The ID of the transaction to modify.
   * @param filter - Object containing the fields to update.
   */
  modifyEntry(
    id: number,
    filter: {
      date?: string;
      productName?: string;
      productID?: number;
      buying?: boolean;
      clientID?: number;
      involver_crowns?: number;
    }
  ): void {
    this._db.data.data.forEach((tr: Transactions) => {
      if (tr.id === id) {
        if (filter.date) tr.date = filter.date;
        if (filter.productName) tr.productName = filter.productName;
        if (filter.productID) tr.productID = filter.productID;
        if (filter.buying !== undefined) tr.buying = filter.buying;
        if (filter.clientID) tr.clientID = filter.clientID;
        if (filter.involver_crowns) tr.involver_crowns = filter.involver_crowns;
      }
    });
    this._db.write();
  }
}

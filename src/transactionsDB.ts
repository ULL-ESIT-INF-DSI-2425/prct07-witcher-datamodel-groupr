// Inventary.ts
import { GenericDatabase } from "./bd.js";

export enum TransactionType { SELL, BUY, RETURN}

export enum ReturnReasonType { DISSATISFACTION, DEFECTIVE }

export interface Transactions {
  id: number
  type: TransactionType;
  trID: number;
  date: string;
  clientID: number;
  productName: string;
  buying: boolean
  productID: number;
  involver_crowns?: number;
  return_reason?: ReturnReasonType;
}

export class TransactionsDB extends GenericDatabase<Transactions> {
  constructor() {
    super('./db/TransactionsDB.json')
  }

  filterEntry(asset: Transactions): Transactions | undefined {
    return this._db.data.data.find((a: Transactions) => a.id === asset.id)
  }

  findValues(filter: {
    id?: number
    type?: TransactionType;
    trID?: number;
    date?: string;
    productName?: string,
    productID?: number,
    buying?: boolean
    clientID?: number;
    involver_crowns?: number;
    return_reason?: ReturnReasonType;
   }): Transactions[] {
    return this._db.data.data.filter((tr: Transactions) => {
      return(
        (filter.id == undefined || tr.id === filter.id) &&
        (filter.type == undefined || tr.type === filter.type) &&
        (filter.trID == undefined || tr.trID === filter.trID) &&
        (filter.date == undefined || tr.date === filter.date) &&
        (filter.clientID === undefined || tr.clientID === filter.clientID) &&
        (filter.involver_crowns == undefined || tr.involver_crowns === filter.involver_crowns) &&
        (filter.return_reason == undefined || tr.return_reason === filter.return_reason)
      );
    });
  }

  deleteEntry(filter: {
    id?: number
    type?: TransactionType;
    trID?: number;
    date?: string;
    involver_crowns?: number;
    return_reason?: ReturnReasonType;
  }): void {
    const deleteData: Transactions[] = this.findValues(filter);
    let result: Transactions[] = [];
    this._db.data.data.forEach((tr:Transactions) => {
      if (deleteData.find((t) => t.id == tr.id) == undefined) {
        result.push(tr);
      }
    })
    this._db.data.data = result;
    this._db.write()
  }

  modifyEntry(id: number, filter: {
    type?: TransactionType;
    trID?: number;
    date?: string;
    involver_crowns?: number;
    return_reason?: ReturnReasonType;
   }): void {
    this._db.data.data.forEach((tr: Transactions) => {
      if (tr.id === id) {
        if (filter.type) tr.type = filter.type;
        if (filter.trID) tr.trID = filter.trID;
        if (filter.date) tr.date = filter.date;
        if (filter.involver_crowns) tr.involver_crowns = filter.involver_crowns;
        if (filter.return_reason) tr.return_reason = filter.return_reason;
      }
    })
    this._db.write()
  }
}

import { TransactionsDB, Transactions } from "./transactionsDB.js";
import { AssetsDB } from "./AssetsDB.js";

export enum InformType { STOCKSTATE, MOSTSELL, MOSTDEMANDED, TRADERSINCOME, CLIENTSBILLS, HISTROYTRADER, HISTORYCLIENT}

export class Inventary {
  private _assets: AssetsDB;
  private _transactions: TransactionsDB;

  constructor() {
    this._assets = new AssetsDB();
    this._transactions = new TransactionsDB();
  }

  stockControl(): void {
    
  }

  registerTransaction(tr: Transactions ): void {
    
  }

  generateInform(informt: InformType) {
    // Creo que esto hay que transformarlo en una clase que genera informes
  }
}
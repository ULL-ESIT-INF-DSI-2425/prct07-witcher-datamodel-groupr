import { TransactionsDB } from "./transactionsDB.js";
import { Transactions } from "./transactions.js";
import { AssetsDB } from "./AssetsDB.js";
import { AssetType } from "./assets.js";
import { AssetInformGenerator } from './assetInformGenerator.js'
import { BenefitsInformGenerator } from "./benefitsInformGenerator.js";
import { TraderInformGenerator } from "./traderInformGenerator.js";

export enum InformType { STOCKSTATE, STOCKTYPE, BENEFITS, TRADERHISTORY}

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
    console.log('Adding a new transaction...')
    this._transactions.addEntry(tr)
    console.log('Registered succesfully')
  }

  generateInform(informt: InformType, id?: number, assetType?: AssetType) {
    
    switch(informt) {
      case InformType.STOCKSTATE:
        const stockInform = new AssetInformGenerator(this._assets)
        if (id === undefined) {
          console.log('Generating inform of the assets...')
        }
        else {
          console.log('Generating inform of an asset...')
        }
        stockInform.generateInform(id)
        break
      case InformType.STOCKTYPE:
        console.log('Generating infrom of a stock type...')
        const stockTypeInform = new AssetInformGenerator(this._assets)
        stockTypeInform.generateTypeInform(assetType)
        break
      case InformType.BENEFITS:
        console.log('Generating inform of benefits...')
        const benefitInform = new BenefitsInformGenerator(this._transactions)
        benefitInform.generateInform()
        break
      case InformType.TRADERHISTORY:
        console.log('Generating inform of a trader...')
        const traderInform = new TraderInformGenerator(this._transactions)
        traderInform.generateInform(id)
        break 
      default:
        console.log('Choose a correct inform type (STOCKSTATE, STOCKTYPE, BENEFITS, TRADERHISTORY')
    }
    return
  }
}
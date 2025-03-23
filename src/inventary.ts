import { TransactionsDB } from "./transactionsDB.js";
import { Transactions } from "./transactions.js";
import { AssetsDB } from "./AssetsDB.js";
import { Asset, AssetType } from "./assets.js";
import { AssetInformGenerator } from './assetInformGenerator.js'
import { BenefitsInformGenerator } from "./benefitsInformGenerator.js";
import { TraderInformGenerator } from "./traderInformGenerator.js";

/**
 * Enum that defines the type of inform that can be generated
 */
export enum InformType { STOCKSTATE, STOCKTYPE, BENEFITS, TRADERHISTORY}

/**
 * Class that represents the inventary of the company
 */
export class Inventary {
  private _assets: AssetsDB;
  private _transactions: TransactionsDB;
  /**
   * Constructor of the class
   */
  constructor() {
    this._assets = new AssetsDB();
    this._transactions = new TransactionsDB();
  }

  /**
   * Sells an asset, generating a transaction and adding it to the database
   * Also deleting the asset from the database
   * @param id Id of the asset to sell
   * @param traderID Id of the trader that is selling the asset
   * @param date Date of the transaction
   * @param transactionID Id of the transaction
   * @returns 
   */
  sellAsset(id: number, traderID: number, date: string, transactionID: number): void {
    console.log('Selling asset...')
    const db = new AssetsDB()
    const transactionsDB = new TransactionsDB()
    const asset = db.getAllEntries().filter((a) => a.id === id)
    if (asset.length === 0) {
      console.log('Asset not found')
      return
    }
    else {
      transactionsDB.addEntry({
        id: transactionID,
        date: date,
        clientID: traderID,
        productName: asset[0].name,
        buying: false,
        productID: id,
        involver_crowns: asset[0].crown_value
      })
      db.deleteEntry({id: id})
      console.log('Asset sold succesfully')
    }
  }

  /**
   * Buys an asset, generating a transaction and adding it to the database
   * Also creating a new asset and adding it to the database
   * @param id Id of the asset to buy
   * @param traderID Id of the trader that is buying the asset
   * @param date Date of the transaction
   * @param transactionID Id of the transaction
   * @param productName Name of the product
   * @param crown_value Crown value of the product
   * @param assetType Type of the asset
   * @returns 
   */
  buyAsset(id: number, traderID: number, date: string, transactionID: number, productName: string, crown_value: number, assetType: AssetType): void {
    console.log('Buying asset...')
    const db = new AssetsDB()
    const transactionsDB = new TransactionsDB()
    const asset = db.getAllEntries().filter((a) => a.id === id)
    if (asset.length === 0) {
      transactionsDB.addEntry({
        id: transactionID,
        date: date,
        clientID: traderID,
        productName: productName,
        buying: true,
        productID: id,
        involver_crowns: crown_value
      })
      db.addEntry({
        id: id,
        name: productName,
        description: 'None',
        material: 'None',
        weight: 0,
        crown_value: crown_value,
        type: assetType
      })
      console.log('Asset bought succesfully')
    }
    else {
      console.log('Asset already in the database')
      return 
    }
  }

  /**
   * Adds a new transaction to the database
   * @param tr Transaction to register
   */
  registerTransaction(tr: Transactions ): void {
    console.log('Adding a new transaction...')
    this._transactions.addEntry(tr)
    console.log('Registered succesfully')
  }
  /**
   * Generates an inform depending on the type of inform requested
   * @param informt - Type of inform to generate
   * @param id - Id of the asset or trader to generate the inform
   * @param assetType Type of the asset to generate the inform
   * @returns 
   */
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
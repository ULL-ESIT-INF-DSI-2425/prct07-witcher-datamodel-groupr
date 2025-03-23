import { AssetsDB } from "./AssetsDB.js"
import { ClientsDB } from "./clientsDB.js"
import { InformType } from "./inventary.js"
import { TradersDB } from "./tradersDB.js"
import { TransactionsDB } from "./transactionsDB.js"

/**
 * Interface that defines the method to generate information
 */
export interface GenerateInform {
  generateInform(id?: number): void
}

/**
 * Abstract class that defines the method to generate information
 */
export abstract class InformGenerator implements GenerateInform {
  abstract generateInform(id?: number): void
  /**
   * Dependidng on the type of inform, it will generate the information of the assets, the benefits or the traders, so 
   * each data base could be undefined depending on the type of inform
   * @param stock Database of assets
   * @param transactions Database of transactions
   */
  constructor(protected stock: AssetsDB | undefined, protected transactions: TransactionsDB | undefined)
  {}
}
import { AssetsDB } from "./AssetsDB.js"
import { ClientsDB } from "./clientsDB.js"
import { InformType } from "./inventary.js"
import { TradersDB } from "./tradersDB.js"
import { TransactionsDB } from "./transactionsDB.js"

export interface GenerateInform {
  generateInform(id?: number): void
}

export abstract class InformGenerator implements GenerateInform {
  abstract generateInform(id?: number): void
  constructor(protected stock: AssetsDB | undefined, protected transactions: TransactionsDB | undefined)
  {}
}
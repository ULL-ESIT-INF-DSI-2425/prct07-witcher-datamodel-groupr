import { InformGenerator } from "./informGenerator.js";
import { TradersDB } from "./tradersDB.js";
import { TransactionsDB } from "./transactionsDB.js";

export class TraderInformGenerator extends InformGenerator {
  constructor(transactionDB: TransactionsDB) {
    super(undefined, transactionDB)
  }
  generateInform(id?: number): void {
    if (id === undefined) {
      return
    }
    let clientIDValue = {
      clientID: id
    }
    let transactions = this.transactions?.findValues(clientIDValue)
    console.log(`Number of transactions: ${transactions?.length}`)
    let IDs = ''
    transactions?.forEach(transaction => {
      IDs += `${transaction.id}, `
    })
    transactions = transactions?.slice(0, -2)
    console.log(`IDs of '${id} trnasactions: ${transactions}`)
    let boughProducts = ''
    transactions?.forEach(transaction => {
      if (!transaction.buying) {
        boughProducts += `${transaction.productName}, `
      }
    })
    boughProducts = boughProducts.slice(0, -2)
    console.log(`List of bought products: ${boughProducts}`)
    let soldProducts = ''
    transactions?.forEach(transaction => {
      if (transaction.buying) {
        soldProducts += `${transaction.productName}`
      }
    })
    soldProducts = soldProducts.slice(0, -2)
    console.log(`List of sold products: ${soldProducts}`)
  }
}
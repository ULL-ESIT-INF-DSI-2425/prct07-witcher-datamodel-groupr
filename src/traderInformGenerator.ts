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
    if (transactions?.length === 0) {
      console.log(`The trader with id ${id} is not registered`)
      return
    }
    console.log(`-------------------Showing information of trader ${id} --------------------------------------`)
    console.log(`Number of transactions: ${transactions?.length}`)
    let IDs = ''
    transactions?.forEach(transaction => {
      IDs += `${transaction.id}, `
    })
    IDs = IDs.slice(0, -2)
    console.log(`IDs of the trader trnasactions: ${IDs}`)
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
        soldProducts += `${transaction.productName}, `
      }
    })
    soldProducts = soldProducts.slice(0, -2)
    console.log(`List of sold products: ${soldProducts}`)
    console.log('---------------------------------------------------------------------------------------------')
  }
}
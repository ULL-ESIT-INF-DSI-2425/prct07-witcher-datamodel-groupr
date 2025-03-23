import { InformGenerator } from "./informGenerator.js";
import { TransactionsDB } from "./transactionsDB.js";

/**
 * This class is a subclass of InformGenerator, it is used to generate information of the traders 
 */
export class TraderInformGenerator extends InformGenerator {
  constructor(transactionDB: TransactionsDB) {
    super(undefined, transactionDB)
  }
  /**
   * Generates an infrom of a trader
   * @param id - The id of the trader to generate the information
   * @returns 
   */
  generateInform(id?: number): void {
    if (id === undefined) {
      console.log('No id was provided')
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
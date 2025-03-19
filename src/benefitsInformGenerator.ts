import { InformGenerator } from "./informGenerator.js"
import { TransactionsDB } from "./transactionsDB.js"

export class BenefitsInformGenerator extends InformGenerator {
  constructor(transactionDB: TransactionsDB) {
    super(undefined, transactionDB)
  }
  generateInform(id?: number): void {
    let benefits: number = 0
    let losts: number = 0
    let boughAssets = this.transactions?.getAllEntries().filter(transaction => {
      return transaction.buying === true
    })
    boughAssets?.forEach(transaction => {
      if (transaction.involver_crowns !== undefined) {
        losts += transaction.involver_crowns
      }
    })
    let soldAssets = this.transactions?.getAllEntries().filter(transaction => {
      return transaction.buying === false
    })
    soldAssets?.forEach(transaction => {
      if (transaction.involver_crowns !== undefined) {
        benefits += transaction.involver_crowns
      }
    })
    console.log(`-------------------Showing information of benefits --------------------------------------`)
    console.log(`Benefits: ${benefits} crowns`)
    console.log(`Losts: ${losts} crowns`)
    console.log(`Total balance: ${benefits - losts}`)
    console.log('---------------------------------------------------------------------------------------------')
  }
}
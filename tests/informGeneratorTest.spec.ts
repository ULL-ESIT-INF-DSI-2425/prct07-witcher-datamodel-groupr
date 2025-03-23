import { AssetsDB } from "../src/AssetsDB"; 
import { TransactionsDB } from "../src/transactionsDB";
import { BenefitsInformGenerator } from "../src/benefitsInformGenerator";
import { TraderInformGenerator } from "../src/traderInformGenerator";
import { AssetInformGenerator } from "../src/assetInformGenerator";
import { AssetType} from "../src/assets";
import {vi} from 'vitest'
import { describe, expect, test, it} from 'vitest'

describe('AssetInformationGenerator class tests', () => {
  it('', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  });
  const db = new AssetsDB();
  const assetInform = new AssetInformGenerator(db)
  test('Class constructor', () => {
    expect(assetInform).toBeInstanceOf(AssetInformGenerator)
  })
  test('Generate inform method test with a non exist id', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    assetInform.generateInform(9999)
    expect(consoleSpy).toHaveBeenCalledWith(`The asset with ID 9999 is not available`)
  })
  test('Generate inform method test with a exist id', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    assetInform.generateInform(1)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, `-------------------Showing information of asset(1)--------------------------------------`)
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `This asset its currently available (amount: 1)`)
    expect(consoleSpy).toHaveBeenNthCalledWith(3, `Information of the asset: `)
    expect(consoleSpy).toHaveBeenNthCalledWith(4, `Id: 1`)
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `Name: Espada de Fuego Eterno`)
    expect(consoleSpy).toHaveBeenNthCalledWith(6, `Description o the asset: Forjada en los volcanes de Kraz-Thun, arde sin consumir metal.`)
    expect(consoleSpy).toHaveBeenNthCalledWith(7, `Material: Mithril`)
    expect(consoleSpy).toHaveBeenNthCalledWith(8, `weight: 5`)
    expect(consoleSpy).toHaveBeenNthCalledWith(9, `Crown value: 500`)
    expect(consoleSpy).toHaveBeenNthCalledWith(10, `---------------------------------------------------------------------------------------------`)
  })
})

describe('BenefitsInformGenerator class tests', () => {
  test('generateInformMethod', () => {
    const db = new TransactionsDB()
    const benefitsInform = new BenefitsInformGenerator(db)
    const consoleSpy = vi.spyOn(console, 'log')
    benefitsInform.generateInform()
    expect(consoleSpy).toHaveBeenNthCalledWith(1, `-------------------Showing information of benefits --------------------------------------`)
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `Benefits: 0 crowns`)
    expect(consoleSpy).toHaveBeenNthCalledWith(3, `Losts: 0 crowns`)
    expect(consoleSpy).toHaveBeenNthCalledWith(4, `Total balance: 0`)
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `---------------------------------------------------------------------------------------------`)
  })
})

describe('TraderInformGenerator class tests', () =>  {
  let db = new TransactionsDB()
  const traderInform = new TraderInformGenerator(db)
  test('generateInformMethod wiht no id', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    traderInform.generateInform()
    expect(consoleSpy).toHaveBeenCalledWith('No id was provided')
  })
  test('generateInformMethod with a non exist id', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    traderInform.generateInform(1)
    expect(consoleSpy).toHaveBeenCalledWith(`The trader with id 1 is not registered`)
  })
  test('generateInformMethod with a exist id', () => {
    //adding a new transaction
    db.addEntry({ id: 9999, date: 'TestDate', clientID: 9999, productName: 'TestProduct', buying: false, productID: 1, involver_crowns: 1 })
    const consoleSpy = vi.spyOn(console, 'log')
    traderInform.generateInform(9999)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, `-------------------Showing information of trader 9999 --------------------------------------`)
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `Number of transactions: 1`)
    expect(consoleSpy).toHaveBeenNthCalledWith(3, `IDs of the trader trnasactions: 9999`)
    expect(consoleSpy).toHaveBeenNthCalledWith(4, `List of bought products: TestProduct`)
    expect(consoleSpy).toHaveBeenNthCalledWith(5, `List of sold products: `)
    expect(consoleSpy).toHaveBeenNthCalledWith(6, `---------------------------------------------------------------------------------------------`)
    db.deleteEntry({id: 9999})
  })
  
})
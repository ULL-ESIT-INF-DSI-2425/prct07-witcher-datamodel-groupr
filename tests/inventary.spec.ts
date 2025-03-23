import {describe, test, expect, vi, it} from 'vitest'
import { AssetsDB} from '../../prct07-witcher-datamodel-groupr/src/AssetsDB.js'
import { AssetType } from '../../prct07-witcher-datamodel-groupr/src/assets.js';
import {InformType, Inventary} from '../../prct07-witcher-datamodel-groupr/src/inventary.js'
import { Transactions } from '../../prct07-witcher-datamodel-groupr/src/transactions.js';
import { TransactionsDB } from '../../prct07-witcher-datamodel-groupr/src/transactionsDB.js';

describe('Tests of Inventory class', () => {
  it('', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
  const db = new TransactionsDB()
 //A new transactions DB
  const transactionEntry: Transactions = { id: 9999, date: 'TestDate', clientID: 9999, productName: 'TestProduct', buying: true, productID: 1, involver_crowns: 1 }
  const inventary = new Inventary()
  test('Class constructor', () => {
    db.resetDB()
    expect(inventary).toBeInstanceOf(Inventary)
  })
  test('Register transaction method', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    inventary.registerTransaction(transactionEntry);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, `Adding a new transaction...`)
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `Registered succesfully`)
    consoleSpy.mockClear();
    //If we try adding the same value, it should raise an error
    expect(() => {
      inventary.registerTransaction(transactionEntry); // Simulamos un argumento inválido
    }).toThrow('Value not inserted. Value already in table.');
    db.resetDB()
  })
  test('Generate inform method', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    inventary.generateInform(InformType.STOCKSTATE)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating inform of the assets...')
    consoleSpy.mockClear()
    inventary.generateInform(InformType.STOCKSTATE, 1)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating inform of an asset...')
    consoleSpy.mockClear()
    inventary.generateInform(InformType.STOCKTYPE, undefined, AssetType.WEAPON)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating infrom of a stock type...')
    consoleSpy.mockClear()
    inventary.generateInform(InformType.BENEFITS)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating inform of benefits...')
    consoleSpy.mockClear()
    inventary.generateInform(InformType.TRADERHISTORY)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating inform of a trader...')
  })
  test('Buy asset method', () => {
    const assetDB = new AssetsDB()
    const transactionsDB = new TransactionsDB()
    const consoleSpy = vi.spyOn(console, 'log')
    inventary.buyAsset(9996, 9996, 'TestDate', 1, 'producttest', 1, AssetType.WEAPON)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Buying asset...')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Asset bought succesfully')
    consoleSpy.mockClear()
    assetDB.deleteEntry({id: 9996})
    transactionsDB.resetDB()
  })
  test('sellAssetMethod', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    //adding an asset to the database
    const assetdb = new AssetsDB()
    const transactionsDB = new TransactionsDB()
    assetdb.addEntry({id: 40, name: 'TestAsset', description: 'None', material: 'None', weight: 0, crown_value: 40, type: AssetType.WEAPON})
    inventary.sellAsset(40, 40, 'TestDate', 40)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Selling asset...')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Asset sold succesfully')
    consoleSpy.mockClear()
    inventary.sellAsset(40, 40, 'TestDate', 40)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Selling asset...')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'Asset not found')
    consoleSpy.mockClear()
    transactionsDB.resetDB()
  })
})
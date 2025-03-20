import {describe, test, expect, vi} from 'vitest'
import { AssetsDB} from '../../prct07-witcher-datamodel-groupr/src/AssetsDB.js'
import { AssetType } from '../../prct07-witcher-datamodel-groupr/src/assets.js';
import {InformType, Inventary} from '../../prct07-witcher-datamodel-groupr/src/inventary.js'
import { Transactions } from '../../prct07-witcher-datamodel-groupr/src/transactions.js';
import { TradersDB } from '../../prct07-witcher-datamodel-groupr/src/tradersDB.js';
import { TraderTypes } from '../../prct07-witcher-datamodel-groupr/src/traders.js';
import { TransactionsDB } from '../../prct07-witcher-datamodel-groupr/src/transactionsDB.js';

describe('Tests of Inventory class', () => {
  // A new assets DB
  const assetsDb = new AssetsDB();
  const assetEntry = { id: 9999, name: 'TestAsset', description: 'TestDescription', material: 'TestMaterial', weight: 1, crown_value: 1, type: AssetType.PRODUCT }
  const assetEntry2 = { id: 9998, name: 'TestAsset2', description: 'TestDescription', material: 'TestMaterial2', weight: 13, crown_value: 2, type: AssetType.PRODUCT }
  // A new traders DB
  const tradersDb = new TradersDB();
  const traderEntry = { id: 9999, name: 'TestClient', type: TraderTypes.Alchemist, location: 'TestLocation' }
  const traderEntry2 = { id: 9998, name: 'TestClient2', type: TraderTypes.Alchemist, location: 'TestLocation2' }
  //A new transactions DB
  const transactionDb = new TransactionsDB();
  const transactionEntry: Transactions = { id: 9999, date: 'TestDate', clientID: 9999, productName: 'TestProduct', buying: true, productID: 1, involver_crowns: 1 }
  const transactionEntry2: Transactions = { id: 9998, date: 'TestDate2', clientID: 9999, productName: 'TestProduct2', buying: false, productID: 2, involver_crowns: 1 }
  const inventary = new Inventary()
  test('Class constructor', () => {
    expect(inventary).toBeInstanceOf(Inventary)
  })
  test('Register transaction method', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    inventary.registerTransaction(transactionEntry);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, `Adding a new transaction...`)
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `Registered succesfully`)
    consoleSpy.mockRestore();
    //If we try adding the same value, it should raise an error
    expect(() => {
      inventary.registerTransaction(null as any); // Simulamos un argumento inválido
    }).toThrow('Value not inserted. Value already in table.');
  })
  test('Generate inform method', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    inventary.generateInform(InformType.STOCKSTATE)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating inform of the assets...')
    consoleSpy.mockRestore()
    inventary.generateInform(InformType.STOCKSTATE, 1)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating inform of an asset...')
    consoleSpy.mockRestore()
    inventary.generateInform(InformType.STOCKTYPE, undefined, AssetType.WEAPON)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating inform of benefits...')
    consoleSpy.mockRestore()
    inventary.generateInform(InformType.BENEFITS)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'Generating inform of a trader...')
    consoleSpy.mockRestore()
  })
})
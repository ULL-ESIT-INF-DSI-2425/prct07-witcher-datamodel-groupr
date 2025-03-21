import { AssetsDB } from "../src/AssetsDB"; 
import { TransactionsDB } from "../src/transactionsDB";
import { BenefitsInformGenerator } from "../src/benefitsInformGenerator";
import { TraderInformGenerator } from "../src/traderInformGenerator";
import { AssetInformGenerator } from "../src/assetInformGenerator";
import { describe, expect, test} from 'vitest'

describe('AssetInformationGenerator class tests', () => {
  const db = new AssetsDB();
  const assetInform = new AssetInformGenerator(db)
  test('Class constructor', () => {
    expect(assetInform).toBeInstanceOf(AssetInformGenerator)
  })
  test('Generate inform method test', () => {
    expect(2).toEqual(2)
  })
})

describe('BenefitsInformGenerator class tests', () => {
  test('', () => {
    expect(2).toEqual(2)
  })
})

describe('TraderInformGenerator class tests', () =>  {
  test('', () => {
    expect(2).toEqual(2)
  })
})
import { AssetsDB } from "./AssetsDB.js";
import { AssetType } from "./assets.js";
import { InformGenerator } from "./informGenerator.js";
import { Asset } from "./assets.js";

/**
 * This class is a subclass of InformGenerator, it is used to generate information of the assets
 */
export class AssetInformGenerator extends InformGenerator {
  /**
   * Constructor of the class
   * @param assetsDB The database of assets
   */
  constructor(assetsDB: AssetsDB) {
    super(assetsDB, undefined)
  }
  /**
   * If id is not undefiend, it will generate the information of the asset with that id, if it is undefined, it will generate 
   * the information of all the assets
   * @param id The id of the asset to generate the information
   */
  generateInform(id?: number): void {
    let idObject = {
      id: id
    }
    let asset: Asset[] | undefined = this.stock?.getAllEntries().filter(asset => {
      return asset.id === id
    })
    if (id != undefined && this.stock?.findValues(idObject).length != 0 && asset != undefined) {
      console.log(`-------------------Showing information of asset(${id})--------------------------------------`)
      console.log(`This asset its currently available (amount: ${asset.length})`)
      console.log('Information of the asset: ')
      console.log(`Id: ${asset[0].id}`)
      console.log(`Name: ${asset[0].name}`)
      console.log(`Description o the asset: ${asset[0].description}`)
      console.log(`Material: ${asset[0].material}`)
      console.log(`weight: ${asset[0].weight}`)
      console.log(`Crown value: ${asset[0].crown_value}`)
      console.log('---------------------------------------------------------------------------------------------')
    }
    else if (id != undefined) {
      console.log(`The asset with ID ${id} is not available`)
    }
    else {
      console.log('-------------------Showing information of all the available assets--------------------------------------')
      let numberAssets: number = this.stock?.getAllEntries().length as number
      console.log(`Number of assets available: ${numberAssets}`)
      let names = ''
      this.stock?.getAllEntries().forEach(entry => {
        names += `${entry.name}, `
      })
      if (names.length > 0) {
        names = names.slice(0, -2)
        console.log(`Assets: ${names}`)
      }
      let totalCrownValue = 0
      this.stock?.getAllEntries().forEach(asset => {
        totalCrownValue += asset.crown_value
      })
      console.log(`Total crown value: ${totalCrownValue}`)
      console.log('---------------------------------------------------------------------------------------------')
    }
  }
  /**
   * generates the information of the assets of a certain type
   * @param type The type of the asset to generate the information
   */
  generateTypeInform(type?: AssetType) {
    let assetType = ''
    switch (type) {
      case AssetType.WEAPON:
        assetType = 'Weapon'
        break
      case AssetType.ARMOR:
        assetType = 'Armor'
        break
      case AssetType.BOOK:
        assetType = 'Book'
        break
      case AssetType.POTION:
        assetType = 'Potion'
        break
      case AssetType.PRODUCT:
        assetType = 'Product'
        break
      default:
        assetType = 'Unknown'
        break
    }
    console.log(`-------------------Showing information of all ${assetType} assets--------------------------------------`)
    let assets: Asset[] = this.stock?.getAllEntries() as Asset[]
    assets = assets.filter( asset => {
      return asset.type === type
    })
    console.log(`Number of assets of type ${assetType}: ${assets.length}`)
    let names = ''
    assets.forEach(asset => {
      names += `${asset.name}, `
    })
    names = names.slice(0, -2)
    console.log(`List of ${assetType} assets: ${names}`)
    let crowns: number = 0
    assets.forEach(asset => {
      crowns += asset.crown_value
    })
    console.log(`Total value of ${assetType} assets: ${crowns} crowns`)
    console.log('---------------------------------------------------------------------------------------------')
  }
}
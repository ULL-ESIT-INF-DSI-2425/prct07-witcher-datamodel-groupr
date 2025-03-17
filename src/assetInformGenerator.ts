import { AssetsDB, AssetType } from "./AssetsDB.js";
import { InformGenerator } from "./informGenerator.js";
import { Asset } from "./assets.js";


export class AssetInformGenerator extends InformGenerator {
  constructor(assetsDB: AssetsDB) {
    super(assetsDB, undefined)
  }
  generateInform(id?: number): void {
    let idObject = {
      id: id
    }
    let asset: Asset[] | undefined = this.stock?.findValues(idObject)
    if (id != undefined && this.stock?.findValues(idObject).length != 0 && asset != undefined) {
      console.log(`This asset its currently available (amount: ${asset.length})`)
      console.log('Information of the asset: ')
      console.log(`Id: ${asset[0].id}}`)
      console.log(`Name: ${asset[0].name}`)
      console.log(`Description o the asset: ${asset[0].description}`)
      console.log(`Material: ${asset[0].material}`)
      console.log(`Weigth: ${asset[0].weigth}`)
      console.log(`Crown value: ${asset[0].crown_value}`)
    }
    else if (id != undefined) {
      console.log(`The asset with ID '${id} is not available`)
    }
    else {
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
    }
  }
  generateTypeInform(type: AssetType) {
    let assets: Asset[] = this.stock?.getAllEntries() as Asset[]
    console.log(`Number of assets of type ${type}: ${assets.length}`)
    let names = ''
    assets.forEach(asset => {
      names += `${asset.name}, `
    })
    names = names.slice(0, -2)
    console.log(`List of ${type} assets: ${names}`)
    let crowns: number = 0
    assets.forEach(asset => {
      crowns += asset.crown_value
    })
    console.log(`Total value of ${type} assets: ${crowns} crowns`)
  }
}
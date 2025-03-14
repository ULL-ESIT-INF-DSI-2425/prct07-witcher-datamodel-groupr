// Inventary.ts
import { GenericDatabase } from "./bd.js";
import { Asset } from "./assets.js";

export class AssetsDB extends GenericDatabase<Asset> {
  constructor() {
    super('./db/AssetsDB.json')
  }

  filterEntry(asset: Asset): Asset | undefined {
    return this._db.data.data.find((a: Asset) => a.id === asset.id)
  }

  findValues(filter: {
    id?: number;
    name?: string;
    description?: string;
    material?: string;
    weigth?: number;
    crown_value?: number;
   }): Asset[] {
    return this._db.data.data.filter((asset: Asset) => {
      return(
        (filter.id == undefined || asset.id === filter.id) &&
        (filter.name == undefined || asset.name === filter.name) &&
        (filter.description == undefined || asset.description === filter.description) &&
        (filter.material == undefined || asset.material === filter.material) &&
        (filter.crown_value == undefined || asset.crown_value === filter.crown_value) &&
        (filter.weigth == undefined || asset.weigth === filter.weigth)
      );
    });
  }

  deleteEntry(filter: {
    id?: number;
    name?: string;
    description?: string;
    material?: string;
    weigth?: number;
    crown_value?: number;
  }): void {
    const deleteData: Asset[] = this.findValues(filter);
    this._db.data.data.filter((asset: Asset) => {deleteData.find((da: Asset) => da.id === asset.id) == undefined});
  }

  modifyEntry(filter: {
    id: number;
    name?: string;
    description?: string;
    material?: string;
    weigth?: number;
    crown_value?: number;
   }): void {
    this._db.data.data.forEach((asset: Asset) => {
      if (asset.id === filter.id) {
        if (filter.name) asset.name = filter.name;
        if (filter.description) asset.description = filter.description;
        if (filter.material) asset.material = filter.material;
        if (filter.weigth) asset.weigth = filter.weigth;
        if (filter.crown_value) asset.crown_value = filter.crown_value;
      }
    })
  }

  // Falta implementación de control de inventario
}

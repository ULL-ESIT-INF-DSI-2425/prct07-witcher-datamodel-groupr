import { GenericDatabase } from "./genericDatabase.js";
import { Asset, AssetType } from "./assets.js";

/**
 * Database class for managing assets.
 * Extends {@link GenericDatabase} with specific operations for assets.
 */
export class AssetsDB extends GenericDatabase<Asset> {
  /**
   * Initializes the Assets database.
   */
  constructor() {
    super('./db/AssetsDB.json');
  }

  /**
   * Searches for a specific asset in the database.
   * @param asset - The asset to search for.
   * @returns The matching asset if found, otherwise undefined.
   */
  filterEntry(asset: Asset): Asset | undefined {
    return this._db.data.data.find((a: Asset) => a.id === asset.id);
  }

  /**
   * Finds assets that match the given filter criteria.
   * @param filter - The criteria to filter assets.
   * @returns An array of assets matching the criteria.
   */
  findValues(filter: {
    id?: number;
    name?: string;
    description?: string;
    material?: string;
    weigth?: number;
    crown_value?: number;
    type?: AssetType;
  }): Asset[] {
    return this._db.data.data.filter((asset: Asset) => {
      return (
        (filter.id == undefined || asset.id === filter.id) &&
        (filter.name == undefined || asset.name === filter.name) &&
        (filter.description == undefined || asset.description === filter.description) &&
        (filter.material == undefined || asset.material === filter.material) &&
        (filter.crown_value == undefined || asset.crown_value === filter.crown_value) &&
        (filter.weigth == undefined || asset.weigth === filter.weigth) &&
        (filter.type == undefined || asset.type === filter.type)
      );
    });
  }

  /**
   * Deletes assets that match the given filter criteria.
   * @param filter - The criteria for deletion.
   */
  deleteEntry(filter: {
    id?: number;
    name?: string;
    description?: string;
    material?: string;
    weigth?: number;
    crown_value?: number;
    type?: AssetType;
  }): void {
    const deleteData: Asset[] = this.findValues(filter);
    let result: Asset[] = [];
    this._db.data.data.forEach((asset: Asset) => {
      if (deleteData.find((as) => as.id == asset.id) == undefined) {
        result.push(asset);
      }
    });
    this._db.data.data = result;
    this._db.write();
  }

  /**
   * Modifies an existing asset with the specified ID based on the provided criteria.
   * @param id - The unique identifier of the asset to modify.
   * @param filter - The fields to update in the asset.
   */
  modifyEntry(id: number, filter: {
    name?: string;
    description?: string;
    material?: string;
    weigth?: number;
    crown_value?: number;
    type?: AssetType;
  }): void {
    this._db.data.data.forEach((asset: Asset) => {
      if (asset.id === id) {
        if (filter.name) asset.name = filter.name;
        if (filter.description) asset.description = filter.description;
        if (filter.material) asset.material = filter.material;
        if (filter.weigth) asset.weigth = filter.weigth;
        if (filter.crown_value) asset.crown_value = filter.crown_value;
        if (filter.type) asset.type = filter.type;
      }
    });
  }
}

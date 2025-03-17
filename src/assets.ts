/**
 * Enum representing different types of assets.
 */
export enum AssetType {
  /** Represents a product-type asset. */
  PRODUCT = 'product',
  /** Represents an armor-type asset. */
  ARMOR = 'armor',
  /** Represents a weapon-type asset. */
  WEAPON = 'weapon',
  /** Represents a potion-type asset. */
  POTION = 'potion',
  /** Represents a book-type asset. */
  BOOK = 'book',
  /** Represents an unknown asset type. */
  UNKNOWN = 'unknown'
}

/**
 * Interface defining the structure of an asset.
 */
export interface Asset {
  /**
   * Unique identifier for the asset.
   */
  id: number;

  /**
   * Name of the asset.
   */
  name: string;

  /**
   * Description of the asset.
   */
  description: string;

  /**
   * Material from which the asset is made.
   */
  material: string;

  /**
   * Weight of the asset.
   */
  weigth: number;

  /**
   * Monetary value of the asset in crowns.
   */
  crown_value: number;

  /**
   * Type of asset, based on {@link AssetType}.
   */
  type: AssetType;
}

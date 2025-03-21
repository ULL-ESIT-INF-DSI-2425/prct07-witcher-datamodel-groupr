/**
 * Enum representing different types of assets.
 */
export enum AssetType {
  /** Represents a product-type asset. */
  PRODUCT,
  /** Represents an armor-type asset. */
  ARMOR,
  /** Represents a weapon-type asset. */
  WEAPON,
  /** Represents a potion-type asset. */
  POTION,
  /** Represents a book-type asset. */
  BOOK,
  /** Represents an unknown asset type. */
  UNKNOWN
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
  weight: number;

  /**
   * Monetary value of the asset in crowns.
   */
  crown_value: number;

  /**
   * Type of asset, based on {@link AssetType}.
   */
  type: AssetType;
}

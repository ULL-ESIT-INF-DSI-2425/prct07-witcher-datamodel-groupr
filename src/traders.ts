/**
 * Enum representing different types of traders.
 */
export enum TraderTypes {
  /** A blacksmith who forges and sells metal goods. */
  Blacksmith,
  /** An alchemist who sells potions and magical substances. */
  Alchemist,
  /** A general trader who deals in various goods. */
  Generaltrader,
  /** A herbalist who specializes in selling herbs and natural remedies. */
  Herbalist,
  /** An armorer who crafts and sells armor. */
  Armorer
}

/**
 * Interface representing a trader.
 */
export interface Trader {
  /** Unique identifier for the trader. */
  id: number;
  /** Name of the trader. */
  name: string;
  /** Type of trader, based on the {@link TraderTypes} enum. */
  type: TraderTypes;
  /** Location where the trader operates. */
  location: string;
}
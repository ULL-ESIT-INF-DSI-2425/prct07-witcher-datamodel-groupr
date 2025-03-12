// mercaderes.ts

export enum TraderTypes {
  Blacksmith,
  Alchemist,
  GeneralMerchant,
  Herbalist,
  Armorer
}

export interface Trader {
  id: number,
  name: string,
  type: TraderTypes,
  location: string
}

// mercaderes.ts

export enum TraderTypes {
  Blacksmith,
  Alchemist,
  Generaltrader,
  Herbalist,
  Armorer
}

export interface Trader {
  id: number,
  name: string,
  type: TraderTypes,
  location: string
}

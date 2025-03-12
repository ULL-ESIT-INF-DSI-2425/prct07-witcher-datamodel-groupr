// Clients.ts

export enum Race { HUMAN, ELF, DEAMON, WIZARD, WITCH, GOBLIN, GIGANT }

export interface Clients {
  id: number;
  name: string;
  race: Race;
  place: string;
}
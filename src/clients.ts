/**
 * Enum representing different races of clients.
 */
export enum Race { 
  /** A human race. */
  HUMAN, 
  /** An elf race, known for their agility and long lifespan. */
  ELF, 
  /** A daemon race, often associated with dark magic. */
  DEAMON, 
  /** A wizard race, skilled in magical arts. */
  WIZARD, 
  /** A witch race, practitioners of spells and potions. */
  WITCH, 
  /** A goblin race, typically mischievous and cunning. */
  GOBLIN, 
  /** A gigant race, large and strong beings. */
  GIGANT 
}

/**
 * Interface representing a client.
 */
export interface Clients {
  /** Unique identifier for the client. */
  id: number;
  /** Name of the client. */
  name: string;
  /** Race of the client, based on the {@link Race} enum. */
  race: Race;
  /** Location where the client resides. */
  location: string;
}

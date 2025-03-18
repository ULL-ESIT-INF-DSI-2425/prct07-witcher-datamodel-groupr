import { GenericDatabase } from "./genericDatabase.js";
import { Clients, Race } from "./clients.js";

/**
 * Database class for managing clients.
 */
export class ClientsDB extends GenericDatabase<Clients> {
  /**
   * Initializes the ClientsDB instance and sets the database file path.
   */
  constructor() {
    super('./db/ClientsDB.json');
  }

  /**
   * Searches for a specific client in the database by its ID.
   * @param cl - The client to search for.
   * @returns The matching client if found, otherwise undefined.
   */
  filterEntry(cl: Clients): Clients | undefined {
    return this._db.data.data.find((c: Clients) => c.id === cl.id);
  }

  /**
   * Retrieves clients that match the specified filter criteria.
   * @param filter - Object containing optional filter criteria.
   * @returns An array of clients matching the filter.
   */
  findValues(filter: {
    id?: number;
    name?: string;
    race?: Race;
    location?: string;
  }): Clients[] {
    return this._db.data.data.filter((cl: Clients) => {
      return (
        (filter.id == undefined || cl.id === filter.id) &&
        (filter.name == undefined || cl.name === filter.name) &&
        (filter.location == undefined || cl.location === filter.location) &&
        (filter.race == undefined || cl.race === filter.race)
      );
    });
  }

  /**
   * Deletes clients that match the specified filter criteria.
   * @param filter - Object containing optional filter criteria.
   */
  deleteEntry(filter: {
    id?: number;
    name?: string;
    race?: Race;
    location?: string;
  }): void {
    const deleteData: Clients[] = this.findValues(filter);
    let result: Clients[] = [];
    this._db.data.data.forEach((client: Clients) => {
      if (deleteData.find((cl) => cl.id == client.id) == undefined) {
        result.push(client);
      }
    });
    this._db.data.data = result;
    this._db.write();
  }

  /**
   * Modifies an existing client based on the provided filter criteria.
   * @param id - The ID of the client to modify.
   * @param filter - Object containing the fields to update.
   */
  modifyEntry(
    id: number,
    filter: {
      name?: string;
      race?: Race;
      location?: string;
    }
  ): void {
    this._db.data.data.forEach((cl: Clients) => {
      if (cl.id === id) {
        if (filter.name) cl.name = filter.name;
        if (filter.location) cl.location = filter.location;
        if (filter.race) cl.race = filter.race;
      }
    });
    this._db.write();
  }
}
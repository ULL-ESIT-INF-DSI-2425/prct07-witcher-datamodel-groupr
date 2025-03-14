// sClientsDB.ts
import { GenericDatabase } from "./bd.js";
import { Clients, Race } from "./clients.js";

export class ClientsDB extends GenericDatabase<Clients> {
  constructor() {
    super('./db/sClientsDB.json')
  }

  filterEntry(cl: Clients): (Clients) | undefined {
    return this._db.data.data.find((c: Clients) => c.id === cl.id)
  }

  findValues(filter: {
    id?: number;
    name?: string;
    race?: Race;
    location?: string;
   }): ( & Clients)[] {
    return this._db.data.data.filter((cl:  & Clients) => {
      return(
        (filter.id == undefined || cl.id === filter.id) &&
        (filter.name == undefined || cl.name === filter.name) &&
        (filter.location == undefined || cl.location === filter.location) &&
        (filter.race == undefined || cl.race === filter.race)
      )
    });
  }

  deleteEntry(filter: {
    id?: number;
    name?: string;
    race?: Race;
    location?: string;
  }): void {
    const deleteData: ( & Clients)[] = this.findValues(filter);
    this._db.data.data.filter((cl:  & Clients) => {deleteData.find((tc:  & Clients) => tc.id === cl.id) == undefined});
  }

  modifyEntry(filter: {
    id: number;
    name?: string;
    race?: Race;
    location?: string;
   }): void {
    this._db.data.data.forEach((cl:  & Clients) => {
      if (cl.id === filter.id) {
        if (filter.name) cl.name = filter.name;
        if (filter.location) cl.location = filter.location;
        if (filter.race) cl.race = filter.race;
      }
    })
  }
}

// sClientsDB.ts
import { GenericDatabase } from "./bd.js";
import { Clients, Race } from "./clients.js";

export class ClientsDB extends GenericDatabase<Clients> {
  constructor() {
    super('./db/ClientsDB.json')
  }

  filterEntry(cl: Clients): (Clients) | undefined {
    return this._db.data.data.find((c: Clients) => c.id === cl.id)
  }

  findValues(filter: {
    id?: number;
    name?: string;
    race?: Race;
    location?: string;
   }): (Clients)[] {
    return this._db.data.data.filter((cl: Clients) => {
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
    const deleteData: (Clients)[] = this.findValues(filter);
    let result: Clients[] = [];
    this._db.data.data.forEach((client:Clients) => {
      if (deleteData.find((cl) => cl.id == client.id) == undefined) {
        result.push(client);
      }
    })
    this._db.data.data = result;
    this._db.write();
  }

  modifyEntry(id: number, filter: {
    name?: string;
    race?: Race;
    location?: string;
   }): void {
    this._db.data.data.forEach((cl: Clients) => {
      if (cl.id === id) {
        if (filter.name) cl.name = filter.name;
        if (filter.location) cl.location = filter.location;
        if (filter.race) cl.race = filter.race;
      }
    })
    this._db.write()
  }
}

// let clients = new ClientsDB();

// const c1: Clients = {
//   id:1,
//   name:'pedro',
//   race:Race.GOBLIN,
//   location:'lalaguna'
// };

// const c2: Clients = {
//   id:2,
//   name:'antonio',
//   race:Race.ELF,
//   location:'santacruz'
// };
// console.log(clients.getAllEntries())
// clients.addEntry(c1);
// clients.addEntry(c2);
// console.log(clients.getAllEntries())
// clients.deleteEntry({id:1})
// console.log(clients.getAllEntries())
// clients.modifyEntry(2, {name:'juan'})
// console.log(clients.getAllEntries())
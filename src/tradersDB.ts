// tradersClientsDB.ts
import { GenericDatabase } from "./bd.js";
import { Trader, TraderTypes } from "./mercaderes.js";
import { Clients, Race } from "./clients.js";

export class TradersDB extends GenericDatabase<Trader> {
  constructor() {
    super('./db/TradersClientsDB.json')
  }

  filterEntry(tr: Trader): (Trader) | undefined {
    return this._db.data.data.find((t: Trader) => tr.id === t.id)
  }

  findValues(filter: {
    id?: number;
    name?: string;
    type?: TraderTypes;
    location?: string;
   }): (Trader)[] {
    return this._db.data.data.filter((tr: Trader) => {
      return(
        (filter.id == undefined || tr.id === filter.id) &&
        (filter.name == undefined || tr.name === filter.name) &&
        (filter.location == undefined || tr.location === filter.location) &&
        (filter.type == undefined || tr.type === filter.type)
      )
    });
  }

  deleteEntry(filter: {
    id?: number;
    name?: string;
    type?: TraderTypes;
    location?: string;
  }): void {
    const deleteData: (Trader)[] = this.findValues(filter);
    this._db.data.data.filter((tr: Trader) => {deleteData.find((tc: Trader) => tc.id === tr.id) == undefined});
  }

  modifyEntry(filter: {
    id: number;
    name?: string;
    type?: TraderTypes;
    location?: string;
   }): void {
    this._db.data.data.forEach((tr: Trader) => {
      if (tr.id === filter.id) {
        if (filter.name) tr.name = filter.name;
        if (filter.location) tr.location = filter.location;
        if (filter.type) tr.type = filter.type;
      }
    })
  }
}

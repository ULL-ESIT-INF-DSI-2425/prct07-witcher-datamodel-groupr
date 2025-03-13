// Inventary.ts
import { GenericDatabase } from "./bd.js";
import { Trader, TraderTypes } from "./mercaderes.js";
import { Clients, Race } from "./clients.js";

export class TradersClientsDB extends GenericDatabase<Trader & Clients> {
  constructor() {
    super('./db/TradersClientsDB.json')
  }

  filterEntry(tc: Trader & Clients): (Trader & Clients) | undefined {
    return this._db.data.data.find((trcl: Trader & Clients) => tc.id === trcl.id)
  }

  findValues(filter: {
    id?: number;
    name?: string;
    type?: TraderTypes | Race;
    location?: string;
   }): (Trader & Clients)[] {
    return this._db.data.data.filter((tdcl: Trader & Clients) => {
      return(
        (filter.id == undefined || tdcl.id === filter.id) &&
        (filter.name == undefined || tdcl.name === filter.name) &&
        (filter.type == undefined || tdcl.type === filter.type) &&
        (filter.location == undefined || tdcl.location === filter.location)
      );
    });
  }

  deleteEntry(filter: {
    id?: number;
    name?: string;
    type?: TraderTypes | Race;
    location?: string;
  }): void {
    const deleteData: (Trader & Clients)[] = this.findValues(filter);
    this._db.data.data.filter((tdcl: Trader & Clients) => {deleteData.find((tc: Trader & Clients) => tc.id === tdcl.id) == undefined});
  }

  modifyEntry(filter: {
    id: number;
    name?: string;
    type?: TraderTypes | Race;
    location?: string;
   }): void {
    this._db.data.data.forEach((tdcl: Trader & Clients) => {
      if (tdcl.id === filter.id) {
        if (filter.name) tdcl.name = filter.name;
        if (filter.type) tdcl.type = filter.type;
        if (filter.location) tdcl.location = filter.location;
      }
    })
  }

  // Falta corrección por unión de tipos (Linea 50)
}

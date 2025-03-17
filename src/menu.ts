import inquirer from 'inquirer';
import { Asset } from './assets.js';
import { Trader, TraderTypes } from './mercaderes.js';
import {AssetsDB} from "./AssetsDB.js"
import {TradersDB} from "./tradersDB.js"
import {ClientsDB} from './clientsDB.js';
import { Clients, Race } from './clients.js';

export async function addClient (db: ClientsDB) {
  const newClient = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the client',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the client',
    },
    {
      type: 'input',
      name: 'race',
      message: 'Enter the race of the client',
      validate(input: string) {
        switch (input.toUpperCase()) {
          case 'HUMAN':
          case 'ELF':
          case 'DEAMON':
          case 'WIZARD':
          case 'WITCH':
          case 'GOBLIN':
          case 'GIGANT':
        return true;
          default:
        return `Please enter a valid race: HUMAN, ELF, DEAMON, WIZARD, WITCH, GOBLIN, GIGANT.`;
        }
      }
    },
    {
      type: 'input',
      name: 'location',
      message: 'Enter the location of the client',
    }
  ])

  const client: Clients = {
    name: newClient.name,
    id: newClient.id,
    location: newClient.location,
    race: Race[newClient.race.toUpperCase() as keyof typeof Race]
  }

  db.addEntry(client);
}

export async function addAsset(db: AssetsDB) {
  const newAsset = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the asset',
      validate(input:string){
        if (!input || isNaN(Number(input))) {
          return 'Please enter a valid number for the ID.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name:'name',
      message: 'Enter the name of the asset'
    },
    {
      type: 'input',
      name:'description',
      message: 'Enter description of the asset'
    },
    {
      type: 'input',
      name:'material',
      message:'Enter the material of the asset'
    },
    {
      type: 'input',
      name: 'type',
      message: 'Enter the type of asset',
      validate(input: string) {
        switch(input.toUpperCase()) {
          case 'PRODUCT':
            return true
          case 'ARMOR':
            return true
          case 'WEAPON':
            return true
          case 'POTION':
            return true
          case 'BOOK':
            return true
          default:
            return 'Introduce a correct type of asset'
        }
      }
    },
    {
      type:'input',
      name:'weight',
      message: 'Enter the weight of the asset',
      validate(input: string) {
        if (!input || isNaN(Number(input))) {
          return 'Please enter a valid number for the weight.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name:'crown_value',
      message:'Enter the crown value of the asset',
      validate(input: string) {
        if (!input || isNaN(Number(input))) {
          return 'Please enter a valid number for the weight.';
        }
        return true;
      }
    }
  ])

  const asset: Asset = {
    id: Number(newAsset.id),
    name: newAsset.name,
    description: newAsset.description,
    material: newAsset.material,
    weigth: newAsset.weight,
    crown_value : newAsset.crown_value,
    type: newAsset.type
  }

  //Añadir bien a la db
  db.addEntry(asset)
}

export async function addTrader(db: TradersDB) {
  const newtrader = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the Trader',
      validate(input:string){
        if (!input || isNaN(Number(input))) {
          return 'Please enter a valid number for the ID.';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the trader'
    },
    {
      type:'input',
      name:'location',
      message: 'Enter the location of the trader'
    },
    {
      type:'input',
      name: 'type',
      message:'Enter the type of the trader',
      validate(input: string) {
        switch (input) {
          case 'Blacksmith':
          case 'Alchemist':
          case 'Generaltrader':
          case 'Herbalist':
          case 'Armorer':
            return true;
          default:
            return `Please enter a valid type: Blacksmith, Alchemist, Generaltrader, Herbalist, Armorer.`;
        }
      }
    }

  ])

  // Añadir mercader
  const trader: Trader = {
    type: TraderTypes[newtrader.type as keyof typeof TraderTypes],
    location: newtrader.location,
    name: newtrader.name,
    id: newtrader.id
  }

  db.addEntry(trader)
}


export async function listGoods(db: AssetsDB) {
  const assets: Asset[] = db.getAllEntries();

  if (assets.length === 0) {
    console.log("\n🔴 No assets registered in the inventory.\n");
    return;
  }

  console.log("\n===========================================");
  console.log("🏹  ASSET LIST - WHITE WOLF INN INVENTORY  🏹");
  console.log("===========================================\n");

  assets.forEach(asset => {
    console.log(`🔹 *${asset.name}* (ID: ${asset.id})`);
    console.log(`   📜 Description: ${asset.description}`);
    console.log(`   ⚖️  Weight: ${asset.weigth} kg | 💰 Value: ${asset.crown_value} crowns`);
    console.log(`   🛠️  Material: ${asset.material}`);
    let assetType: string;
    switch (asset.type.toUpperCase()) {
      case 'PRODUCT':
      assetType = 'Product';
      break;
      case 'ARMOR':
      assetType = 'Armor';
      break;
      case 'WEAPON':
      assetType = 'Weapon';
      break;
      case 'POTION':
      assetType = 'Potion';
      break;
      case 'BOOK':
      assetType = 'Book';
      break;
      default:
      assetType = 'Unknown';
    }
    console.log(`   🗡️  Type: ${assetType}`);
    console.log("-------------------------------------------");
  });

  console.log("\n🏹 End of the list.\n");
}

export async function listTraders(db: TradersDB) {
  const traders: Trader[] = db.getAllEntries();

  if (traders.length === 0) {
    console.log("\n🔴 No Traders registered in the inventory.\n");
    return;
  }

  console.log("\n===========================================");
  console.log("🏹  TRADER LIST - WHITE WOLF INN INVENTORY  🏹");
  console.log("===========================================\n");

  traders.forEach(trader => {
    let traderType: string;
    switch (trader.type) {
      case TraderTypes.Blacksmith:
        traderType = 'Blacksmith';
        break;
      case TraderTypes.Alchemist:
        traderType = 'Alchemist';
        break;
      case TraderTypes.Generaltrader:
        traderType = 'Generaltrader';
        break;
      case TraderTypes.Herbalist:
        traderType = 'Herbalist';
        break;
      case TraderTypes.Armorer:
        traderType = 'Armorer';
        break;
      default:
        traderType = 'Unknown';
    }

    console.log(`🔹 *${trader.name}* (ID: ${trader.id})`);
    console.log(`🛠️  Trader work: ${traderType}`);
    console.log(`📌 Location: ${trader.location}`);
    console.log("")
  });
  console.log("\n🏹 End of the list.\n");
}

export async function listClients(db: ClientsDB) {
  const clients: Clients[] = db.getAllEntries();

  if (clients.length === 0) {
    console.log("\n🔴 No clients registered in the inventory.\n");
    return;
  }

  console.log("\n===========================================");
  console.log("🏹  CLIENT LIST - WHITE WOLF INN INVENTORY  🏹");
  console.log("===========================================\n");

  clients.forEach(client => {
    let raceName: string;
    switch (client.race) {
      case Race.HUMAN:
        raceName = 'HUMAN';
        break;
      case Race.ELF:
        raceName = 'ELF';
        break;
      case Race.DEAMON:
        raceName = 'DEAMON';
        break;
      case Race.WIZARD:
        raceName = 'WIZARD';
        break;
      case Race.WITCH:
        raceName = 'WITCH';
        break;
      case Race.GOBLIN:
        raceName = 'GOBLIN';
        break;
      case Race.GIGANT:
        raceName = 'GIGANT';
        break;
      default:
        raceName = 'UNKNOWN';
    }

    console.log(`🔹 *${client.name}* (ID: ${client.id})`);
    console.log(`🧝 Race: ${raceName} 🧙`);
    console.log(`📌 Location: ${client.location}`);
    console.log("")
  });
  console.log("\n🏹 End of the list.\n");
}

export async function mainMenu(assetsDB: AssetsDB, tradersDB: TradersDB, clientsDB: ClientsDB) {
  const options = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'Add a good',
        'List goods',
        'Add a trader',
        'Add a client',
        'List clients',
        'List traders',
        'Exit'
      ]
    }
  ]);

  switch (options.action) {
    case 'Add a good':
      await addAsset(assetsDB);
      break;
    case 'List goods':
      await listGoods(assetsDB);
      break;
    case 'Add a trader':
      await addTrader(tradersDB);
      break;
    case 'List traders':
      await listTraders(tradersDB);
      break;
    case 'Add a client':
      await addClient(clientsDB);
      break;
    case 'List clients':
      listClients(clientsDB);
      break;
    case 'Exit':
      console.log('Exiting...');
      return;
  }
  await mainMenu(assetsDB, tradersDB, clientsDB);
}

// Simulated databases in memory
const assetsDB = new AssetsDB();
const tradersDB = new TradersDB();
const clientsDB = new ClientsDB();

// Start the menu
mainMenu(assetsDB, tradersDB, clientsDB);


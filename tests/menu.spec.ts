import { describe, it, expect, vi, beforeEach } from 'vitest';
import inquirer from 'inquirer';
import { 
  addTransaction, addClient, addAsset, addTrader, 
  listGoods, listTraders, listClients, 
  deleteGoods, deleteTraders, deleteClients 
} from '../src/menu.js';
import { Inventary } from '../src/inventary.js';
import { AssetsDB } from '../src/AssetsDB.js';
import { TradersDB } from '../src/tradersDB.js';
import { ClientsDB } from '../src/clientsDB.js';

// Mock de inquirer
vi.mock('inquirer');

describe('Inventory Management Functions', () => {
  let assetsDB: AssetsDB;
  let tradersDB: TradersDB;
  let clientsDB: ClientsDB;
  let inventary: Inventary;

  beforeEach(() => {
    assetsDB = new AssetsDB();
    tradersDB = new TradersDB();
    clientsDB = new ClientsDB();
    inventary = new Inventary();

    // Mock de métodos
    vi.spyOn(assetsDB, 'addEntry').mockImplementation(() => {});
    vi.spyOn(tradersDB, 'addEntry').mockImplementation(() => {});
    vi.spyOn(clientsDB, 'addEntry').mockImplementation(() => {});
    vi.spyOn(inventary, 'registerTransaction').mockImplementation(() => {});

    // Limpieza de la base de datos antes de cada test
    vi.spyOn(assetsDB, 'getAllEntries').mockImplementation(() => []);
    vi.spyOn(tradersDB, 'getAllEntries').mockImplementation(() => []);
    vi.spyOn(clientsDB, 'getAllEntries').mockImplementation(() => []);

    vi.spyOn(assetsDB, 'deleteEntry').mockImplementation(() => {});
    vi.spyOn(tradersDB, 'deleteEntry').mockImplementation(() => {});
    vi.spyOn(clientsDB, 'deleteEntry').mockImplementation(() => {});
  });

  it('should add a transaction', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '1',
      date: '2024-03-19',
      clientID: '2',
      productID: '3',
      productName: 'Sword',
      buying: true,
      involver_crowns: '100'
    });

    await addTransaction(inventary);
    expect(inventary.registerTransaction).toHaveBeenCalled();
  });

  it('should add a client', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ id: '1', name: 'John', race: 'HUMAN', location: 'Town' });

    await addClient(clientsDB);
    expect(clientsDB.addEntry).toHaveBeenCalled();
  });

  it('should add an asset', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '2', // Cambiado para evitar conflicto con otro test
      name: 'Iron Sword',
      description: 'A sharp sword',
      material: 'Iron',
      type: 'WEAPON',
      weight: '3',
      crown_value: '200'
    });

    await addAsset(assetsDB);
    expect(assetsDB.addEntry).toHaveBeenCalled();
  });

  it('should add a trader', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ id: '1', name: 'Smith', type: 'Blacksmith', location: 'Forge' });

    await addTrader(tradersDB);
    expect(tradersDB.addEntry).toHaveBeenCalled();
  });

  it('should list assets', async () => {
    vi.mocked(assetsDB.getAllEntries).mockReturnValue([
      { id: '1', name: 'Iron Sword', description: 'A sword', weight: 3, crown_value: 200, material: 'Iron', type: 'WEAPON' }
    ]);

    await listGoods(assetsDB);
    expect(assetsDB.getAllEntries).toHaveBeenCalled();
  });

  it('should list traders', async () => {
    vi.mocked(tradersDB.getAllEntries).mockReturnValue([
      { id: '1', name: 'Smith', type: 'Blacksmith', location: 'Forge' }
    ]);

    await listTraders(tradersDB);
    expect(tradersDB.getAllEntries).toHaveBeenCalled();
  });

  it('should list clients', async () => {
    vi.mocked(clientsDB.getAllEntries).mockReturnValue([
      { id: '1', name: 'John', race: 'HUMAN', location: 'Town' }
    ]);

    await listClients(clientsDB);
    expect(clientsDB.getAllEntries).toHaveBeenCalled();
  });

  it('should delete an asset', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ id: '1' });

    await deleteGoods(assetsDB);
    expect(assetsDB.deleteEntry).toHaveBeenCalled();
  });

  it('should delete a trader', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ id: '1' });

    await deleteTraders(tradersDB);
    expect(tradersDB.deleteEntry).toHaveBeenCalled();
  });

  it('should delete a client', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({ id: '1' });

    await deleteClients(clientsDB);
    expect(clientsDB.deleteEntry).toHaveBeenCalled();
  });
});

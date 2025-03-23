import { describe, it, expect, vi, beforeEach } from 'vitest';
import inquirer from 'inquirer';
import { 
  addTransaction, addClient, addAsset, addTrader, 
  listGoods, listTraders, listClients, 
  deleteGoods, deleteTraders, deleteClients, modifyClients, modifyGoods,modifyTraders
} from '../src/menu.js';
import { Inventary } from '../src/inventary.js';
import { AssetsDB } from '../src/AssetsDB.js';
import { TradersDB } from '../src/tradersDB.js';
import { ClientsDB } from '../src/clientsDB.js';

import { AssetType,Asset } from '../src/assets.js';
import { Clients, Race } from '../src/clients.js';
import { Trader,TraderTypes } from '../src/traders.js';

const assetsDB: AssetsDB = new AssetsDB()
const tradersDB: TradersDB = new TradersDB()
const clientsDB: ClientsDB = new ClientsDB()
const inventary: Inventary = new Inventary()

// Datos predefinidos con ambientación medieval y fantástica
const assets: Asset[] = [
  { id: 1, name: 'Espada de Fuego Eterno', description: 'Forjada en los volcanes de Kraz-Thun, arde sin consumir metal.', material: 'Mithril', weight: 5, crown_value: 500, type: AssetType.WEAPON },
  { id: 2, name: 'Arco del Bosque Eterno', description: 'Bendecido por los elfos de Lórindar, nunca falla un disparo.', material: 'Madera Élfica', weight: 2, crown_value: 600, type: AssetType.WEAPON },
  { id: 3, name: 'Escudo de la Guardia Real', description: 'Resistente a la magia oscura y capaz de desviar rayos.', material: 'Acero Rúnico', weight: 8, crown_value: 750, type: AssetType.ARMOR },
  { id: 4, name: 'Daga de la Sombra Nocturna', description: 'Absorbe la luz y permite moverse sin ser visto.', material: 'Ónix Oscuro', weight: 1, crown_value: 450, type: AssetType.WEAPON },
  { id: 5, name: 'Martillo de los Titanes', description: 'Creado por los herreros enanos, capaz de derribar murallas.', material: 'Adamantita', weight: 12, crown_value: 900, type: AssetType.WEAPON },
  { id: 6, name: 'Cetro del Archimago', description: 'Contiene un fragmento del maná puro del Reino Celestial.', material: 'Cristal Arcano', weight: 3, crown_value: 1100, type: AssetType.POTION },
  { id: 7, name: 'Armadura de Dragón Rojo', description: 'Hecha con escamas de dragón, inmune al fuego.', material: 'Escamas de Dragón', weight: 15, crown_value: 1500, type: AssetType.ARMOR },
  { id: 8, name: 'Capa de las Sombras', description: 'Permite desaparecer entre las tinieblas.', material: 'Tela Encantada', weight: 1, crown_value: 400, type: AssetType.PRODUCT },
  { id: 9, name: 'Botas del Viento', description: 'Aumentan la velocidad del portador.', material: 'Cuero Ligero', weight: 2, crown_value: 550, type: AssetType.PRODUCT },
  { id: 10, name: 'Lanza de Hielo Eterno', description: 'Forjada con escarcha de los dioses nórdicos.', material: 'Cristal de Hielo', weight: 6, crown_value: 800, type: AssetType.WEAPON },
  { id: 11, name: 'Anillo del Nigromante', description: 'Permite controlar a los muertos.', material: 'Ónix Maldito', weight: 0.5, crown_value: 1200, type: AssetType.POTION },
  { id: 12, name: 'Amuleto de la Luna Plateada', description: 'Brilla con la luz de la luna y repele criaturas oscuras.', material: 'Plata Lunar', weight: 0.3, crown_value: 900, type: AssetType.POTION },
  { id: 13, name: 'Hacha de Guerra del Rey Bárbaro', description: 'Un arma legendaria que sólo los más fuertes pueden blandir.', material: 'Hierro Sangriento', weight: 10, crown_value: 1300, type: AssetType.WEAPON },
  { id: 14, name: 'Báculo de los Ancestros', description: 'Lleva la sabiduría de los hechiceros antiguos.', material: 'Madera Sagrada', weight: 4, crown_value: 1000, type: AssetType.BOOK },
  { id: 15, name: 'Casco de la Luz Divina', description: 'Protege al usuario de la magia negra.', material: 'Oro Bendito', weight: 5, crown_value: 950, type: AssetType.ARMOR },
  { id: 16, name: 'Cinturón del Gigante', description: 'Otorga una fuerza sobrehumana.', material: 'Cuero de Bestia Mítica', weight: 2, crown_value: 850, type: AssetType.PRODUCT },
  { id: 17, name: 'Ballesta del Cazador de Bestias', description: 'Especialmente diseñada para cazar monstruos gigantes.', material: 'Madera Encantada', weight: 7, crown_value: 1200, type: AssetType.WEAPON },
  { id: 18, name: 'Brújula de los Mundos Perdidos', description: 'Apunta siempre hacia la mayor riqueza cercana.', material: 'Oro Místico', weight: 0.5, crown_value: 700, type: AssetType.PRODUCT },
  { id: 19, name: 'Pergamino de los Mil Hechizos', description: 'Contiene conjuros desconocidos.', material: 'Papel Encantado', weight: 0.2, crown_value: 1300, type: AssetType.BOOK },
  { id: 20, name: 'Cáliz del Rey Demonio', description: 'Otorga poderes oscuros a quien beba de él.', material: 'Cristal Maldito', weight: 1, crown_value: 2000, type: AssetType.POTION }
];


const clients: Clients[] = [
  { id: 1, name: 'Sir Cedric', race: Race.HUMAN, location: 'Castillo de Valeria' },
  { id: 2, name: 'Elandor el Sabio', race: Race.ELF, location: 'Bosque de Lórindar' },
  { id: 3, name: 'Throg el Destructor', race: Race.GIGANT, location: 'Montañas Grises' },
  { id: 4, name: 'Morgana la Hechicera', race: Race.HUMAN, location: 'Torre de los Secretos' },
  { id: 5, name: 'Ulric Martillo de Hierro', race: Race.GOBLIN, location: 'Ciudad Subterránea de Khaz-Dur' },
  { id: 6, name: 'Selene la Exploradora', race: Race.HUMAN, location: 'Llanuras del Alba' },
  { id: 7, name: 'Galdor el Encantador', race: Race.ELF, location: 'Academia Arcana' },
  { id: 8, name: 'Bjorn el Berserker', race: Race.HUMAN, location: 'Tierras del Norte' },
  { id: 9, name: 'Zarak el Mercenario', race: Race.GOBLIN, location: 'Puerto de Sangreluz' },
  { id: 10, name: 'Velia la Bailarina de Sombras', race: Race.HUMAN, location: 'Bajo Mundo de Eldoria' },
];



// Datos de los traders corregidos:
const traders: Trader[] = [
  { id: 1, name: 'Baldric el Comerciante', type: TraderTypes.Blacksmith, location: 'Mercado de Eldoria' },
  { id: 2, name: 'Ygritte la Forjadora', type: TraderTypes.Armorer, location: 'Fortaleza de Karak' },
  { id: 3, name: 'Tobias el Astuto', type: TraderTypes.Generaltrader, location: 'Puerto de Brisaveloz' },
  { id: 4, name: 'Gretchen la Vidente', type: TraderTypes.Alchemist, location: 'Bosque de los Susurros' },
  { id: 5, name: 'Dorn el Errante', type: TraderTypes.Generaltrader, location: 'Caravana Nómada' },
  { id: 6, name: 'Alaric el Viejo', type: TraderTypes.Generaltrader, location: 'Gran Biblioteca Arcana' },
];
// Reseteo de la base de datos y carga de datos iniciales

assetsDB.resetDB();
tradersDB.resetDB();
clientsDB.resetDB();

assets.forEach(asset => assetsDB.addEntry(asset));
clients.forEach(client => clientsDB.addEntry(client));
traders.forEach(trader => tradersDB.addEntry(trader));

vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn()
      .mockResolvedValueOnce({ action: 'List goods' })  
      .mockResolvedValueOnce({ action: 'Exit' })        
  }
}));

describe('Inventory Management Functions', () => {

  it('', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
  });
  beforeEach(() => {

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

        // Mock de métodos adicionales
    vi.spyOn(assetsDB, 'modifyEntry').mockImplementation(() => {});
    vi.spyOn(tradersDB, 'modifyEntry').mockImplementation(() => {});
    vi.spyOn(clientsDB, 'modifyEntry').mockImplementation(() => {});
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
    vi.mocked(inquirer.prompt).mockResolvedValue({ id: '21', name: 'John', race: 'HUMAN', location: 'Town' });

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
      { id: 1, name: 'Espada de Fuego Eterno', description: 'Forjada en los volcanes de Kraz-Thun, arde sin consumir metal.', material: 'Mithril', weight: 5, crown_value: 500, type: AssetType.WEAPON }
    ]);

    await listGoods(assetsDB);
    expect(assetsDB.getAllEntries).toHaveBeenCalled();
  });

  it('should list traders', async () => {
    vi.mocked(tradersDB.getAllEntries).mockReturnValue([
      { id: 1, name: 'Smith', type: TraderTypes.Blacksmith, location: 'Forge' }
    ]);

    await listTraders(tradersDB);
    expect(tradersDB.getAllEntries).toHaveBeenCalled();
  });

  it('should list clients', async () => {
    vi.mocked(clientsDB.getAllEntries).mockReturnValue([
      { id: 1, name: 'Sir Cedric', race: Race.HUMAN, location: 'Castillo de Valeria' }
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

  it('should delete an asset with specific filters', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '1',
      name: '',
      description: '',
      material: '',
      type: '',
      weight: '',
      crown_value: ''
    });

    await deleteGoods(assetsDB);
    expect(assetsDB.deleteEntry).toHaveBeenCalledWith({
      id: 1,
      name: undefined,
      description: undefined,
      material: undefined,
      type: undefined,
      weight: undefined,
      crown_value: undefined
    });
  });

  it('should modify an asset', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '1',
      name: 'Espada de Fuego Eterno Modificada',
      description: 'Forjada en los volcanes de Kraz-Thun, ahora con un brillo más intenso.',
      material: 'Acero Mágico',
      type: AssetType.WEAPON, 
      weight: '6',
      crown_value: '600'
    });

    vi.spyOn(assetsDB, 'modifyEntry').mockImplementation(() => {});
    await modifyGoods(assetsDB);
    expect(assetsDB.modifyEntry).toHaveBeenCalledWith(1, {
      name: 'Espada de Fuego Eterno Modificada',
      description: 'Forjada en los volcanes de Kraz-Thun, ahora con un brillo más intenso.',
      material: 'Acero Mágico',
      type: AssetType.WEAPON, // Use the enum value here
      weight: 6,
      crown_value: 600
    });
  });

  it('should modify a trader', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '1',
      name: '',
      type: '',
      location: 'Modified Forge'
    });

    vi.spyOn(tradersDB, 'modifyEntry').mockImplementation(() => {});
    await modifyTraders(tradersDB);
    expect(tradersDB.modifyEntry).toHaveBeenCalledWith(1, {
      name: undefined,
      type: undefined,
      location: 'Modified Forge'
    });
  });

  it('should modify a client', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '1',
      name: 'Modified Client',
      race: 'HUMAN',
      location: 'Modified Town'
    });

    vi.spyOn(clientsDB, 'modifyEntry').mockImplementation(() => {});
    await modifyClients(clientsDB);
    expect(clientsDB.modifyEntry).toHaveBeenCalledWith(1, {
      name: 'Modified Client',
      race: 'HUMAN',
      location: 'Modified Town'
    });
  });

  it('should handle empty fields when modifying an asset', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '1',
      name: '',
      description: '',
      material: '',
      type: '',
      weight: '',
      crown_value: ''
    });

    vi.spyOn(assetsDB, 'modifyEntry').mockImplementation(() => {});
    await modifyGoods(assetsDB);
    expect(assetsDB.modifyEntry).toHaveBeenCalledWith(1, {
      name: undefined,
      description: undefined,
      material: undefined,
      type: undefined,
      weight: undefined,
      crown_value: undefined
    });
  });

  it('should handle empty fields when modifying a trader', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '1',
      name: '',
      type: '',
      location: ''
    });

    vi.spyOn(tradersDB, 'modifyEntry').mockImplementation(() => {});
    await modifyTraders(tradersDB);
    expect(tradersDB.modifyEntry).toHaveBeenCalledWith(1, {
      name: undefined,
      type: undefined,
      location: undefined
    });
  });

  it('should handle empty fields when modifying a client', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValue({
      id: '1',
      name: '',
      race: '',
      location: ''
    });

    vi.spyOn(clientsDB, 'modifyEntry').mockImplementation(() => {});
    await modifyClients(clientsDB);
    expect(clientsDB.modifyEntry).toHaveBeenCalledWith(1, {
      name: undefined,
      race: undefined,
      location: undefined
    });
  });
  

});

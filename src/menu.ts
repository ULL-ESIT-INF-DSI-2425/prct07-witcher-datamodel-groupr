import inquirer from 'inquirer';
import { Asset } from './assets.js';

async function addAsset() {
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
    crown_value : newAsset.crown_value
  }

  //Añadir bien a la db
  console.log(asset)
}

async function mainMenu() {
  const options = await inquirer.prompt([
    {
      type: 'list', // Se usa list para tener un menu de opciones
      name: 'action', // se usa para guardar el nombre de la accion que hacemos
      message: 'What do you want to do?', // Despues de esto se mostrará el menú de opciones
      choices: [
        'Add a good',
        'List goods',
        'Add a merchant',
        'Add a client',
        'List clients',
        'Exit'
      ]
    }
  ])
  // El screen es para que no de error, cuando esten los metodo se quita
  switch (options.action) {
    case 'Add a good':
      await addAsset();
      break;
    case 'List goods':
      await screen //listGoods();
      break;
    case 'Add a merchant':
      await screen //addMerchant();
      break;
    case 'List merchants':
      await screen//listMerchants();
      break;
    case 'Add a client':
      await screen //addClient();
      break;
    case 'List clients':
      await screen //listClients();
      break;
    case 'Exit':
      console.log('Exiting...');
      return;
  }
  await mainMenu()
}

mainMenu()


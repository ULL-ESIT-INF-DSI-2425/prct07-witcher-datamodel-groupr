import inquirer from 'inquirer';

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
      await screen//addGood();
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
}
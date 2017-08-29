const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () =>  app.quit()); //Listener, quits the entire app if the mainWindow is terminated

  const mainMenu = Menu.buildFromTemplate(menuTemplate); //Ready the menu collection
  Menu.setApplicationMenu(mainMenu); //Fire up the custom defined menu
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    //Numbers correspond to pixel values
    width: 300,
    height: 200,
    title: 'Add New Todo'
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

ipcMain.on('todo:add', (event, todo) => {
  mainWindow.webContents.send('todo:add', todo);
});

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        click() { createAddWindow(); }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        // accelerator: (() => {
        //   if (process.platform === 'darwin'){
        //     return 'Command+Q';
        //   } else {
        //     return 'Ctrl+Q';
        //   }
        // })(),
        click() {
          app.quit();
        }
      }
    ]
  }
];

//Checks if native OS is OSX
if(process.platform === 'darwin'){
  menuTemplate.unshift({});
}

//Checks if the application is running in production, else enable developer console
if(process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label: 'Developer Menu',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  })
}

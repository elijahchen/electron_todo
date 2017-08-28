const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);

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

if(process.platform === 'darwin'){
  menuTemplate.unshift({});
}

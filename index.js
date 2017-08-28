const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate); //Ready the menu collection
  Menu.setApplicationMenu(mainMenu); //Fire up the custom defined menu
});

const menuTemplate = [
  {
    label: 'File'
  }
];

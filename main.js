// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	autoUpdater.checkForUpdatesAndNotify();


	mainWindow = new BrowserWindow({
		width: 300,
		height: 500,
	

		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true

		}
	});
	mainWindow.minimizable = false
	mainWindow.maximizable = false
	// // and load the index.html of the app.
	mainWindow.loadFile('./src/index.html');
	mainWindow.resizable = false
	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
	mainWindow.setAlwaysOnTop(true, 'floating');
	mainWindow.setVisibleOnAllWorkspaces(true);
	mainWindow.setFullScreenable(false);
	mainWindow.setMenuBarVisibility(false);

	
}

ipcMain.on('Void',()=>{
	let voidWindow;

	voidWindow = new BrowserWindow();
	voidWindow.loadFile('./src/void.html');
})
ipcMain.on('Sales',()=>{
	let voidWindow;

	voidWindow = new BrowserWindow();
	voidWindow.loadFile('./src/sales.html');
})

ipcMain.on('SalesD',()=>{
	let voidWindow;

	voidWindow = new BrowserWindow();
	voidWindow.loadFile('./src/salesD.html');
})
ipcMain.on('SalesDWB',()=>{
	let voidWindow;

	voidWindow = new BrowserWindow();
	voidWindow.loadFile('./src/salesDWB.html');
})
ipcMain.on('SalesWB',()=>{
	let voidWindow;

	voidWindow = new BrowserWindow();
	voidWindow.loadFile('./src/salesWB.html');
})
ipcMain.on('VoidWB',()=>{
	let voidWindow;

	voidWindow = new BrowserWindow();
	voidWindow.loadFile('./src/voidWB.html');
})
ipcMain.on('restart_app', () => {
	autoUpdater.quitAndInstall();
  });
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
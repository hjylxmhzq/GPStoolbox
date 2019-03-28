// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const {
  readCSV,
  writeCSV
} = require('./csv.js')
const http = require('http');

let JS_KEY = 'r8hqpHiu8z8O7Cgo9mGveNLuNEqKZOpM';
let MAP_KEY = 'xk8RWRGCjaSQGLu7UmxvfmL9X3fhG7Bm';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    webPreferences: {
      //nodeIntegration: true,
      webSecurity: false
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  ipcMain.on('searchData', function (event, data) {
    getPosition(data, event);
  })

  ipcMain.on('openFile', function (event, filePath) {
    if (Array.isArray(filePath) && filePath.length > 0) {
      const data = readCSV(filePath[0]);
      event.sender.send('returncsvdata', data);
    }
  })

  ipcMain.on('setkey', function (event, data) {
    JS_KEY = data;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function getPosition(address, event) {
  console.log(JS_KEY)
  let query = encodeURIComponent(address);
  let url = `http://api.map.baidu.com/geocoder/v2/?address=${query}&output=json&ak=${JS_KEY}`;
  http.get(url, function (res) {
    let html = '';
    res.on('data', function (data) {
      html += data;
    })
    res.on('end', function () {
      event.sender.send('returnData', JSON.parse(html));
    })
  })
}

function setKey(key) {
  JS_KEY = key;
}
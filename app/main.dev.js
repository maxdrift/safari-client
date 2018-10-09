/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, screen } from 'electron';
import tempy from 'tempy';
import path from 'path';
import fs from 'fs';
import unhandled from 'electron-unhandled';
import ga from './analytics';
import MenuBuilder from './menu';
import { appTmpFolder, appName } from './constants';

global.ga = ga;

unhandled({
  logger: err => {
    ga.exception(err.toString(), true).send();
    console.error('Unhandled error:', err);
  }
});

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  app.quit();
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  if (process.env.NODE_ENV === 'production') {
    require('update-electron-app')({
      logger: require('electron-log')
    });
  }

  let tmpDir = '';
  if (process.env.NODE_ENV === 'production') {
    tmpDir = appTmpFolder;
  } else {
    tmpDir = `${appTmpFolder}.dev`;
  }
  const tmpPath = path.join(tempy.root, tmpDir);
  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath);
  } else {
    console.log(`Temp directory ${tmpPath} already exists. Skipping...`);
  }

  const { width, height } = screen.getPrimaryDisplay().size;
  ga.set('screenResolution', `${width}x${height}`);
  ga.set('appName', appName);
  ga.set(
    'appVersion',
    process.env.NODE_ENV === 'production' ? app.getVersion() : 'dev'
  );
  ga.set('language', app.getLocale);
  ga.screenview('Home').send();

  mainWindow = new BrowserWindow({
    nodeIntegration: false,
    show: false,
    width: 1024,
    height: 728,
    minWidth: 690,
    minHeight: 527,
    title: `Safari Client ${app.getVersion()}`
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

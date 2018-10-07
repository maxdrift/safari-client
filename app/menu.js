// @flow
import { app, Menu, shell, BrowserWindow } from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'Safari Client',
      submenu: [
        {
          label: `Info su Safari Client ${app.getVersion()}`,
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        { label: 'Servizi', submenu: [] },
        { type: 'separator' },
        {
          label: 'Nascondi Safari Client',
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: 'Nascondi Altri',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        {
          label: 'Mostra tutto',
          selector: 'unhideAllApplications:'
        },
        { type: 'separator' },
        {
          label: 'Chiudi',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuEdit = {
      label: 'Modifica',
      submenu: [
        { label: 'Annulla', accelerator: 'Command+Z', selector: 'undo:' },
        {
          label: 'Ripristina',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:'
        },
        { type: 'separator' },
        {
          label: 'Seleziona tutto',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    };
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: 'Vista',
      submenu: [
        {
          label: 'Ricarica',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: 'Attiva/Disattiva Schermo intero',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
      ]
    };
    const subMenuWindow = {
      label: 'Finestra',
      submenu: [
        {
          label: 'Minimizza',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        { type: 'separator' },
        { label: 'Porta tutto in primo piano', selector: 'arrangeInFront:' }
      ]
    };
    const subMenuHelp = {
      label: 'Aiuto',
      submenu: [
        {
          label: 'Più informazioni',
          click() {
            shell.openExternal('https://github.com/maxdrift/safari-client');
          }
        }
        // {
        //   label: 'Documentation',
        //   click() {
        //     shell.openExternal(
        //       'https://github.com/atom/electron/tree/master/docs#readme'
        //     );
        //   }
        // },
        // {
        //   label: 'Community Discussions',
        //   click() {
        //     shell.openExternal('https://discuss.atom.io/c/electron');
        //   }
        // },
        // {
        //   label: 'Search Issues',
        //   click() {
        //     shell.openExternal('https://github.com/atom/electron/issues');
        //   }
        // }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Apri',
            accelerator: 'Ctrl+O'
          },
          {
            label: '&Chiudi',
            accelerator: 'Alt+F4',
            click: () => {
              app.quit();
            }
          }
        ]
      },
      {
        label: '&Vista',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  }
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: '&Ricarica',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  }
                },
                {
                  label: 'Attiva/Disattiva Schermo intero',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.toggleDevTools();
                  }
                }
              ]
      },
      {
        label: 'Aiuto',
        submenu: [
          {
            label: 'Più informazioni',
            click() {
              shell.openExternal('https://github.com/maxdrift/safari-client');
            }
          }
          // {
          //   label: 'Documentation',
          //   click() {
          //     shell.openExternal(
          //       'https://github.com/atom/electron/tree/master/docs#readme'
          //     );
          //   }
          // },
          // {
          //   label: 'Community Discussions',
          //   click() {
          //     shell.openExternal('https://discuss.atom.io/c/electron');
          //   }
          // },
          // {
          //   label: 'Search Issues',
          //   click() {
          //     shell.openExternal('https://github.com/atom/electron/issues');
          //   }
          // }
        ]
      }
    ];

    return templateDefault;
  }
}

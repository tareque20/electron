    const {app, Tray, Menu, BrowserWindow} = require('electron');
    const url = require('url')
    const path = require('path')

    let win
    const iconPath = path.join('', 'icon.png');
    let appIcon = null;

    function createWindow() {
        win = new BrowserWindow({show: false, frame: true});
        appIcon = new Tray(iconPath);
          
        var contextMenu = Menu.buildFromTemplate([
        {
          label: 'Item1',
          type: 'radio',
          icon: iconPath
        },
        {
          label: 'Item2',
          submenu: [
            { label: 'submenu1' },
            { label: 'submenu2' }
          ]
        },
        {
          label: 'Item3',
          type: 'radio',
          checked: true
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: function() {
             win.loadURL(url.format ({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file:',
              slashes: true
            }))
            win.show();
            //win.toggleDevTools();
            win.on('close', (event) => {
                if (app.quitting) {
                  win = null
                } else {
                  event.preventDefault()
                  win.hide()
                }
            })
          }
        },
        { label: 'Quit',
          accelerator: 'Command+Q',
          selector: 'terminate:',
          click: function() {
            app.isQuiting = true;
            app.quit();
          }
        }
        ]);
        appIcon.setToolTip('This is my application.');
        appIcon.setContextMenu(contextMenu);
        
        win.on('minimize', function (event) {
            event.preventDefault()
            win.hide()
        })

        win.on('show', function () {
            appIcon.setHighlightMode('always')
        })
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow)

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
          app.quit()
        }
    })

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
          createWindow()
        }
    })

    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and require them here.

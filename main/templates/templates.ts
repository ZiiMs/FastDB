import { app, BrowserWindow, IpcMainEvent } from 'electron'

export const appMenu = (mainWindow: BrowserWindow) => [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Connection',
                click: () => {
                    mainWindow.webContents.send(
                        'create-new-connection-dialog',
                        'new-connection'
                    )
                },
            },
            {
                label: 'Settings',
                click: () => {
                    mainWindow.webContents.send(
                        'open-settings-dialog',
                        'settings'
                    )
                },
            },
            {
                label: 'Quit',
                click: () => {
                    app.quit()
                },
            },
        ],
    },
]

export const explorerContextMenu = (event: IpcMainEvent) => [
    {
        label: 'New Connection',
        click: () => {
            event.sender.send('create-new-connection-dialog', 'new-connection')
        },
    },
]

export const selectedContextMenu = (event: IpcMainEvent, selected: string) => [
    {
        label: 'New Connection',
        click: () => {
            event.sender.send('create-new-connection-dialog', 'new-connection')
        },
    },
    {
        label: 'Properties',
        click: () => {
            event.sender.send('selected-properties-dialog', selected)
        },
    },
]

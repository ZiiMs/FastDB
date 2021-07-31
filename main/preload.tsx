const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    on: (channel: string, callback: (...args: any[]) => void) => {
        ipcRenderer.on(channel, (event, ...args) => callback(...args))
    },
    send: (channel: string, ...data: any[]) => {
        ipcRenderer.send(channel, data)
    },
})

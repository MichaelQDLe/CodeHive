// preload.js
const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // We don't need any APIs for this simple app, but we'll keep the file for Electron's contextIsolation
});
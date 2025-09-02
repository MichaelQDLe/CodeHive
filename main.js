// main.js
const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');

const createWindow = () => {
  // Create the browser window with specified dimensions
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Create three BrowserViews for the AI services with persistent partitions
  const claudeView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'persist:claude'
    }
  });

  const chatGPTView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'persist:gpt'
    }
  });

  const grokView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'persist:grok'
    }
  });

  // Add the views to the main window
  mainWindow.addBrowserView(claudeView);
  mainWindow.addBrowserView(chatGPTView);
  mainWindow.addBrowserView(grokView);

  // Set the bounds for each view (dividing the window into 3 equal columns)
  const windowWidth = 1400;
  const windowHeight = 900;
  const columnWidth = Math.floor(windowWidth / 3);

  claudeView.setBounds({ x: 0, y: 0, width: columnWidth, height: windowHeight });
  chatGPTView.setBounds({ x: columnWidth, y: 0, width: columnWidth, height: windowHeight });
  grokView.setBounds({ x: columnWidth * 2, y: 0, width: columnWidth, height: windowHeight });

  // Load the respective URLs
  claudeView.webContents.loadURL('https://claude.ai');
  chatGPTView.webContents.loadURL('https://chat.openai.com');
  grokView.webContents.loadURL('https://grok.x.ai');

  // Handle window resize to adjust view bounds
  mainWindow.on('resize', () => {
    const [newWidth, newHeight] = mainWindow.getSize();
    const newColumnWidth = Math.floor(newWidth / 3);
    
    claudeView.setBounds({ x: 0, y: 0, width: newColumnWidth, height: newHeight });
    chatGPTView.setBounds({ x: newColumnWidth, y: 0, width: newColumnWidth, height: newHeight });
    grokView.setBounds({ x: newColumnWidth * 2, y: 0, width: newColumnWidth, height: newHeight });
  });
};

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
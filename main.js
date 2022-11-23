const { app, BrowserWindow, screen } = require("electron");
const isMac = process.platform === "darwin";

function createMainWindow() {
  const {width, height} = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    width,
    height,
    resizable: true,
    autoHideMenuBar: true,
    backgroundColor: "#111827",
  });
  mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createMainWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});

// Open a window if none are open (macOS)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

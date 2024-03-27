// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const fs = require('fs');
const { contextIsolated } = require('node:process');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // Load the index.html into the window
  mainWindow.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



console.log("hi");








// ! Warning

//problem: 
// make a function that takes in a length and outputs a random word of that length
function getRandomWordOfLength(len) {
  if (len < 4 || len > 8) return;
  let filepath = `word_lists/words${len}.txt`;
  let words = readDictionaryFromFile(filepath);
  return words[Math.floor(Math.random() * words.length)];
}

// Read the dictionary from a text file that is new-line-delimited
function readDictionaryFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.trim().split('\n');
  } catch (err) {
    console.error('Error reading dictionary file:', err);
    return [];
  }
}

console.log("the word is: " + getRandomWordOfLength(5));
console.log("the word is: " + getRandomWordOfLength(5));


console.log("the word is: " + getRandomWordOfLength(5));
console.log("the word is: " + getRandomWordOfLength(5));
console.log("the word is: " + getRandomWordOfLength(5));
console.log("the word is: " + getRandomWordOfLength(5));
console.log("the word is: " + getRandomWordOfLength(5));
console.log("the word is: " + getRandomWordOfLength(5));
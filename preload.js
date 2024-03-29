// preload.js


const { contextBridge, ipcRenderer, app } = require("electron");

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })


// IMPORTANT: all connections between main and renderers are done through this
// any channels used in the renderer need to be whitelisted
contextBridge.exposeInMainWorld(
  "api", {
      send: (channel, data) => {
          // whitelist channels
          let validChannels = ["request-random-word"]; // methods/events in the main.js
          if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, data);
          } else {
              console.error(`channel '${channel}' is not whitelisted`)
          }
      },
      receive: (channel, func) => {
          let validChannels = ['set-answer']; // methods/events in the renderer
          if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender` 
              ipcRenderer.on(channel, (event, ...args) => func(...args));
          } else {
              console.error(`channel '${channel}' is not whitelisted`)
          }
      }
  }
);
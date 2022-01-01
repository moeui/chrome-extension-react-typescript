import React from 'react'
import { render } from 'react-dom'
import App from './content_script/App'

const isChromeExtensionEnv = !!chrome?.runtime?.getURL

if (isChromeExtensionEnv) {
    const wrap = document.createElement('div');
    wrap.id = 'chrome-extension-app'
    document.body.appendChild(wrap)
    render(<App />, wrap)
}

// import  './content_script/index.styl'

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.color) {
//     console.log("Receive color = " + msg.color);
//     document.body.style.backgroundColor = msg.color;
//     sendResponse("Change color to " + msg.color);
//   } else {
//     sendResponse("Color message is none.");
//   }
// });

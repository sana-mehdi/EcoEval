// content.js

// Handle messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'getResponse') {
      // You can access the active web page content here
      // For example, you can modify the webpage or retrieve information
  
      // Send the response to the background script
      sendResponse("This is a response from the content script.");
    }
  });
  
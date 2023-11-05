// background.js

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.text) {
//       // Send the text to the content script for processing
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         const activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, { action: 'getResponse' }, function (response) {
//           // Handle the response from content.js and send it back to the popup
//           sendResponse(response);
//         });
//       });
//       return true; // Required to indicate an asynchronous response
//     }
//   });

// background.js

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.text) {
//       // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
//       const apiKey = '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';
//       const prompt = message.text;
  
//       // Define the API endpoint for ChatGPT
//       const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
//       // Request data
//       const requestData = {
//         messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
//         max_tokens: 50, // Adjust as needed
//       };
  
//       // Make a POST request to the ChatGPT API
//       fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           // Send the response to the popup
//           sendResponse(data.choices[0].message.content);
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           sendResponse('Error: Unable to get a response from ChatGPT.');
//         });
  
//       return true; // Required to indicate an asynchronous response
//     }
//   });
  
  
// background.js

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.text) {
      // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
      const apiKey = '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';
      const prompt = message.text;
  
      // Define the API endpoint for ChatGPT
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
      // Request data
      const requestData = {
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
        max_tokens: 50, // Adjust as needed
      };
  
      // Make a POST request to the ChatGPT API
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          sendResponse(data.choices[0].message.content);
        })
        .catch((error) => {
          console.error('Error:', error);
          sendResponse('Error: Unable to get a response from ChatGPT.');
        });
  
      return true; // Required to indicate an asynchronous response
    }
  });
  
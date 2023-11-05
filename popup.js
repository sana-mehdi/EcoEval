
  

// document.addEventListener('DOMContentLoaded', function () {
//     const getEstimateButton = document.getElementById('get-estimate-button');
//     const sustainabilityEstimate = document.getElementById('sustainability-estimate');
//     const productDescriptionInput = document.getElementById('product-description');
  
//     getEstimateButton.addEventListener('click', () => {
//       const productDescription = productDescriptionInput.value;
//       const prompt = `Based on this provided description and ingredients, how much would you rate this product in terms of sustainability? Give me an estimate in % out of 100. ${productDescription}`;
  
//       // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
//       const apiKey = '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';
      
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
//           sustainabilityEstimate.textContent = `Sustainability Estimate: ${data.choices[0].message.content}`;
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           sustainabilityEstimate.textContent = 'Error: Unable to get a response from ChatGPT.';
//         });
//     });
//   });
  
// document.addEventListener('DOMContentLoaded', function () {
//     const getEstimateButton = document.getElementById('get-estimate-button');
//     const sustainabilityEstimate = document.getElementById('sustainability-estimate');
//     const productDescriptionInput = document.getElementById('product-description');
  
//     getEstimateButton.addEventListener('click', () => {
//       const productDescription = productDescriptionInput.value;
//       const prompt = `Based on this provided description and ingredients, how much would you rate this product in terms of sustainability? Give me an estimate in % out of 100. ${productDescription}`;
  
//       // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
//       const apiKey = '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';
      
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
//           if (data.choices && data.choices.length > 0) {
//             // Use innerHTML to display HTML content in the popup
//             sustainabilityEstimate.innerHTML = `Sustainability Estimate: ${data.choices[0].message.content}`;
//           } else {
//             sustainabilityEstimate.textContent = 'Error: Invalid response from ChatGPT.';
//           }
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           sustainabilityEstimate.textContent = 'Error: Unable to get a response from ChatGPT.';
//         });
//     });
//   });
 
document.addEventListener('DOMContentLoaded', function () {
    const getEstimateButton = document.getElementById('get-estimate-button');
    const sustainabilityEstimate = document.getElementById('sustainability-estimate');
    const productDescriptionInput = document.getElementById('product-description');
  
    getEstimateButton.addEventListener('click', () => {
      const productDescription = productDescriptionInput.value;
      const user_prompt = `${productDescription}. Based on this provided description and ingredients, how much would you rate this product in terms of sustainability? Give me an estimate in % out of 100. `;
  
      // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
      const apiKey = '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';
      
      // Define the API endpoint for ChatGPT
      const apiUrl = 'https://api.openai.com/v1/completions';
  
      // Request data
      const requestData = {
        prompt: user_prompt,
        model: "gpt-3.5-turbo-instruct",
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
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.choices && data.choices.length > 0) {
            // Use innerHTML to display HTML content in the popup
            sustainabilityEstimate.innerHTML = `Sustainability Estimate: ${data}`;
            console.log(data);
          } else {
            console.error('Invalid response from ChatGPT:', data);
            sustainabilityEstimate.textContent = 'Error: Invalid response from ChatGPT.';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          sustainabilityEstimate.textContent = `Error: Unable to get a response from ChatGPT.${error}`;
        });
    });
  });
  
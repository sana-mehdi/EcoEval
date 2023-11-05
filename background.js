
console.log("Background script is running...");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getSustainabilityEstimate") {
    const productDescription = request.productDescription;
  
    // Construct the prompt for the ChatGPT API
    const user_prompt = `${productDescription}.`;
    console.log(productDescription, user_prompt)
    // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
    const apiKey = "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";

    // Define the API endpoint for ChatGPT
    const apiUrl = "https://api.openai.com/v1/completions";

    // Request data
    const requestData = {
      "model": "gpt-3.5-turbo-instruct",
      "prompt": "PLEASE WORK",
      "max_tokens": 50
    };
    
    // Make a fetch request to the ChatGPT API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((data) => {
        console.log(data)
        if (data.choices && data.choices.length > 0) {
          const generatedText = data//.choices[0].text; // Extract the text from the first choice

          // Send the response back to the popup script
          chrome.runtime.sendMessage({ action: "displaySustainabilityEstimate", estimate: generatedText });
        } else {
          console.error("Invalid response from ChatGPT:", data);
          // Send an error message back to the popup script
          chrome.runtime.sendMessage({ action: "displaySustainabilityEstimate", estimate: "Error: Invalid response from ChatGPT." });
        }
    }).catch((error) => {
        console.error("Error:", error);
        // Send an error message back to the popup script
        chrome.runtime.sendMessage({ action: "displaySustainabilityEstimate", estimate: `Error: Unable to get a response from ChatGPT. ${error}` });
    });
  }
});

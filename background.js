chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getSustainabilityEstimate") {
    const productDescription = request.productDescription;

    // Construct the prompt for the ChatGPT API
    const user_prompt = `${productDescription}.`;
    console.log(productDescription, user_prompt);
    // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
    const apiKey = "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";

    // Define the API endpoint for ChatGPT
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    // Make a fetch request to the ChatGPT API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Authorization':'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: user_prompt }],
        max_tokens: 30,
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.choices && data.choices.length > 0) {
          const generatedText = data.choices[0].message.content; // Extract the text from the first choice

          // Send the response back to the popup script
          chrome.runtime.sendMessage({
            action: "displaySustainabilityEstimate",
            estimate: generatedText,
          });
        } else {
          console.error("Invalid response from ChatGPT:", data);
          // Send an error message back to the popup script
          chrome.runtime.sendMessage({
            action: "displaySustainabilityEstimate",
            estimate: "Error: Invalid response from ChatGPT.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        
        // Send an error message back to the popup script
        chrome.runtime.sendMessage({
          action: "displaySustainabilityEstimate",
          estimate: `Error: Unable to get a response from ChatGPT. ${error}`,
        });
      });
  }
});




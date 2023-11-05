// popup.js file that takes the data from the chrome extension

document.addEventListener("DOMContentLoaded", function () {
  const getEstimateButton = document.getElementById("get-estimate-button");
  const productDescriptionInput = document.getElementById(
    "product-description"
  );
  const sustainabilityEstimateElement = document.getElementById(
    "sustainability-estimate"
  );

  getEstimateButton.addEventListener("click", () => {
    const productDescription = productDescriptionInput.value;
    const user_prompt = `${productDescription}. Based on this provided description and ingredients, give me a percentage indicating the sustainability of this product on a scale of 1-100 . Answer in two lines`;

    // Send a message to the background script
    chrome.runtime.sendMessage({
      action: "getSustainabilityEstimate",
      productDescription: user_prompt,
    });
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "displaySustainabilityEstimate") {
      const estimate = request.estimate;
      // Update the sustainability estimate element in your popup
      sustainabilityEstimateElement.textContent = `The sustainability rating: ${estimate}`;
    }
  });
});

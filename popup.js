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
    const user_prompt = `${productDescription}. Based on this provided description and ingredients, how much would you rate this product in terms of sustainability? Give me an estimate in % out of 100.`;

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

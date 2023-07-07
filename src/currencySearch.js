// Fetch the currency data from the API
fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
  .then(response => response.json())
  .then(data => {
    const currencyData = data;

    // Get the necessary elements
    const currencyInput = document.getElementById('currencyInput');
    const searchButton = document.getElementById('searchButton');
    const fullNameSpan = document.getElementById('fullName');

    // Add event listener to the search button
    searchButton.addEventListener('click', searchCurrency);

    // Add event listener to the currency input field
    currencyInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        searchCurrency();
      }
    });

    // Function to handle currency search
    function searchCurrency() {
      const userInput = currencyInput.value.toLowerCase();
      if (currencyData.hasOwnProperty(userInput)) {
        fullNameSpan.textContent = currencyData[userInput].toUpperCase();
      } else {
        fullNameSpan.textContent = 'Currency not found';
      }
    }
  });

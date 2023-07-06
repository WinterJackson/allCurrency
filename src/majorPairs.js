function fetchExchangeRates() {
    // Define the currency pairs
    const currencyPairs = [
      "EUR/USD",
      "USD/EUR",
      "GBP/USD",
      "USD/GBP",
      "USD/CAD",
      "CAD/USD",
      "USD/CHF",
      "CHF/USD",
      "USD/JPY",
      "JPY/USD",
      "EUR/GBP",
      "GBP/EUR",
      "EUR/CHF",
      "CHF/EUR",
      "AUD/USD",
      "USD/AUD",
      "EUR/JPY",
      "JPY/EUR",
      "GBP/JPY",
      "JPY/GBP"
    ];
  
    // Create a table element
    const table = document.createElement("table");
  
    // Create the table header
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const currencyPairHeader = document.createElement("th");
    currencyPairHeader.textContent = "Currency Pair";
    const exchangeRateHeader = document.createElement("th");
    exchangeRateHeader.textContent = "Exchange Rate";
  
    headerRow.appendChild(currencyPairHeader);
    headerRow.appendChild(exchangeRateHeader);
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);
  
    // Create the table body
    const tableBody = document.createElement("tbody");
  
    // Fetch the exchange rate data for each currency pair
    currencyPairs.forEach(currencyPair => {
      const [baseCurrency, targetCurrency] = currencyPair.split("/");
  
      // Fetch the data using the API URL
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency.toLowerCase()}/${targetCurrency.toLowerCase()}.json`)
        .then(response => response.json())
        .then(data => {
          const exchangeRate = data[targetCurrency.toUpperCase()];
          const row = document.createElement("tr");
          const currencyPairCell = document.createElement("td");
          currencyPairCell.textContent = currencyPair;
          const exchangeRateCell = document.createElement("td");
          exchangeRateCell.textContent = exchangeRate;
  
          row.appendChild(currencyPairCell);
          row.appendChild(exchangeRateCell);
          tableBody.appendChild(row);
          table.appendChild(tableBody);
        })
        .catch(error => console.error(error));
    });
  
    // Append the table to the document body
    document.body.appendChild(table);
  }
  
  // Call the function to fetch and display the exchange rates
  fetchExchangeRates();
  
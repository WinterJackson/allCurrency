function fetchUsdPairsExchangeRates() {
    // List of the USD pairs
    const usdPairs = [
      "USD/CNH",
      "CNH/USD",
      "USD/DKK",
      "DKK/USD",
      "USD/HUF",
      "HUF/USD",
      "USD/MXN",
      "MXN/USD",
      "USD/PLN",
      "PLN/USD",
      "USD/SEK",
      "SEK/USD",
      "USD/THB",
      "THB/USD",
      "USD/ZAR",
      "ZAR/USD",
      "USD/CZK",
      "CZK/USD",
      "USD/HKD",
      "HKD/USD",
      "USD/NOK",
      "NOK/USD",
      "USD/SAR",
      "SAR/USD",
      "USD/SGD",
      "SGD/USD",
      "USD/TRY",
      "TRY/USD"
    ];
  
    // container div for the tables
    const containerDiv = document.createElement("div");
    containerDiv.style.display = "flex";
  
    // the first column table for USD pairs
    const table1 = createTable(usdPairs.slice(0, 14));
    containerDiv.appendChild(table1);
  
    // the second column table for USD pairs
    const table2 = createTable(usdPairs.slice(14));
    containerDiv.appendChild(table2);
  
    // Append the container div to the usdPairsTable div
    const usdPairsTableDiv = document.getElementById("usdPairsTable");
    usdPairsTableDiv.appendChild(containerDiv);
  }
  
  function createTable(pairs) {
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
    pairs.forEach(currencyPair => {
      const [baseCurrency, targetCurrency] = currencyPair.split("/");
  
      // Fetch the data using the API URL
      fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency.toLowerCase()}/${targetCurrency.toLowerCase()}.json`
      )
        .then(response => response.json())
        .then(data => {
          const exchangeRate = Object.values(data)[1];
          const row = document.createElement("tr");
          const currencyPairCell = document.createElement("td");
          currencyPairCell.textContent = currencyPair;
          const exchangeRateCell = document.createElement("td");
          exchangeRateCell.textContent = exchangeRate;
  
          row.appendChild(currencyPairCell);
          row.appendChild(exchangeRateCell);
          tableBody.appendChild(row);
        })
        .catch(error => console.error(error));
    });
  
    table.appendChild(tableBody);
  
    return table;
  }
  
  
  fetchUsdPairsExchangeRates();
  
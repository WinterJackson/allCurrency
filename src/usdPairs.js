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
  containerDiv.classList.add("usd-pairs-table-container");

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

fetchUsdPairsExchangeRates();

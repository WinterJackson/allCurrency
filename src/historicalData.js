// Fetch the currency options and populate the base currency select dropdown
fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json", {
  method: "GET"
})
  .then(response => response.json())
  .then(data => {
    const baseCurrencySelect = document.getElementById("baseCurrency");

    for (const currencyCode in data) {
      const option = document.createElement("option");
      option.value = currencyCode;
      option.text = currencyCode.toUpperCase();
      baseCurrencySelect.appendChild(option);
    }
  })
  .catch(error => {
    console.log("An error occurred while fetching the currency data:", error);
  });

let receivedData;

function fetchExchangeRates(event) {
  event.preventDefault();

  const baseCurrency = document.getElementById("baseCurrency").value.toLowerCase();
  const date = document.getElementById("date2").value;
  const endpoint = `currencies/${baseCurrency}.json`;

  const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/${endpoint}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      receivedData = data;
      displayExchangeRates();
    })
    .catch(error => {
      console.log("An error occurred while fetching the data:", error);
    });
}

function displayExchangeRates() {
  const resultDiv = document.getElementById("resultTable");
  resultDiv.innerHTML = '';

  const exchangeRates = Object.values(receivedData)[1];
  const currencies = [
    "kwd", "bhd", "omr", "jod", "kyd", "gbp", "eur", "chf", "usd", "bsd",
    "pab", "bmd", "cad", "sgd", "bnd", "aud", "nzd", "bgn", "fjd", "brl"
  ];

  fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
    .then(response => response.json())
    .then(data => {
      const baseCurrencyFullName = document.getElementById("currency-fullname").textContent;
      const captionText = `The information below represents the exchange rates of ${baseCurrencyFullName} against the top 20 strongest currencies in the world.`;

      // Create a table element
      const table = document.createElement("table");
      table.classList.add("exchange-rates-table");

      // Create table caption
      const caption = document.createElement("caption");
      caption.textContent = captionText;
      table.appendChild(caption);

      // Create table header
      const headerRow = document.createElement("tr");
      const headerCell1 = document.createElement("th");
      headerCell1.textContent = "Currency";
      const headerCell2 = document.createElement("th");
      headerCell2.textContent = "Full Name";
      const headerCell3 = document.createElement("th");
      headerCell3.textContent = "Exchange Rate";
      headerRow.appendChild(headerCell1);
      headerRow.appendChild(headerCell2);
      headerRow.appendChild(headerCell3);
      table.appendChild(headerRow);

      // Populate table rows with data
      for (let i = 0; i < currencies.length; i++) {
        const currency = currencies[i];
        const exchangeRate = exchangeRates[currency];
        const currencyFullName = data[currency].toUpperCase();

        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        cell1.textContent = currency.toUpperCase();
        const cell2 = document.createElement("td");
        cell2.textContent = currencyFullName;
        const cell3 = document.createElement("td");
        cell3.textContent = exchangeRate;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        // Append each row to the table
        table.appendChild(row);
      }

      // Append the table to the resultDiv
      resultDiv.appendChild(table);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function fetchCurrencyFullName(currencyCode, elementId) {
  fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
    .then(response => response.json())
    .then(data => {
      const currencyFullName = data[currencyCode].toUpperCase();
      document.getElementById(elementId).textContent = currencyFullName;
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

const baseCurrencySelect = document.getElementById("baseCurrency");
baseCurrencySelect.addEventListener("change", function() {
  const selectedCurrency = this.value;
  fetchCurrencyFullName(selectedCurrency, "currency-fullname");
});

const submitButton = document.getElementById("submitBtn");
submitButton.addEventListener("click", fetchExchangeRates);

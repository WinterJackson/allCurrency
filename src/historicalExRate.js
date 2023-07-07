function fetchExchangeRate(event) {
    event.preventDefault();
  
    const baseCurrency = document.getElementById('base-currency').value;
    const targetCurrency = document.getElementById('target-currency').value;
    const date = document.getElementById('date').value;
  
    const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${baseCurrency.toLowerCase()}.json`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const exchangeRates = Object.values(data)[1]; // Using Object.values() to get an array of all the exchange rates
  
        if (exchangeRates && exchangeRates[targetCurrency]) {
          const exchangeRate = exchangeRates[targetCurrency];
          document.getElementById('resultRate').innerHTML = `Exchange Rate of ${baseCurrency.toUpperCase()} against ${targetCurrency.toUpperCase()}: ${exchangeRate}`;
        } else {
          document.getElementById('resultRate').innerHTML = 'Exchange rate not found for the selected currencies and date.';
        }
      })
      .catch(error => {
        document.getElementById('resultRate').innerHTML = 'Error fetching exchange rate data.';
        console.log(error);
      });
  }
  
  // Populate currency dropdowns with available currencies
  function populateCurrencies() {
    const baseCurrencyDropdown = document.getElementById('base-currency');
    const targetCurrencyDropdown = document.getElementById('target-currency');
  
    // Fetch currency list
    const apiUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json';
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const currencies = Object.keys(data);
  
        currencies.forEach(currency => {
          const option = document.createElement('option');
          option.value = currency;
          option.text = currency.toUpperCase();
          baseCurrencyDropdown.appendChild(option.cloneNode(true));
          targetCurrencyDropdown.appendChild(option);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  populateCurrencies();
  
  // Fetch currency full name for base currency
  document.getElementById('base-currency').addEventListener('change', function() {
    const selectedCurrency = this.value;
    fetchCurrencyFullName(selectedCurrency, 'base-fullname');
  });
  
  // Fetch currency full name for target currency
  document.getElementById('target-currency').addEventListener('change', function() {
    const selectedCurrency = this.value;
    fetchCurrencyFullName(selectedCurrency, 'target-fullname');
  });
  
  // Fetch currency full name function
  function fetchCurrencyFullName(currencyCode, elementId) {
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
      .then(response => response.json())
      .then(data => {
        const currencyFullName = data[currencyCode].toUpperCase();
        document.getElementById(elementId).textContent = currencyFullName;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
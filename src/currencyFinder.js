document.addEventListener("DOMContentLoaded", function() {
      // Retrieve currency data from the server
        fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
            .then(response => response.json())
        .then(data => {
        // Populate the currency select dropdowns
        const fromCurrencySelect = document.getElementById("from-currency");
        const toCurrencySelect = document.getElementById("to-currency");
    
        for (const currencyCode in data) {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = currencyCode;
            option2.value = currencyCode;
            option1.text = currencyCode.toUpperCase();
            option2.text = currencyCode.toUpperCase();
            fromCurrencySelect.appendChild(option1);
            toCurrencySelect.appendChild(option2);
        }
    
        // Fetch and display the full name of the selected currency
        function fetchCurrencyFullName(currencyCode, inputId) {
            const currencyInitials = currencyCode.toUpperCase();
            const currencyFullName = data[currencyCode].toUpperCase();
            document.getElementById(inputId).textContent = currencyFullName;
        }
    
        // Fetch currency full names again for real-time updates
        function fetchCurrencyFullNames() {
            fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
            .then(response => response.json())
            .then(data => {
                for (const currencyCode in data) {
                const currencyFullName = data[currencyCode].toUpperCase();
                document.getElementById(`from-currency-${currencyCode}-fullname`).textContent = currencyFullName;
                document.getElementById(`to-currency-${currencyCode}-fullname`).textContent = currencyFullName;
                }
            })
            .catch(error => {
                console.log("Error:", error);
            });
        }
    
        // Add event listeners to perform real-time conversion and display full names
        const convertFromInput = document.getElementById("convert-from");
        const convertToInput = document.getElementById("convert-to");
    
        convertFromInput.addEventListener("input", convertCurrency);
        fromCurrencySelect.addEventListener("change", function() {
            const selectedCurrency = this.value;
            fetchCurrencyFullName(selectedCurrency, "from-currency-fullname");
            convertCurrency();
        });
        toCurrencySelect.addEventListener("change", function() {
            const selectedCurrency = this.value;
            fetchCurrencyFullName(selectedCurrency, "to-currency-fullname");
            convertCurrency();
        });
    
        // Fetch currency full names initially and set interval for real-time updates
        fetchCurrencyFullNames();
        setInterval(fetchCurrencyFullNames, 60000); // Update every minute
    
        function convertCurrency() {
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            const amount = parseFloat(convertFromInput.value);
    
            if (!isNaN(amount)) {
            fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`)
                .then(response => response.json())
                .then(data => {
                const conversionRate = data[toCurrency];
                const convertedAmount = (amount * conversionRate).toFixed(2);
                convertToInput.value = convertedAmount;
                })
                .catch(error => {
                console.log("Error:", error);
                });
            } else {
            convertToInput.value = "";
            }
        }
        })
        .catch(error => {
        console.log("Error:", error);
        });
    });
    
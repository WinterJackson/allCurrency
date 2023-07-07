// headerAll.js
fetch('header-all.html')
  .then(response => response.text())
  .then(data => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    headerPlaceholder.innerHTML = data;
  })
  .catch(error => {
    console.error('Error fetching header:', error);
  });

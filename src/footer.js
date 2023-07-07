// footer.js
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    const headerPlaceholder = document.getElementById('footer-placeholder');
    headerPlaceholder.innerHTML = data;
  })
  .catch(error => {
    console.error('Error fetching header:', error);
  });

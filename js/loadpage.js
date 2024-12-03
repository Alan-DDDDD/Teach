fetch('header-aside.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('layout-menu').innerHTML = data;
      })
      .catch(error => console.error('Error loading header:', error));
fetch('header-nav.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('layout-navbar').innerHTML = data;
      })
      .catch(error => console.error('Error loading header:', error));
fetch('footer-alert.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('buynow').innerHTML = data;
      })
      .catch(error => console.error('Error loading header:', error));
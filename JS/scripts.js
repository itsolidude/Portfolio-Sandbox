document.querySelector('.hamburger-menu').addEventListener('click', function() {
  let navLinks = document.querySelector('.nav-links');
  if (navLinks.style.display === 'none' || navLinks.style.display === '') {
      navLinks.style.display = 'block';
  } else {
      navLinks.style.display = 'none';
  }
});

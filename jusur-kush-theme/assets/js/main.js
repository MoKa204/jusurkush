document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Sidebar Logic ---
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileSidebar = document.getElementById('mobileSidebar');
  const menuOverlay = document.getElementById('menuOverlay');

  function openSidebar() {
    if (mobileSidebar && menuOverlay) {
      mobileSidebar.classList.add('is-active');
      menuOverlay.classList.add('is-active');
      mobileSidebar.setAttribute('aria-hidden', 'false');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    }
  }

  function closeSidebar() {
    if (mobileSidebar && menuOverlay) {
      mobileSidebar.classList.remove('is-active');
      menuOverlay.classList.remove('is-active');
      mobileSidebar.setAttribute('aria-hidden', 'true');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      openSidebar();
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', () => {
      closeSidebar();
    });
  }


  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Basic Wishlist button toggle for non-WooCommerce static elements
  const wishlistButtons = document.querySelectorAll('.product-wishlist');
  wishlistButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.style.color = btn.style.color === 'red' ? '' : 'red';
      btn.innerHTML = btn.style.color === 'red' ? '♥' : '♡';
    });
  });
});

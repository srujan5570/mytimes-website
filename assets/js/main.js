// Smooth fade-in for main content
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// 3D hover effect for app cards
const add3DHover = () => {
  const cards = document.querySelectorAll('.app-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

document.addEventListener('DOMContentLoaded', add3DHover);

// Animated navigation underline (handled by CSS) 

// Hamburger menu toggle for mobile navigation
window.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-menu');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    // Close nav when a link is clicked (on mobile)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }
}); 

// Lightbox functionality for screenshots
window.addEventListener('DOMContentLoaded', () => {
  const lightboxImgs = document.querySelectorAll('.lightbox-img');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxClose = document.querySelector('.lightbox-close');

  lightboxImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxContent.src = img.src;
      lightboxModal.classList.add('open');
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    lightboxContent.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}); 

// Apply dark mode on every page load if set in localStorage
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
});

// Dark Mode Toggle for Settings Page
window.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    // Load preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
    darkModeToggle.addEventListener('change', () => {
      if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    });
  }
}); 
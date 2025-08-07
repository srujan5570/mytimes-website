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
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
    });
    // Close nav when a link is clicked (on mobile)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
    // Close nav when clicking outside nav/hamburger
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  // Search icon logic (placeholder)
  const searchIcon = document.getElementById('search-icon');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');
  if (searchIcon && searchModal) {
    searchIcon.addEventListener('click', () => {
      searchModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
    });
    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    // Close modal on background click
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('open');
        document.body.style.overflow = '';
      }
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

// --- Real Client-Side Search Implementation ---
const searchIndex = [
  { title: 'Home', description: 'Welcome to My Time. Revolutionizing time and money management with next-gen mobile apps.', link: 'index.html' },
  { title: 'About', description: 'Company mission, vision, and leadership.', link: 'about.html' },
  { title: 'Apps', description: 'Explore all My Time mobile applications, screenshots, and download links.', link: 'apps.html' },
  { title: 'Contact', description: 'Contact info, business hours, and social media.', link: 'contact.html' },
  { title: 'Legal', description: 'Privacy Policy, Terms of Service, and legal information.', link: 'legal.html' },
  { title: 'Settings', description: 'Dark mode, notifications, and user preferences.', link: 'settings.html' },
  { title: '3D Animations', description: 'Interactive 3D animations and visual effects.', link: '3d-animations.html' },
  // Add app details for search
  { title: 'My Time App', description: 'Organize your schedule and boost productivity. Download APK and see screenshots.', link: 'apps.html' },
  { title: 'Easy Money App', description: 'Track expenses and manage your money with ease. Download APK and see screenshots.', link: 'apps.html' },
  // CEO
  { title: 'Banavath Srujan', description: 'Founder & CEO. Visionary leader in mobile technology.', link: 'about.html' },
];

function highlightMatch(text, query) {
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.querySelector('.search-results');
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      if (!query) {
        searchResults.innerHTML = '';
        return;
      }
      const results = searchIndex.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      if (results.length === 0) {
        searchResults.innerHTML = '<div style="color:#BFC9D1;">No results found.</div>';
        return;
      }
      searchResults.innerHTML = results.map(item =>
        `<a href="${item.link}" class="search-result-link" onclick="document.getElementById('search-modal').classList.remove('open');document.body.style.overflow='';">
          <div class="search-result-title">${highlightMatch(item.title, query)}</div>
          <div class="search-result-desc">${highlightMatch(item.description, query)}</div>
        </a>`
      ).join('');
    });
  }
}); 

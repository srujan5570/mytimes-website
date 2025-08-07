// Smooth fade-in for main content
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  
  // Initialize contact form functionality
  initContactForm();
  
  // Initialize FAQ accordion
  initFaqAccordion();
  
  // Initialize 3D animations controls
  init3DAnimationControls();
  
  // Initialize hero canvas if on animations page
  if (document.getElementById('hero-canvas-container')) {
    initHeroCanvas();
  }
  
  // Initialize particle system if on animations page
  if (document.getElementById('particles-container')) {
    initParticleSystem();
  }
  
  // Initialize 3D hover effect for app cards
  add3DHover();
});

// 3D Animation Controls
function init3DAnimationControls() {
  // Cube controls
  const cubeSpeedUp = document.getElementById('cube-speed-up');
  const cubeSpeedDown = document.getElementById('cube-speed-down');
  const cubeReset = document.getElementById('cube-reset');
  const cube = document.querySelector('.cube');
  
  if (cubeSpeedUp && cube) {
    let rotationSpeed = 20; // Default speed in seconds
    
    cubeSpeedUp.addEventListener('click', () => {
      if (rotationSpeed > 5) {
        rotationSpeed -= 5;
        updateCubeAnimation();
      }
    });
    
    cubeSpeedDown.addEventListener('click', () => {
      if (rotationSpeed < 40) {
        rotationSpeed += 5;
        updateCubeAnimation();
      }
    });
    
    cubeReset.addEventListener('click', () => {
      rotationSpeed = 20;
      updateCubeAnimation();
    });
    
    function updateCubeAnimation() {
      cube.style.animation = `rotateCube ${rotationSpeed}s infinite linear`;
    }
  }
  
  // Sphere controls
  const sphereColor = document.getElementById('sphere-color');
  const sphereParticles = document.getElementById('sphere-particles');
  const sphere = document.querySelector('.sphere');
  
  if (sphereColor && sphere) {
    const colors = [
      'radial-gradient(circle at 30% 30%, var(--primary), #0A84FF)',
      'radial-gradient(circle at 30% 30%, #FF2D55, #FF375F)',
      'radial-gradient(circle at 30% 30%, #30D158, #34C759)',
      'radial-gradient(circle at 30% 30%, #FFD60A, #FFCC00)',
      'radial-gradient(circle at 30% 30%, #BF5AF2, #AF52DE)'
    ];
    let colorIndex = 0;
    
    sphereColor.addEventListener('click', () => {
      colorIndex = (colorIndex + 1) % colors.length;
      sphere.style.background = colors[colorIndex];
    });
    
    let particlesVisible = false;
    if (sphereParticles) {
      sphereParticles.addEventListener('click', () => {
        particlesVisible = !particlesVisible;
        if (particlesVisible) {
          addSphereParticles();
        } else {
          removeSphereParticles();
        }
      });
    }
    
    function addSphereParticles() {
      const container = sphere.parentElement;
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('sphere-particle');
        particle.style.width = `${Math.random() * 8 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.7)';
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animation = `floatParticle ${Math.random() * 3 + 2}s infinite alternate ease-in-out`;
        container.appendChild(particle);
      }
      
      // Add keyframes for particles if not already added
      if (!document.getElementById('particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
          @keyframes floatParticle {
            0% { transform: translate(0, 0); }
            100% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    function removeSphereParticles() {
      const particles = document.querySelectorAll('.sphere-particle');
      particles.forEach(particle => particle.remove());
    }
  }
  
  // Pulse controls
  const pulseSpeed = document.getElementById('pulse-speed');
  const pulseColor = document.getElementById('pulse-color');
  const pulseRings = document.querySelectorAll('.pulse-ring');
  
  if (pulseSpeed && pulseRings.length) {
    let currentSpeed = 2; // Default speed in seconds
    let speedOptions = [0.5, 1, 2, 3, 4];
    let speedIndex = 2; // Start with default 2s
    
    pulseSpeed.addEventListener('click', () => {
      speedIndex = (speedIndex + 1) % speedOptions.length;
      currentSpeed = speedOptions[speedIndex];
      pulseRings.forEach((ring, index) => {
        ring.style.animation = `pulse ${currentSpeed}s infinite`;
        if (index > 0) {
          ring.style.animationDelay = `${index * currentSpeed / 3}s`;
        }
      });
    });
    
    if (pulseColor) {
      const pulseColors = [
        'var(--primary)',
        '#FF2D55',
        '#30D158',
        '#FFD60A',
        '#BF5AF2'
      ];
      let colorIndex = 0;
      
      pulseColor.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % pulseColors.length;
        const newColor = pulseColors[colorIndex];
        pulseRings.forEach(ring => {
          ring.style.backgroundColor = newColor;
          ring.style.boxShadow = `0 0 10px ${newColor}`;
        });
      });
    }
  }
  
  // Particle system controls
  const particlesDensity = document.getElementById('particles-density');
  const particlesReset = document.getElementById('particles-reset');
  
  if (particlesDensity && particlesReset) {
    let density = 50; // Default number of particles
    
    particlesDensity.addEventListener('click', () => {
      density = density === 50 ? 100 : density === 100 ? 25 : 50;
      updateParticleSystem(density);
    });
    
    particlesReset.addEventListener('click', () => {
      density = 50;
      updateParticleSystem(density);
    });
  }
}

// Hero Canvas with Three.js
function initHeroCanvas() {
  const container = document.getElementById('hero-canvas-container');
  if (!container || typeof THREE === 'undefined') return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;
  
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x0A84FF,
    transparent: true,
    opacity: 0.8
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  camera.position.z = 3;
  
  // Animation
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Particle System
function initParticleSystem() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  
  let particles = [];
  let density = 50;
  
  function createParticles() {
    // Clear existing particles
    container.innerHTML = '';
    particles = [];
    
    // Create new particles
    for (let i = 0; i < density; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 5 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(255, 255, 255, 0.7)';
      particle.style.borderRadius = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.transition = 'transform 0.3s ease-out';
      
      container.appendChild(particle);
      
      particles.push({
        element: particle,
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5
      });
    }
  }
  
  function updateParticles() {
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce off walls
      if (p.x < 0 || p.x > container.offsetWidth) p.speedX *= -1;
      if (p.y < 0 || p.y > container.offsetHeight) p.speedY *= -1;
      
      p.element.style.transform = `translate(${p.x}px, ${p.y}px)`;
    });
    
    requestAnimationFrame(updateParticles);
  }
  
  // Mouse interaction
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    particles.forEach(p => {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        p.speedX -= Math.cos(angle) * 0.2;
        p.speedY -= Math.sin(angle) * 0.2;
      }
    });
  });
  
  // Initialize and expose update function
  createParticles();
  updateParticles();
  
  // Expose function to update particle density
  window.updateParticleSystem = function(newDensity) {
    density = newDensity;
    createParticles();
  };
}

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

  // Only initialize lightbox if all elements exist
  if (lightboxImgs.length && lightboxModal && lightboxContent && lightboxClose) {
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
  }
});

// Contact Form Functionality
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        showFormStatus('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission (in a real app, you would send data to a server)
      setTimeout(() => {
        showFormStatus('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
      }, 1000);
    });
  }
  
  function showFormStatus(message, type) {
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.className = 'form-status ' + type;
      
      // Hide the message after 5 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
      }, 5000);
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// FAQ Accordion Functionality
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
          faqItem.classList.add('active');
        }
      });
      
      // Keyboard accessibility
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }
}

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
  { title: 'Health Tracker App', description: 'Monitor your health metrics and fitness goals. Coming soon.', link: 'apps.html' },
  // 3D Animations
  { title: 'Rotating Cube', description: 'Interactive 3D cube with custom textures and smooth rotation animations.', link: '3d-animations.html#animation-showcase' },
  { title: 'Floating Sphere', description: 'Mesmerizing sphere with dynamic lighting and particle effects.', link: '3d-animations.html#animation-showcase' },
  { title: 'Pulse Rings', description: 'Hypnotic pulsating rings with customizable wave patterns.', link: '3d-animations.html#animation-showcase' },
  { title: 'Particle System', description: 'Interactive particle system that responds to mouse movement.', link: '3d-animations.html#animation-showcase' },
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
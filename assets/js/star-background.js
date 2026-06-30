// Star Background Animation
function initStarBackground() {
  const starBackground = document.querySelector('.star-background');
  if (!starBackground) return;
  
  // Clear existing stars
  starBackground.innerHTML = '';
  
  // Create stars
  const starCount = 200;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random position
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random animation delay
    star.style.animationDelay = `${Math.random() * 4}s`;
    
    // Random brightness
    star.style.opacity = Math.random() * 0.7 + 0.3;
    
    starBackground.appendChild(star);
  }
  
  // Create shooting stars
  createShootingStars(starBackground);
}

// Create shooting stars
function createShootingStars(container) {
  const shootingStarCount = 5;
  
  for (let i = 0; i < shootingStarCount; i++) {
    setTimeout(() => {
      const shootingStar = document.createElement('div');
      shootingStar.classList.add('shooting-star');
      
      // Random position (always start from top/left area)
      shootingStar.style.top = `${Math.random() * 50}%`;
      shootingStar.style.left = `${Math.random() * 50}%`;
      
      // Random angle
      const angle = Math.random() * 45 + 15; // 15-60 degrees
      shootingStar.style.transform = `rotate(${angle}deg)`;
      shootingStar.style.setProperty('--angle', `${angle}deg`);
      
      container.appendChild(shootingStar);
      
      // Remove after animation completes
      setTimeout(() => {
        shootingStar.remove();
        // Create a new shooting star to replace this one
        createShootingStars(container);
      }, 3000);
    }, i * 5000); // Stagger shooting stars
  }
}

// Initialize star background when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  initStarBackground();
});
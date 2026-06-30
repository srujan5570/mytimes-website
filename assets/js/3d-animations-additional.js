/**
 * Additional 3D Animations JavaScript
 * This file contains the implementation for more advanced 3D animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all the additional animations
  initAudioVisualizer();
  initRainingCode();
  initVirtualCity();
  initParticleExplosion();
  initWaterRipple();
});

// Audio Visualizer
function initAudioVisualizer() {
  const canvas = document.getElementById('audio-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const bars = 64;
  const barWidth = canvas.width / bars;
  let audioData = [];
  
  // Generate random audio data for visualization
  function generateAudioData() {
    audioData = [];
    for (let i = 0; i < bars; i++) {
      audioData.push(Math.random() * 0.8 + 0.2);
    }
  }
  
  // Initial data
  generateAudioData();
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update audio data with slight changes
    for (let i = 0; i < audioData.length; i++) {
      audioData[i] += (Math.random() * 0.2 - 0.1);
      audioData[i] = Math.max(0.1, Math.min(1, audioData[i]));
    }
    
    // Draw bars
    for (let i = 0; i < bars; i++) {
      const barHeight = audioData[i] * canvas.height * 0.8;
      const x = i * barWidth;
      const y = canvas.height - barHeight;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
      gradient.addColorStop(0, '#0A84FF');
      gradient.addColorStop(1, '#0062cc');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Controls
  const resetBtn = document.getElementById('audio-reset');
  const barsBtn = document.getElementById('audio-bars');
  
  if (resetBtn) {
    resetBtn.addEventListener('click', generateAudioData);
  }
  
  if (barsBtn) {
    barsBtn.addEventListener('click', function() {
      // Smooth out or make more jagged
      for (let i = 1; i < audioData.length - 1; i++) {
        audioData[i] = (audioData[i-1] + audioData[i] + audioData[i+1]) / 3;
      }
    });
  }
}

// Raining Code (Matrix Effect)
function initRainingCode() {
  const canvas = document.getElementById('code-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()=+[]{};<>?/\\|';
  const columns = Math.floor(canvas.width / 15);
  const drops = [];
  
  // Initialize drops
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / 15);
  }
  
  let codeColor = '#0f0'; // Default Matrix green
  
  function draw() {
    // Black background with opacity to create trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = codeColor;
    ctx.font = '15px monospace';
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      
      // x = i * character width, y = value of drops[i] * character height
      ctx.fillText(text, i * 15, drops[i] * 15);
      
      // Send the drop back to the top randomly after it has crossed the screen
      if (drops[i] * 15 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Increment y coordinate
      drops[i]++;
    }
  }
  
  // Animation loop
  setInterval(draw, 33);
  
  // Controls
  const colorBtn = document.getElementById('code-color');
  const speedBtn = document.getElementById('code-speed');
  
  if (colorBtn) {
    colorBtn.addEventListener('click', function() {
      const colors = ['#0f0', '#0ff', '#ff0', '#f0f', '#0A84FF', '#ff4757'];
      codeColor = colors[Math.floor(Math.random() * colors.length)];
    });
  }
  
  if (speedBtn) {
    speedBtn.addEventListener('click', function() {
      // This doesn't actually change the speed since we're using setInterval
      // But we could implement this by clearing the interval and setting a new one
      // For simplicity, we'll just add more drops
      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.5) {
          drops[i] += 5;
        }
      }
    });
  }
}

// Virtual City
function initVirtualCity() {
  const canvas = document.getElementById('city-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const buildings = [];
  const stars = [];
  let timeOfDay = 'night'; // 'day' or 'night'
  
  // Create stars
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height / 2),
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2
    });
  }
  
  // Create buildings
  function generateBuildings() {
    buildings.length = 0;
    const buildingCount = Math.floor(Math.random() * 10) + 15;
    const buildingWidth = canvas.width / buildingCount;
    
    for (let i = 0; i < buildingCount; i++) {
      const height = Math.random() * (canvas.height * 0.6) + (canvas.height * 0.2);
      const x = i * buildingWidth;
      
      buildings.push({
        x: x,
        y: canvas.height - height,
        width: buildingWidth,
        height: height,
        windows: Math.floor(Math.random() * 5) + 3,
        windowsOn: Math.random() > 0.3 // Some buildings have lights on
      });
    }
  }
  
  // Initial generation
  generateBuildings();
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Sky gradient based on time of day
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    
    if (timeOfDay === 'day') {
      skyGradient.addColorStop(0, '#1e90ff');
      skyGradient.addColorStop(1, '#87ceeb');
    } else {
      skyGradient.addColorStop(0, '#000033');
      skyGradient.addColorStop(1, '#0A084F');
    }
    
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars (only at night)
    if (timeOfDay === 'night') {
      for (const star of stars) {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Draw sun
      ctx.fillStyle = '#FDB813';
      ctx.beginPath();
      ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Sun glow
      const sunGlow = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.2, 30,
        canvas.width * 0.8, canvas.height * 0.2, 60
      );
      sunGlow.addColorStop(0, 'rgba(253, 184, 19, 0.5)');
      sunGlow.addColorStop(1, 'rgba(253, 184, 19, 0)');
      
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 60, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw buildings
    for (const building of buildings) {
      // Building body
      if (timeOfDay === 'day') {
        ctx.fillStyle = '#555';
      } else {
        ctx.fillStyle = '#222';
      }
      
      ctx.fillRect(building.x, building.y, building.width, building.height);
      
      // Windows
      const windowWidth = building.width * 0.6 / building.windows;
      const windowHeight = building.height * 0.1;
      const windowSpacing = building.width * 0.4 / (building.windows + 1);
      
      for (let row = 0; row < Math.floor(building.height / (windowHeight * 2)); row++) {
        for (let col = 0; col < building.windows; col++) {
          const windowX = building.x + windowSpacing + col * (windowWidth + windowSpacing);
          const windowY = building.y + windowSpacing + row * (windowHeight + windowSpacing) * 2;
          
          if (timeOfDay === 'day' || !building.windowsOn) {
            ctx.fillStyle = '#87CEEB'; // Blue windows during day
          } else {
            ctx.fillStyle = '#FFDB58'; // Yellow light at night
          }
          
          // Some windows are off at night
          if (timeOfDay === 'night' && Math.random() > 0.7) {
            ctx.fillStyle = '#333';
          }
          
          ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
        }
      }
    }
    
    // Ground
    ctx.fillStyle = timeOfDay === 'day' ? '#3a3' : '#131';
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
    
    requestAnimationFrame(draw);
  }
  
  draw();
  
  // Controls
  const timeBtn = document.getElementById('city-time');
  const regenerateBtn = document.getElementById('city-regenerate');
  
  if (timeBtn) {
    timeBtn.addEventListener('click', function() {
      timeOfDay = timeOfDay === 'day' ? 'night' : 'day';
    });
  }
  
  if (regenerateBtn) {
    regenerateBtn.addEventListener('click', generateBuildings);
  }
}

// Particle Explosion
function initParticleExplosion() {
  const canvas = document.getElementById('explosion-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let explosions = 0;
  
  function createExplosion(x, y, color) {
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const size = Math.random() * 3 + 1;
      const life = Math.random() * 50 + 50;
      
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: size,
        color: color,
        life: life,
        maxLife: life
      });
    }
    
    explosions++;
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // Gravity
      p.life--;
      
      if (p.life <= 0) {
        particles.splice(i, 1);
        i--;
        continue;
      }
      
      // Fade out based on life
      const opacity = p.life / p.maxLife;
      
      ctx.globalAlpha = opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
    
    // Automatic explosion if none are active
    if (particles.length === 0 && explosions < 3) {
      const colors = ['#0A84FF', '#ff4757', '#2ed573', '#ffa502', '#7bed9f', '#70a1ff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      createExplosion(canvas.width / 2, canvas.height / 2, randomColor);
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Create explosion on click
  canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const colors = ['#0A84FF', '#ff4757', '#2ed573', '#ffa502', '#7bed9f', '#70a1ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    createExplosion(x, y, randomColor);
  });
  
  // Controls
  const explodeBtn = document.getElementById('explosion-trigger');
  const resetBtn = document.getElementById('explosion-reset');
  
  if (explodeBtn) {
    explodeBtn.addEventListener('click', function() {
      const colors = ['#0A84FF', '#ff4757', '#2ed573', '#ffa502', '#7bed9f', '#70a1ff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      createExplosion(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        randomColor
      );
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      particles = [];
      explosions = 0;
    });
  }
}

// Water Ripple Effect
function initWaterRipple() {
  const canvas = document.getElementById('ripple-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // Create buffers for ripple calculation
  let current = new Array(width * height).fill(0);
  let previous = new Array(width * height).fill(0);
  
  // Damping factor
  let damping = 0.97;
  
  // Create ripple
  function createRipple(x, y, strength) {
    if (x < 2 || x > width - 2 || y < 2 || y > height - 2) return;
    const index = y * width + x;
    previous[index] = strength;
  }
  
  // Update ripple physics
  function updateRipple() {
    for (let i = 1; i < width - 1; i++) {
      for (let j = 1; j < height - 1; j++) {
        const index = j * width + i;
        const top = j * width + (i - 1);
        const bottom = j * width + (i + 1);
        const left = (j - 1) * width + i;
        const right = (j + 1) * width + i;
        
        // Calculate new value based on neighbors
        current[index] = (
          previous[top] + 
          previous[bottom] + 
          previous[left] + 
          previous[right]
        ) / 2 - current[index];
        
        // Apply damping
        current[index] *= damping;
      }
    }
    
    // Swap buffers
    [current, previous] = [previous, current];
  }
  
  // Draw ripple
  function drawRipple() {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const index = j * width + i;
        const pixelIndex = (j * width + i) * 4;
        
        // Calculate pixel offset for refraction
        const xOffset = Math.floor(previous[index] * 2);
        const yOffset = Math.floor(previous[index] * 2);
        
        // Base color (blue water)
        let r = 10;
        let g = 100;
        let b = 200;
        
        // Add ripple effect (lighter where ripple is higher)
        const rippleIntensity = Math.abs(previous[index] * 10);
        r += rippleIntensity;
        g += rippleIntensity;
        b += rippleIntensity;
        
        // Set pixel color
        data[pixelIndex] = r;
        data[pixelIndex + 1] = g;
        data[pixelIndex + 2] = b;
        data[pixelIndex + 3] = 255; // Alpha
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }
  
  function animate() {
    updateRipple();
    drawRipple();
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Create random ripples periodically
  function randomRipple() {
    const x = Math.floor(Math.random() * (width - 4)) + 2;
    const y = Math.floor(Math.random() * (height - 4)) + 2;
    createRipple(x, y, 255);
    
    setTimeout(randomRipple, 2000);
  }
  
  setTimeout(randomRipple, 1000);
  
  // Create ripple on click
  canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    
    createRipple(x, y, 255);
  });
  
  // Create ripple on move with pressed mouse
  canvas.addEventListener('mousemove', function(e) {
    if (e.buttons === 1) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      
      createRipple(x, y, 100);
    }
  });
  
  // Controls
  const dampingBtn = document.getElementById('ripple-damping');
  const resetBtn = document.getElementById('ripple-reset');
  
  if (dampingBtn) {
    dampingBtn.addEventListener('click', function() {
      damping = damping > 0.95 ? 0.8 : damping + 0.05;
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      current.fill(0);
      previous.fill(0);
    });
  }
}
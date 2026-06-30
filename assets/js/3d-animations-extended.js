/**
 * Extended 3D Animations JavaScript
 * This file contains the implementation for the advanced 3D animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all the extended animations
  initText3D();
  initHologram();
  initDnaHelix();
  initFloatingIslands();
  initNeonGlow();
  initParticleWave();
  initGeometricMorph();
  initGalaxySimulation();
  initFluidSimulation();
  initTerrainGenerator();
});

// 3D Text Animation
function initText3D() {
  const text3D = document.querySelector('#text-3d-animation .text-3d');
  if (!text3D) return;
  
  const colorBtn = document.getElementById('text-3d-color');
  const speedBtn = document.getElementById('text-3d-speed');
  
  if (colorBtn) {
    colorBtn.addEventListener('click', function() {
      const colors = ['var(--primary)', '#ff4757', '#2ed573', '#ffa502', '#7bed9f', '#70a1ff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      text3D.style.color = randomColor;
    });
  }
  
  if (speedBtn) {
    speedBtn.addEventListener('click', function() {
      const currentAnimation = window.getComputedStyle(text3D).animationDuration;
      const currentSpeed = parseFloat(currentAnimation);
      const newSpeed = currentSpeed > 3 ? 2 : currentSpeed + 1;
      text3D.style.animationDuration = `${newSpeed}s`;
    });
  }
}

// Hologram Effect
function initHologram() {
  const hologramContent = document.querySelector('#hologram-effect .hologram-content');
  if (!hologramContent) return;
  
  const intensityBtn = document.getElementById('hologram-intensity');
  const sizeBtn = document.getElementById('hologram-size');
  
  if (intensityBtn) {
    intensityBtn.addEventListener('click', function() {
      const currentOpacity = window.getComputedStyle(hologramContent, '::before').opacity || 0.5;
      const newOpacity = currentOpacity < 0.9 ? parseFloat(currentOpacity) + 0.2 : 0.3;
      document.documentElement.style.setProperty('--hologram-opacity', newOpacity);
    });
  }
  
  if (sizeBtn) {
    sizeBtn.addEventListener('click', function() {
      const currentSize = parseInt(window.getComputedStyle(hologramContent).width) || 150;
      const newSize = currentSize < 200 ? currentSize + 20 : 100;
      hologramContent.style.width = `${newSize}px`;
      hologramContent.style.height = `${newSize}px`;
    });
  }
}

// DNA Helix
function initDnaHelix() {
  const dnaStrand = document.querySelector('#dna-helix .dna-strand');
  if (!dnaStrand) return;
  
  const rotationBtn = document.getElementById('dna-rotation');
  const colorBtn = document.getElementById('dna-color');
  
  if (rotationBtn) {
    rotationBtn.addEventListener('click', function() {
      const currentAnimation = window.getComputedStyle(dnaStrand).animationDuration;
      const currentSpeed = parseFloat(currentAnimation);
      const newSpeed = currentSpeed > 5 ? 3 : currentSpeed + 2;
      dnaStrand.style.animationDuration = `${newSpeed}s`;
    });
  }
  
  if (colorBtn) {
    colorBtn.addEventListener('click', function() {
      const colors = ['var(--primary)', '#ff4757', '#2ed573', '#ffa502', '#7bed9f', '#70a1ff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const dnaElements = document.querySelectorAll('#dna-helix .dna-left, #dna-helix .dna-right');
      dnaElements.forEach(element => {
        element.style.background = randomColor;
        element.style.boxShadow = `0 0 10px ${randomColor}`;
      });
      
      const dnaConnections = document.querySelectorAll('#dna-helix .dna-connection');
      dnaConnections.forEach(element => {
        element.style.background = `${randomColor}80`; // 50% opacity
      });
    });
  }
}

// Floating Islands
function initFloatingIslands() {
  const floatingIslands = document.querySelector('#floating-islands .floating-islands');
  if (!floatingIslands) return;
  
  const addIslandBtn = document.getElementById('islands-add');
  const weatherBtn = document.getElementById('islands-weather');
  
  if (addIslandBtn) {
    addIslandBtn.addEventListener('click', function() {
      const islands = floatingIslands.querySelectorAll('.island');
      if (islands.length < 6) {
        const newIsland = document.createElement('div');
        newIsland.className = 'island';
        newIsland.style.top = `${Math.random() * 70 + 10}%`;
        newIsland.style.left = `${Math.random() * 70 + 10}%`;
        newIsland.style.animation = `floatIsland ${Math.random() * 3 + 6}s ease-in-out infinite ${Math.random() * 2}s`;
        floatingIslands.appendChild(newIsland);
      } else {
        // Remove all islands except the first three
        const extraIslands = Array.from(islands).slice(3);
        extraIslands.forEach(island => island.remove());
      }
    });
  }
  
  if (weatherBtn) {
    weatherBtn.addEventListener('click', function() {
      const hasRain = floatingIslands.classList.contains('rainy');
      if (hasRain) {
        floatingIslands.classList.remove('rainy');
        floatingIslands.classList.add('sunny');
        weatherBtn.textContent = 'Make Rainy';
      } else {
        floatingIslands.classList.remove('sunny');
        floatingIslands.classList.add('rainy');
        weatherBtn.textContent = 'Make Sunny';
      }
    });
  }
}

// Neon Glow
function initNeonGlow() {
  const neonText = document.querySelector('#neon-glow .neon-text');
  if (!neonText) return;
  
  const textBtn = document.getElementById('neon-text');
  const colorBtn = document.getElementById('neon-color');
  
  const texts = ['GLOW', 'MY TIME', 'NEON', 'SHINE', 'BRIGHT'];
  let currentTextIndex = 0;
  
  if (textBtn) {
    textBtn.addEventListener('click', function() {
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      neonText.textContent = texts[currentTextIndex];
    });
  }
  
  if (colorBtn) {
    colorBtn.addEventListener('click', function() {
      const colors = ['#0A84FF', '#ff4757', '#2ed573', '#ffa502', '#7bed9f', '#70a1ff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      neonText.style.textShadow = `
        0 0 5px ${randomColor},
        0 0 10px ${randomColor},
        0 0 20px ${randomColor},
        0 0 40px ${randomColor}
      `;
    });
  }
}

// Particle Wave
function initParticleWave() {
  const canvas = document.getElementById('wave-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  let amplitude = 50;
  let frequency = 0.02;
  
  // Create particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height / 2,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      color: '#0A84FF'
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      
      // Wave motion
      p.y = canvas.height / 2 + Math.sin(p.x * frequency) * amplitude;
      
      // Reset position if out of bounds
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Controls
  const amplitudeBtn = document.getElementById('wave-amplitude');
  const frequencyBtn = document.getElementById('wave-frequency');
  
  if (amplitudeBtn) {
    amplitudeBtn.addEventListener('click', function() {
      amplitude = amplitude >= 80 ? 20 : amplitude + 15;
    });
  }
  
  if (frequencyBtn) {
    frequencyBtn.addEventListener('click', function() {
      frequency = frequency >= 0.05 ? 0.01 : frequency + 0.01;
    });
  }
}

// Geometric Morphing
function initGeometricMorph() {
  const canvas = document.getElementById('morph-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let currentShape = 0;
  let morphProgress = 0;
  let morphSpeed = 0.01;
  
  // Define shapes (vertices for different polygons)
  const shapes = [
    // Circle (approximated by many points)
    Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * Math.PI * 2;
      return { x: Math.cos(angle), y: Math.sin(angle) };
    }),
    // Square
    [
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 }
    ],
    // Triangle
    [
      { x: 0, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: 1 }
    ],
    // Star
    Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2;
      const radius = i % 2 === 0 ? 1 : 0.5;
      return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
    })
  ];
  
  function interpolateShapes(shapeA, shapeB, progress) {
    // If shapes have different number of points, use the smaller count
    const pointCount = Math.min(shapeA.length, shapeB.length);
    const result = [];
    
    for (let i = 0; i < pointCount; i++) {
      result.push({
        x: shapeA[i].x * (1 - progress) + shapeB[i].x * progress,
        y: shapeA[i].y * (1 - progress) + shapeB[i].y * progress
      });
    }
    
    return result;
  }
  
  function drawShape(points, scale = 100, offsetX = canvas.width / 2, offsetY = canvas.height / 2) {
    ctx.beginPath();
    ctx.moveTo(points[0].x * scale + offsetX, points[0].y * scale + offsetY);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x * scale + offsetX, points[i].y * scale + offsetY);
    }
    
    ctx.closePath();
    ctx.fillStyle = '#0A84FF';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate next and current shape indices
    const nextShape = (currentShape + 1) % shapes.length;
    
    // Interpolate between current shape and next shape
    const morphedShape = interpolateShapes(shapes[currentShape], shapes[nextShape], morphProgress);
    
    // Draw the morphed shape
    drawShape(morphedShape);
    
    // Update morph progress
    morphProgress += morphSpeed;
    
    // If morphing is complete, move to next shape
    if (morphProgress >= 1) {
      morphProgress = 0;
      currentShape = nextShape;
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Controls
  const shapeBtn = document.getElementById('morph-shape');
  const speedBtn = document.getElementById('morph-speed');
  
  if (shapeBtn) {
    shapeBtn.addEventListener('click', function() {
      // Skip to next shape
      currentShape = (currentShape + 1) % shapes.length;
      morphProgress = 0;
    });
  }
  
  if (speedBtn) {
    speedBtn.addEventListener('click', function() {
      morphSpeed = morphSpeed >= 0.03 ? 0.005 : morphSpeed + 0.005;
    });
  }
}

// Galaxy Simulation
function initGalaxySimulation() {
  const canvas = document.getElementById('galaxy-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const stars = [];
  let rotationSpeed = 0.001;
  let zoom = 1;
  
  // Create stars
  for (let i = 0; i < 1000; i++) {
    // Polar coordinates for spiral distribution
    const distance = Math.random() * 100 + 5;
    const angle = Math.random() * Math.PI * 2;
    const spiralFactor = Math.random() * 0.1;
    
    stars.push({
      distance: distance,
      angle: angle,
      spiralFactor: spiralFactor,
      size: Math.random() * 1.5 + 0.5,
      brightness: Math.random() * 0.8 + 0.2,
      color: `hsl(${Math.random() * 60 + 200}, 80%, 70%)`
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw galaxy core
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20 * zoom);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(70, 120, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20 * zoom, 0, Math.PI * 2);
    ctx.fill();
    
    // Update and draw stars
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      
      // Update angle for rotation
      star.angle += rotationSpeed * (1 / (star.distance / 30));
      
      // Calculate position
      const spiralAngle = star.angle + star.distance * star.spiralFactor;
      const x = centerX + Math.cos(spiralAngle) * star.distance * zoom;
      const y = centerY + Math.sin(spiralAngle) * star.distance * zoom;
      
      // Skip if outside canvas
      if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) continue;
      
      // Draw star
      ctx.globalAlpha = star.brightness;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(x, y, star.size * zoom, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Controls
  const zoomBtn = document.getElementById('galaxy-zoom');
  const rotationBtn = document.getElementById('galaxy-rotation');
  
  if (zoomBtn) {
    zoomBtn.addEventListener('click', function() {
      zoom = zoom >= 1.5 ? 0.5 : zoom + 0.25;
    });
  }
  
  if (rotationBtn) {
    rotationBtn.addEventListener('click', function() {
      rotationSpeed = rotationSpeed >= 0.003 ? 0.0005 : rotationSpeed + 0.0005;
    });
  }
}

// Fluid Simulation
function initFluidSimulation() {
  const canvas = document.getElementById('fluid-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  let viscosity = 0.98;
  let particleColor = '#0A84FF';
  
  // Create particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      size: Math.random() * 4 + 2
    });
  }
  
  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let mouseForce = false;
  
  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  
  canvas.addEventListener('mousedown', function() {
    mouseForce = true;
  });
  
  canvas.addEventListener('mouseup', function() {
    mouseForce = false;
  });
  
  canvas.addEventListener('mouseleave', function() {
    mouseForce = false;
  });
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Apply mouse force
      if (mouseForce) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) {
          const force = (50 - distance) / 50;
          p.vx += dx * force * 0.2;
          p.vy += dy * force * 0.2;
        }
      }
      
      // Apply viscosity
      p.vx *= viscosity;
      p.vy *= viscosity;
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Boundary conditions
      if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
      if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -0.5; }
      if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
      if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -0.5; }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Controls
  const viscosityBtn = document.getElementById('fluid-viscosity');
  const colorBtn = document.getElementById('fluid-color');
  
  if (viscosityBtn) {
    viscosityBtn.addEventListener('click', function() {
      viscosity = viscosity > 0.95 ? 0.8 : viscosity + 0.05;
    });
  }
  
  if (colorBtn) {
    colorBtn.addEventListener('click', function() {
      const colors = ['#0A84FF', '#ff4757', '#2ed573', '#ffa502', '#7bed9f', '#70a1ff'];
      particleColor = colors[Math.floor(Math.random() * colors.length)];
    });
  }
}

// Terrain Generator
function initTerrainGenerator() {
  const canvas = document.getElementById('terrain-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let heightMap = [];
  let heightScale = 50;
  
  // Generate terrain using Perlin-like noise
  function generateTerrain() {
    heightMap = [];
    const width = canvas.width;
    const segments = 100;
    const segmentWidth = width / segments;
    
    // Generate random heights
    for (let i = 0; i <= segments; i++) {
      heightMap.push(Math.random());
    }
    
    // Smooth the heights
    for (let i = 0; i < 5; i++) { // Apply smoothing multiple times
      const smoothed = [heightMap[0]];
      for (let j = 1; j < heightMap.length - 1; j++) {
        smoothed.push((heightMap[j-1] + heightMap[j] * 2 + heightMap[j+1]) / 4);
      }
      smoothed.push(heightMap[heightMap.length - 1]);
      heightMap = smoothed;
    }
    
    // Draw the terrain
    drawTerrain();
  }
  
  function drawTerrain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    const segments = heightMap.length - 1;
    const segmentWidth = width / segments;
    
    // Sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height / 2);
    skyGradient.addColorStop(0, '#1a2980');
    skyGradient.addColorStop(1, '#26d0ce');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height / 2);
    
    // Draw terrain
    ctx.beginPath();
    ctx.moveTo(0, height - heightMap[0] * heightScale);
    
    for (let i = 1; i <= segments; i++) {
      ctx.lineTo(i * segmentWidth, height - heightMap[i] * heightScale);
    }
    
    // Complete the shape
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    // Fill with gradient
    const terrainGradient = ctx.createLinearGradient(0, height / 2, 0, height);
    terrainGradient.addColorStop(0, '#4CAF50');
    terrainGradient.addColorStop(0.7, '#8B4513');
    terrainGradient.addColorStop(1, '#5D4037');
    ctx.fillStyle = terrainGradient;
    ctx.fill();
    
    // Add some detail lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Add sun
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.2, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#FFC107';
    ctx.fill();
    
    // Add sun glow
    const sunGlow = ctx.createRadialGradient(width * 0.8, height * 0.2, 30, width * 0.8, height * 0.2, 60);
    sunGlow.addColorStop(0, 'rgba(255, 193, 7, 0.5)');
    sunGlow.addColorStop(1, 'rgba(255, 193, 7, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.2, 60, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Initial generation
  generateTerrain();
  
  // Controls
  const generateBtn = document.getElementById('terrain-generate');
  const heightBtn = document.getElementById('terrain-height');
  
  if (generateBtn) {
    generateBtn.addEventListener('click', generateTerrain);
  }
  
  if (heightBtn) {
    heightBtn.addEventListener('click', function() {
      heightScale = heightScale >= 100 ? 30 : heightScale + 20;
      drawTerrain();
    });
  }
}
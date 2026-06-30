// 3D Animations Final Set

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animations
  initLiquidMetal();
  initFireSimulation();
  initClockworkMechanism();
  initNeuralNetwork();
  initPortalEffect();
});

// Liquid Metal Animation
function initLiquidMetal() {
  const canvas = document.getElementById('liquid-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let metalColor = '#c0c0c0';
  
  // Create initial particles
  function createParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 2,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
      });
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#333');
    gradient.addColorStop(1, '#111');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Bounce off walls
      if (p.x < p.radius || p.x > canvas.width - p.radius) {
        p.vx *= -1;
      }
      if (p.y < p.radius || p.y > canvas.height - p.radius) {
        p.vy *= -1;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = metalColor;
      ctx.fill();
      
      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = metalColor + Math.floor((1 - distance / 50) * 99).toString(16);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  // Initialize
  createParticles();
  animate();
  
  // Controls
  const resetBtn = document.getElementById('liquid-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', createParticles);
  }
  
  const colorBtn = document.getElementById('liquid-color');
  if (colorBtn) {
    colorBtn.addEventListener('click', () => {
      const colors = ['#c0c0c0', '#FFD700', '#C0C0C0', '#B87333'];
      metalColor = colors[Math.floor(Math.random() * colors.length)];
    });
  }
}

// Fire Simulation
function initFireSimulation() {
  const canvas = document.getElementById('fire-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  let fireIntensity = 3;
  
  // Create fire particles
  let particles = [];
  function createParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 3 + 1,
        lifetime: Math.random() * 100 + 50,
        age: 0
      });
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    
    // Add new particles at the bottom
    for (let i = 0; i < fireIntensity; i++) {
      particles.push({
        x: Math.random() * width,
        y: height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 3 + 1,
        lifetime: Math.random() * 100 + 50,
        age: 0
      });
    }
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Update position and age
      p.y -= p.speed;
      p.x += Math.sin(p.age / 10) * 0.5;
      p.age++;
      
      // Remove old particles
      if (p.age > p.lifetime || p.y < 0) {
        particles.splice(i, 1);
        i--;
        continue;
      }
      
      // Calculate color based on age
      const lifeRatio = p.age / p.lifetime;
      let r, g, b;
      if (lifeRatio < 0.3) {
        // Yellow to orange
        r = 255;
        g = Math.floor(255 * (1 - lifeRatio / 0.3));
        b = 0;
      } else if (lifeRatio < 0.6) {
        // Orange to red
        r = 255;
        g = Math.floor(255 * (1 - (lifeRatio - 0.3) / 0.3));
        b = 0;
      } else {
        // Red to dark red
        r = Math.floor(255 * (1 - (lifeRatio - 0.6) / 0.4));
        g = 0;
        b = 0;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - lifeRatio), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${1 - lifeRatio})`;
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  // Initialize
  createParticles();
  animate();
  
  // Controls
  const intensityBtn = document.getElementById('fire-intensity');
  if (intensityBtn) {
    intensityBtn.addEventListener('click', () => {
      fireIntensity = (fireIntensity % 5) + 1;
    });
  }
  
  const resetBtn = document.getElementById('fire-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', createParticles);
  }
}

// Clockwork Mechanism
function initClockworkMechanism() {
  const canvas = document.getElementById('clockwork-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  let rotation = 0;
  let speed = 1;
  
  // Draw gear
  function drawGear(x, y, radius, teeth, toothSize, rotation, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    // Draw gear body
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw gear teeth
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const innerX = (radius - toothSize / 2) * Math.cos(angle);
      const innerY = (radius - toothSize / 2) * Math.sin(angle);
      const outerX = (radius + toothSize / 2) * Math.cos(angle);
      const outerY = (radius + toothSize / 2) * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    
    // Draw center hole
    ctx.beginPath();
    ctx.arc(0, 0, radius / 5, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    
    ctx.restore();
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update rotation
    rotation += 0.01 * speed;
    
    // Draw main gear
    drawGear(centerX, centerY, 50, 12, 15, rotation, '#b87333');
    
    // Draw secondary gears
    drawGear(centerX + 85, centerY, 35, 8, 10, -rotation * 50/35, '#c0c0c0');
    drawGear(centerX - 85, centerY, 35, 8, 10, -rotation * 50/35, '#c0c0c0');
    drawGear(centerX, centerY + 85, 35, 8, 10, -rotation * 50/35, '#c0c0c0');
    drawGear(centerX, centerY - 85, 35, 8, 10, -rotation * 50/35, '#c0c0c0');
    
    requestAnimationFrame(animate);
  }
  
  // Initialize
  animate();
  
  // Controls
  const speedBtn = document.getElementById('clockwork-speed');
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      speed = (speed % 3) + 1;
    });
  }
  
  const reverseBtn = document.getElementById('clockwork-reverse');
  if (reverseBtn) {
    reverseBtn.addEventListener('click', () => {
      speed *= -1;
    });
  }
}

// Neural Network Visualization
function initNeuralNetwork() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // Network structure
  const layers = [4, 6, 6, 4];
  const neurons = [];
  let activeNeurons = new Set();
  let animationSpeed = 1;
  
  // Create neurons
  function createNeurons() {
    neurons.length = 0;
    activeNeurons.clear();
    
    const layerSpacing = width / (layers.length + 1);
    
    for (let l = 0; l < layers.length; l++) {
      const layerSize = layers[l];
      const neuronSpacing = height / (layerSize + 1);
      
      for (let n = 0; n < layerSize; n++) {
        neurons.push({
          x: layerSpacing * (l + 1),
          y: neuronSpacing * (n + 1),
          layer: l,
          index: n,
          active: false,
          connections: []
        });
      }
    }
    
    // Create connections between layers
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerNeurons = neurons.filter(n => n.layer === l);
      const nextLayerNeurons = neurons.filter(n => n.layer === l + 1);
      
      for (const neuron of currentLayerNeurons) {
        for (const nextNeuron of nextLayerNeurons) {
          neuron.connections.push(nextNeuron);
        }
      }
    }
  }
  
  // Activate random neuron in first layer
  function activateRandomNeuron() {
    const firstLayerNeurons = neurons.filter(n => n.layer === 0);
    const randomNeuron = firstLayerNeurons[Math.floor(Math.random() * firstLayerNeurons.length)];
    activeNeurons.add(randomNeuron);
    
    // Schedule propagation
    setTimeout(() => propagateSignal(randomNeuron), 500 / animationSpeed);
  }
  
  // Propagate signal through network
  function propagateSignal(neuron) {
    for (const connection of neuron.connections) {
      if (Math.random() > 0.3) { // 70% chance to propagate
        activeNeurons.add(connection);
        setTimeout(() => propagateSignal(connection), 500 / animationSpeed);
      }
    }
    
    // Remove activation after a delay
    setTimeout(() => {
      activeNeurons.delete(neuron);
    }, 1000 / animationSpeed);
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    
    // Draw connections
    for (const neuron of neurons) {
      for (const connection of neuron.connections) {
        ctx.beginPath();
        ctx.moveTo(neuron.x, neuron.y);
        ctx.lineTo(connection.x, connection.y);
        
        if (activeNeurons.has(neuron) && activeNeurons.has(connection)) {
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 1;
        }
        
        ctx.stroke();
      }
    }
    
    // Draw neurons
    for (const neuron of neurons) {
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, 5, 0, Math.PI * 2);
      
      if (activeNeurons.has(neuron)) {
        ctx.fillStyle = '#00ff00';
      } else {
        ctx.fillStyle = '#666';
      }
      
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  // Initialize
  createNeurons();
  animate();
  
  // Periodically activate neurons
  setInterval(activateRandomNeuron, 2000 / animationSpeed);
  
  // Controls
  const speedBtn = document.getElementById('neural-speed');
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      animationSpeed = (animationSpeed % 3) + 1;
    });
  }
  
  const resetBtn = document.getElementById('neural-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      createNeurons();
    });
  }
}

// Portal Effect
function initPortalEffect() {
  const canvas = document.getElementById('portal-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  let time = 0;
  let portalColor = '#4b0082';
  let portalSize = 0.8;
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    const bgGradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, width / 2
    );
    bgGradient.addColorStop(0, '#000');
    bgGradient.addColorStop(1, '#111');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Update time
    time += 0.02;
    
    // Draw portal rings
    const maxRings = 10;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 * portalSize;
    
    for (let i = 0; i < maxRings; i++) {
      const progress = i / maxRings;
      const thickness = 5 * (1 - progress);
      const radius = maxRadius * progress;
      const waveOffset = Math.sin(time + progress * Math.PI * 2) * 5;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + waveOffset, 0, Math.PI * 2);
      ctx.strokeStyle = portalColor;
      ctx.lineWidth = thickness;
      ctx.stroke();
    }
    
    // Draw swirling particles
    const particles = 50;
    for (let i = 0; i < particles; i++) {
      const angle = (i / particles) * Math.PI * 2 + time;
      const distance = (0.2 + 0.8 * Math.sin(time * 0.5 + i)) * maxRadius;
      
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = portalColor;
      ctx.fill();
    }
    
    // Draw center glow
    const glowGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, maxRadius * 0.3
    );
    glowGradient.addColorStop(0, portalColor);
    glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();
    
    requestAnimationFrame(animate);
  }
  
  // Initialize
  animate();
  
  // Controls
  const colorBtn = document.getElementById('portal-color');
  if (colorBtn) {
    colorBtn.addEventListener('click', () => {
      const colors = ['#4b0082', '#800080', '#9400d3', '#8a2be2', '#9932cc'];
      portalColor = colors[Math.floor(Math.random() * colors.length)];
    });
  }
  
  const sizeBtn = document.getElementById('portal-size');
  if (sizeBtn) {
    sizeBtn.addEventListener('click', () => {
      portalSize = portalSize === 0.8 ? 1.0 : 0.8;
    });
  }
}
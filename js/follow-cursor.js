/**
 * Follow Cursor Particle System
 * Creates interactive particle effects that follow mouse movement
 */

// Configuration
const CONFIG = {
  MAX_PARTICLES: 50,
  PARTICLE_SPEED: 0.05,
  PARTICLE_SIZE: 3,
  PARTICLE_LIFE: 100,
  COLORS: ['#bd97e0', '#8a2be2', '#ff3dce', '#162c45', '#ffffff']
};

// Global variables
let canvas, ctx;
let particles = [];
let mouse = { x: 0, y: 0 };
let animationId;

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.size = Math.random() * CONFIG.PARTICLE_SIZE + 1;
    this.color = CONFIG.COLORS[Math.floor(Math.random() * CONFIG.COLORS.length)];
    this.life = CONFIG.PARTICLE_LIFE;
    this.maxLife = CONFIG.PARTICLE_LIFE;
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    };
  }

  update() {
    // Move towards mouse position
    this.targetX = mouse.x + (Math.random() - 0.5) * 50;
    this.targetY = mouse.y + (Math.random() - 0.5) * 50;
    
    // Smooth movement towards target
    this.x += (this.targetX - this.x) * CONFIG.PARTICLE_SPEED;
    this.y += (this.targetY - this.y) * CONFIG.PARTICLE_SPEED;
    
    // Add some random movement
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    
    // Decrease life
    this.life--;
    
    // Update velocity for organic movement
    this.velocity.x *= 0.98;
    this.velocity.y *= 0.98;
  }

  draw() {
    const alpha = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isDead() {
    return this.life <= 0;
  }
}

// Mouse tracking (vanilla JavaScript - no jQuery)
function trackMouse() {
  const cursorTracker = document.querySelector('.cursor-tracker');
  
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Update cursor tracker position
    if (cursorTracker) {
      cursorTracker.style.left = mouse.x + 'px';
      cursorTracker.style.top = mouse.y + 'px';
    }
    
    // Create new particles at mouse position
    createParticles(mouse.x, mouse.y, 2);
  });
}

// Create particles
function createParticles(x, y, count = 1) {
  for (let i = 0; i < count; i++) {
    if (particles.length < CONFIG.MAX_PARTICLES) {
      particles.push(new Particle(x, y));
    }
  }
}

// Animation loop
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.update();
    particle.draw();
    
    // Remove dead particles
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
  
  animationId = requestAnimationFrame(animate);
}

// Initialize canvas
function initCanvas() {
  canvas = document.querySelector('canvas');
  if (!canvas) {
    console.error('Canvas element not found');
    return false;
  }
  
  ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  return true;
}

// Initialize the application
function init() {
  if (!initCanvas()) return;
  
  trackMouse();
  animate();
  
  // Create some initial particles
  createParticles(window.innerWidth / 2, window.innerHeight / 2, 10);
}

// Cleanup function
function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}

// Start when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);

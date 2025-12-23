// Module script with canvas particle background, theme toggle, smooth scrolling, and small helpers.
const canvas = document.getElementById('bgCanvas');
const ctx = canvas && canvas.getContext && canvas.getContext('2d');
let particles = [];
const config = { count: 60, maxSize: 3.2, speed: 0.2, hueA: 260, hueB: 190 };

function resize() {
  if (!canvas) return;
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
}
function rand(min, max) { return Math.random() * (max - min) + min; }

function createParticles() {
  particles = [];
  const w = canvas.clientWidth, h = canvas.clientHeight;
  for (let i = 0; i < config.count; i++) {
    particles.push({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.6, config.maxSize),
      vx: rand(-config.speed, config.speed),
      vy: rand(-config.speed, config.speed),
      hue: rand(config.hueA, config.hueB),
      alpha: rand(0.12, 0.6)
    });
  }
}

function draw() {
  if (!ctx) return;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  // soft vignette
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, 'rgba(8,10,15,0.0)');
  grad.addColorStop(1, 'rgba(2,4,8,0.10)');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,w,h);

  // draw particles
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -10) p.x = w + 10;
    if (p.x > w + 10) p.x = -10;
    if (p.y < -10) p.y = h + 10;
    if (p.y > h + 10) p.y = -10;

    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${p.alpha})`;
    ctx.shadowColor = `hsla(${p.hue}, 90%, 55%, ${p.alpha})`;
    ctx.shadowBlur = 8;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // draw connecting lines for nearby particles
  for (let i=0;i<particles.length;i++){
    for (let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124,92,255,${Math.max(0, 0.12 - d/500)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

// Initialize canvas and particles
function initCanvas() {
  if (!canvas || !ctx) return;
  resize();
  createParticles();
  draw();
}
window.addEventListener('resize', () => {
  resize();
});

// Theme toggle (simple; stores preference)
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const stored = localStorage.getItem('pref-theme');
  if (stored === 'light') document.documentElement.style.colorScheme = 'light';
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.style.colorScheme === 'light';
    if (isLight) {
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('pref-theme','dark');
      themeToggle.setAttribute('aria-pressed','false');
    } else {
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('pref-theme','light');
      themeToggle.setAttribute('aria-pressed','true');
    }
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth',block:'start'});
      el.focus({preventScroll:true});
    }
  });
});

// Set dynamic year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Respect reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // reduce particle count and skip animations
  config.count = 12;
  config.speed = 0.05;
}

initCanvas();

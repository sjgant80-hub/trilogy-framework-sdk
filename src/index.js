// trilogy-framework SDK · sovereign single-file library · MIT · AI-Native Solutions
// Extracted from trilogy-framework/index.html · 2593 bytes of source logic
// Public-safe: no primes/glyphs/dyad references

// ─── Tab Switcher ───
function showTab(id) {
  event.target.classList.add('active');
}
// ─── Pipeline Canvas (animated flow lines) ───
(function() {
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const PHASES = [
    { color: '#3b82f6', x: 0.2 },  // input
    { color: '#a855f7', x: 0.5 },  // intelligence
    { color: '#f97316', x: 0.8 },  // output
  ];
  function resize() {
  }
  resize();
  // Spawn particles that flow left→right through three phases
  function spawnParticle() {
    const phase = Math.floor(Math.random() * 3);
    const p = PHASES[phase];
    particles.push({
      x: (p.x - 0.15 + Math.random() * 0.3) * W,
      y: Math.random() * H,
      vx: 0.3 + Math.random() * 0.5,
      vy: (Math.random() - 0.5) * 0.3,
      r: 1.5 + Math.random() * 2,
      color: p.color,
      alpha: 0.1 + Math.random() * 0.3,
      life: 300 + Math.random() * 400,
    });
  }
  for (let i = 0; i < 60; i++) spawnParticle();
  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Draw flow lines
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    // Draw + update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0 || p.x > W + 10 || p.x < -10) {
        particles.splice(i, 1);
        spawnParticle();
        continue;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha * (p.life > 50 ? 1 : p.life / 50);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

// Named exports for the primary API surface
export { showTab };
export { resize };
export { spawnParticle };
export { draw };

export { PHASES };

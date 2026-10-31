(() => {
  // WebGL check -> static gradient fallback
  const ok = (() => { try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; } })();
  if (!ok) document.documentElement.classList.add('no-webgl');
  // if the 3D room never finishes loading (see room.js), keep the static fallback visible
  if (ok) setTimeout(() => { if (!document.documentElement.classList.contains('room-ready')) document.documentElement.classList.add('no-webgl'); }, 25000);
  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));
})();

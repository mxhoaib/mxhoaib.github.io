(() => {
  // WebGL check -> static gradient fallback
  const ok = (() => { try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; } })();
  if (!ok) document.documentElement.classList.add('no-webgl');
  const v = document.querySelector('spline-viewer');
  if (v) {
    v.addEventListener('error', () => document.documentElement.classList.add('no-webgl'));
    // if the scene never produces a canvas, keep the fallback visible
    setTimeout(() => { if (!(v.shadowRoot && v.shadowRoot.querySelector('canvas'))) document.documentElement.classList.add('no-webgl'); }, 20000);
  }
  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));
})();

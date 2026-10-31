// Hero 3D interior: furnished living/dining room Spline scene, loaded with the Spline runtime
// so we can hide the scene's original title text and match the site's dark background.
import { Application } from 'https://unpkg.com/@splinetool/runtime@2.0.126/build/runtime.js';

const root = document.documentElement;
const canvas = document.getElementById('room3d');
if (canvas && !root.classList.contains('no-webgl')) {
  const app = new Application(canvas);
  const mq = window.matchMedia('(max-width:860px)');
  const fit = () => app.setZoom(mq.matches ? 0.32 : 0.7);
  app.load(canvas.dataset.scene).then(() => {
    // remove the original project's floor lettering, keep only the room
    app.getAllObjects().filter(o => /^Text/.test(o.name)).forEach(o => { o.visible = false; });
    app.setBackgroundColor('rgba(5,5,5,0)');
    fit();
    mq.addEventListener ? mq.addEventListener('change', fit) : mq.addListener(fit);
    requestAnimationFrame(() => root.classList.add('room-ready'));
  }).catch(() => root.classList.add('no-webgl'));
}

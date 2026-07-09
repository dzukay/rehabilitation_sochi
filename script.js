// ===== Аккордеон секции «Осложнения» =====
document.querySelectorAll('.acc-item').forEach((item) => {
  const head = item.querySelector('.acc-head');
  head.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach((o) => {
      o.classList.remove('open');
      o.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      head.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== Слайдер «Как проходит реабилитация» =====
(() => {
  const track = document.getElementById('how-track');
  const prev = document.getElementById('how-prev');
  const next = document.getElementById('how-next');
  if (!track || !prev || !next) return;
  const total = track.children.length;
  let idx = 0;
  const update = () => {
    track.style.transform = `translateX(-${idx * 100}%)`;
    prev.disabled = idx === 0;
    next.disabled = idx === total - 1;
  };
  prev.addEventListener('click', () => { if (idx > 0) { idx--; update(); } });
  next.addEventListener('click', () => { if (idx < total - 1) { idx++; update(); } });
  // свайп на мобильном
  let startX = null;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx < -40 && idx < total - 1) { idx++; update(); }
    else if (dx > 40 && idx > 0) { idx--; update(); }
    startX = null;
  }, { passive: true });
  update();
})();

// ===== Параллакс героя (как в оригинале) =====
(() => {
  const art = document.querySelector('.hero-art');
  if (!art || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  art.style.willChange = 'transform';
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 2) {
      art.style.transform = `translateY(${y * 0.35}px)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
})();


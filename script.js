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

// ===== Появление блоков при скролле =====
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
  els.forEach((el) => io.observe(el));
})();

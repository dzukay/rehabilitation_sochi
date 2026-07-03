// Аккордеон секции «Осложнения»
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

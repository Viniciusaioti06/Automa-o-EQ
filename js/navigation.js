(() => {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const top = document.getElementById('backTop');
  const mobileQuery = window.matchMedia('(max-width: 980px)');

  const setMenu = (open) => {
    if (!header || !toggle || !nav) return;
    header.classList.toggle('menu-open', open);
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.documentElement.classList.toggle('menu-locked', open);
    document.body.classList.toggle('menu-locked', open);
  };

  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 30);
    top?.classList.toggle('is-visible', window.scrollY > 600);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));

  nav?.querySelectorAll('a').forEach((link, index) => {
    if (!link.classList.contains('button')) link.dataset.index = String(index + 1).padStart(2, '0');
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) setMenu(false);
  });

  mobileQuery.addEventListener?.('change', (event) => {
    if (!event.matches) setMenu(false);
  });

  top?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

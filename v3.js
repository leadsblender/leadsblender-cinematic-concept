(() => {
  const elements = [...document.querySelectorAll('.reveal')];
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, {rootMargin: '0px 0px -6% 0px', threshold: 0.06});
    elements.forEach(el => observer.observe(el));
  }
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  navLinks.forEach(link => link.addEventListener('click', () => {
    navLinks.forEach(other => other.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'location');
  }));

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function activateTab(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activateTab(tabs[next], true); }
    });
  });

  const viewer = document.querySelector('.image-viewer');
  const image = document.getElementById('viewer-image');
  const caption = document.getElementById('viewer-caption');
  let opener;
  document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    image.src = button.dataset.zoom;
    image.alt = button.querySelector('img').alt;
    caption.textContent = button.dataset.caption;
    viewer.showModal();
    document.body.classList.add('viewer-open');
    viewer.querySelector('.image-viewer__scroll').scrollTo(0, 0);
  }));
  viewer.querySelector('.image-viewer__close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    if (opener) opener.focus({preventScroll:true});
  });
})();

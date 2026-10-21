(() => {
  const elements = [...document.querySelectorAll('.reveal')];
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, {rootMargin: '0px 0px -6% 0px', threshold: 0.06});
    elements.forEach(el => observer.observe(el));
  }
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  navLinks.forEach(link => link.addEventListener('click', () => {
    navLinks.forEach(other => other.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'location');
  }));
})();

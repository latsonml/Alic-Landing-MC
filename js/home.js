import { initReveal } from './reveal.js';

initReveal();

document.querySelectorAll('.option').forEach((opt) => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.option').forEach((o) => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

function initCaseCarousel() {
  const carousel = document.querySelector('[data-case-carousel]');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-case-slide]')];
  const dots = [...carousel.querySelectorAll('[data-case-dot]')];
  if (slides.length < 2) return;

  let current = 0;
  let timer;
  const delay = 6000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  const next = () => show(current + 1);

  const restartTimer = () => {
    clearInterval(timer);
    if (!prefersReducedMotion) {
      timer = setInterval(next, delay);
    }
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      restartTimer();
    });
  });

  show(0);
  restartTimer();
}

initCaseCarousel();

function initTrustedCarousel() {
  const carousel = document.querySelector('[data-trusted-carousel]');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-trusted-slide]')];
  const dots = [...carousel.querySelectorAll('[data-trusted-dot]')];
  if (slides.length < 2) return;

  let current = 0;
  let timer;
  const delay = 5000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  const next = () => show(current + 1);

  const restartTimer = () => {
    clearInterval(timer);
    if (!prefersReducedMotion) {
      timer = setInterval(next, delay);
    }
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      restartTimer();
    });
  });

  show(0);
  restartTimer();
}

initTrustedCarousel();

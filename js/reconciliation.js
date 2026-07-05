import { initReveal } from './reveal.js';
import { initCensorChars } from './censor-chars.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function fmt(n) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    if (prefersReducedMotion) {
      el.textContent = prefix + fmt(target);
      return;
    }
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = prefix + fmt(Math.round(proxy.val));
      },
    });
  });
}

initReveal();
initCensorChars();
initCounters();

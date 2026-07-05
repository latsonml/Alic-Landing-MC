import gsap from 'gsap';

const CENSOR_CHARS = '!@#$%^&*';

export function initCensorChars() {
  const slots = document.querySelectorAll('.censor-char');
  if (!slots.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slots.forEach((slot, i) => {
    let idx = i % CENSOR_CHARS.length;
    slot.textContent = CENSOR_CHARS[idx];

    if (prefersReducedMotion) return;

    const cycle = () => {
      idx = (idx + 1) % CENSOR_CHARS.length;
      gsap.fromTo(
        slot,
        { y: -12, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.14,
          ease: 'power2.out',
          onStart: () => {
            slot.textContent = CENSOR_CHARS[idx];
          },
        }
      );
    };

    gsap.delayedCall(0.6 + i * 0.35, function tick() {
      cycle();
      gsap.delayedCall(0.16 + Math.random() * 0.08, tick);
    });
  });
}

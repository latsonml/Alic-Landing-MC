import { initReveal } from './reveal.js';

initReveal();

document.querySelectorAll('.plan-card .option').forEach((opt) => {
  opt.addEventListener('click', () => {
    const card = opt.closest('.plan-card');
    if (!card) return;
    card.querySelectorAll('.option').forEach((o) => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

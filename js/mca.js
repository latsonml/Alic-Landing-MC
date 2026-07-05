import { initReveal } from './reveal.js';
import { initCensorChars } from './censor-chars.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function fmt(n) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function parseAdvance(str) {
  return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0;
}

function paintSlider(input) {
  const pct =
    ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
  input.style.setProperty('--fill', pct + '%');
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) {
      el.textContent = prefix + fmt(target) + suffix;
      return;
    }
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = prefix + fmt(Math.round(proxy.val)) + suffix;
      },
    });
  });
}

function initCalculator() {
  const advanceInput = document.getElementById('advance-input');
  const advanceSlider = document.getElementById('advance-slider');
  const termSlider = document.getElementById('term-slider');
  const termDisplay = document.getElementById('term-display');
  const valReceive = document.getElementById('val-receive');
  const valRepay = document.getElementById('val-repay');
  const valNet = document.getElementById('val-net');
  const valDaily = document.getElementById('val-daily');
  const barReceive = document.getElementById('bar-receive');
  const barRepay = document.getElementById('bar-repay');
  const aprValue = document.getElementById('apr-value');
  const aprCallout = document.getElementById('apr-callout');
  const valDailyStolen = document.getElementById('val-daily-stolen');
  const valWeeklyStolen = document.getElementById('val-weekly-stolen');
  const valYearlyKept = document.getElementById('val-yearly-kept');
  const calcFeedRows = document.getElementById('calc-feed-rows');
  const aprDays = document.getElementById('apr-days');

  if (!advanceSlider) return;

  const FACTOR = 1.4;
  const FEE_RATE = 0.05;
  const BUSINESS_DAYS_PER_MONTH = 21;
  const MAX_BAR = 100;
  const FUNDERS = ['RapidFnd', 'MerchCap', 'JetAdv', 'CapFlow', 'DailyDr'];

  function calcDailyDebitAPR(netReceived, totalRepay, months) {
    const businessDays = Math.round(months * BUSINESS_DAYS_PER_MONTH);
    if (businessDays <= 0 || netReceived <= 0) return 0;
    const financeCharge = totalRepay - netReceived;
    return Math.round((financeCharge / netReceived) * (365 / businessDays) * 100);
  }

  function pushFeedRow(amount) {
    if (!calcFeedRows) return;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const funder = FUNDERS[Math.floor(Math.random() * FUNDERS.length)];
    const row = document.createElement('div');
    row.className = 'calc-feed-row';
    row.innerHTML =
      '<span class="feed-when">' +
      days[Math.floor(Math.random() * days.length)] +
      '</span>' +
      '<span class="feed-desc">DAILY DEBIT · ' +
      funder +
      '</span>' +
      '<span class="feed-amt">−$' +
      fmt(amount) +
      '</span>';
    calcFeedRows.prepend(row);
    while (calcFeedRows.children.length > 5) {
      calcFeedRows.removeChild(calcFeedRows.lastChild);
    }
  }

  function updateCalculator(amount, months) {
    const termMonths = months || parseInt(termSlider?.value || '5', 10);
    const gross = amount;
    const fees = Math.round(gross * FEE_RATE);
    const receive = gross - fees;
    const repay = Math.round(gross * FACTOR);
    const nDays = Math.round(termMonths * BUSINESS_DAYS_PER_MONTH);
    const dailyDebit = Math.round(repay / nDays);
    const weeklyStolen = dailyDebit * 5;
    const apr = calcDailyDebitAPR(receive, repay, termMonths);
    const yearlyKept = weeklyStolen * 52;

    if (valReceive) valReceive.textContent = '$' + fmt(receive);
    if (valRepay) valRepay.textContent = '$' + fmt(repay);
    if (valNet) valNet.textContent = '$' + fmt(receive);
    if (valDaily) valDaily.textContent = '$' + fmt(dailyDebit);
    if (aprValue) aprValue.textContent = fmt(apr);
    if (valDailyStolen) valDailyStolen.textContent = '$' + fmt(dailyDebit);
    if (valWeeklyStolen) valWeeklyStolen.textContent = '$' + fmt(weeklyStolen);
    if (valYearlyKept) valYearlyKept.textContent = '$' + fmt(yearlyKept);
    if (termDisplay)
      termDisplay.textContent = termMonths + ' month' + (termMonths === 1 ? '' : 's');
    if (aprDays) aprDays.textContent = String(nDays);

    if (barReceive) barReceive.style.width = Math.min((receive / repay) * MAX_BAR, MAX_BAR) + '%';
    if (barRepay) barRepay.style.width = MAX_BAR + '%';

    if (advanceInput) advanceInput.value = fmt(amount);
    if (advanceSlider) {
      advanceSlider.value = amount;
      paintSlider(advanceSlider);
    }
    if (termSlider) {
      termSlider.value = termMonths;
      paintSlider(termSlider);
    }

    pushFeedRow(dailyDebit);

    if (aprCallout && !prefersReducedMotion) {
      gsap.fromTo(aprCallout, { scale: 0.98 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
      if (apr >= 150) {
        gsap.fromTo(
          aprCallout,
          { x: 0 },
          { x: 4, duration: 0.06, repeat: 5, yoyo: true, ease: 'power1.inOut' }
        );
      }
    }
  }

  advanceSlider.addEventListener('input', () => {
    updateCalculator(parseInt(advanceSlider.value, 10));
  });
  paintSlider(advanceSlider);

  if (termSlider) {
    termSlider.addEventListener('input', () => {
      updateCalculator(
        parseInt(advanceSlider?.value || '100000', 10),
        parseInt(termSlider.value, 10)
      );
    });
    paintSlider(termSlider);
  }

  if (advanceInput) {
    advanceInput.addEventListener('blur', () => {
      let val = parseAdvance(advanceInput.value);
      val = Math.max(25000, Math.min(500000, val));
      val = Math.round(val / 5000) * 5000;
      updateCalculator(val);
    });
    advanceInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') advanceInput.blur();
    });
  }

  updateCalculator(100000, 5);

  ScrollTrigger.create({
    trigger: '#calculator',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      if (prefersReducedMotion) return;
      gsap.from('#bar-receive, #bar-repay', {
        width: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    },
  });
}

initReveal();
initCensorChars();
initCounters();
initCalculator();

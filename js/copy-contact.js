const CONTACT_EMAIL = 'support@alictechnologies.zendesk.com';

export function initCopyContact() {
  document.querySelectorAll('[data-copy-contact]').forEach((btn) => {
    if (btn.dataset.copyContactBound) return;
    btn.dataset.copyContactBound = 'true';

    const email = btn.dataset.copyContact || CONTACT_EMAIL;
    const originalLabel = btn.textContent.trim();

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        btn.classList.add('is-copied');
        btn.textContent = 'Copied!';
        btn.setAttribute('aria-label', `Copied ${email} to clipboard`);

        window.setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.textContent = originalLabel;
          btn.setAttribute('aria-label', `Copy email: ${email}`);
        }, 2000);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });
}

initCopyContact();

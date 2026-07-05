function initZendeskChat() {
  const btn = document.querySelector('.chat-bubble');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (typeof window.zE === 'function') {
      window.zE('messenger', 'open');
    }
  });

  const hideLauncher = () => {
    window.zE('messenger', 'hide');
  };

  if (typeof window.zE === 'function') {
    window.zE(hideLauncher);
  } else {
    window.addEventListener('load', () => {
      if (typeof window.zE === 'function') {
        window.zE(hideLauncher);
      }
    });
  }
}

initZendeskChat();

// Runs before styles load so a saved or device theme is applied on first paint.
(() => {
  const root = document.documentElement;
  const device = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'kw-theme';
  let preference = null;
  try {
    const saved = window.localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch { /* Theme controls also work when storage is unavailable. */ }

  function applyTheme() {
    const theme = preference || (device.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const metadata = document.querySelector('meta[name="theme-color"]');
    if (metadata) metadata.content = theme === 'dark' ? '#111923' : '#f4f7fa';
    const button = document.getElementById('theme-toggle');
    if (button) {
      const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      button.hidden = false;
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  }

  applyTheme();
  device.addEventListener('change', () => { if (!preference) applyTheme(); });
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { window.localStorage.setItem(key, preference); } catch { /* Retain it in this page. */ }
      applyTheme();
    });
  });
})();

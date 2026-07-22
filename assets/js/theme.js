/**
 * ============================================
 * THEME TOGGLE - Drone FPV Manta
 * Manejo de tema claro/oscuro con persistencia
 * ============================================
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'fpv-theme-preference';
  const THEME_ATTR = 'data-theme';

  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch (e) {}
    return getSystemPreference();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    updateToggleIcon(theme);
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function updateToggleIcon(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    const sunIcon = toggle.querySelector('.sun-icon');
    const moonIcon = toggle.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute(THEME_ATTR) || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    saveTheme(next);
  }

  function init() {
    const theme = getTheme();
    applyTheme(theme);

    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) applyTheme(e.matches ? 'dark' : 'light');
      } catch (err) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

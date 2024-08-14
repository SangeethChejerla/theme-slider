import { DARK_MODE, DEFAULT_THEME } from '../constants/constants';
import type { LIGHT_DARK_MODE } from '../types/config';

const DEFAULT_HUE = 250;

export function getDefaultHue(): number {
  const configCarrier = document.getElementById('config-carrier');
  return parseInt(configCarrier?.dataset.hue || `${DEFAULT_HUE}`, 10);
}

export function getHue(): number {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('hue');
    return stored ? parseInt(stored, 10) : getDefaultHue();
  }
  return DEFAULT_HUE;
}

export function setHue(hue: number): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('hue', String(hue));
  }
  applyThemeToDocument(getStoredTheme(), hue);
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE, hue: number) {
  document.documentElement.style.setProperty('--primary-hue', String(hue));

  if (theme === DARK_MODE) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const themeProvider = document.getElementById('theme-provider');
  if (themeProvider) {
    themeProvider.dataset.theme = theme;
    themeProvider.dataset.hue = String(hue);
  }

  window.dispatchEvent(new CustomEvent('theme-change'));
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
  applyThemeToDocument(theme, getHue());
}

export function getStoredTheme(): LIGHT_DARK_MODE {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as LIGHT_DARK_MODE;
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return DARK_MODE;
  }
  return DEFAULT_THEME;
}

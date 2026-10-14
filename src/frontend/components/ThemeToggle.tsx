'use client';

import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    media.removeEventListener('change', callback);
  };
}

function getSnapshot() {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('nana_theme');
  if (saved) {
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      return true;
    } else {
      document.documentElement.classList.remove('dark');
      return false;
    }
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  return prefersDark;
}

function getServerSnapshot() {
  return false;
}

/**
 * ThemeToggle Component
 * Utiliza useSyncExternalStore de React 19 para sincronizar con localStorage y matchMedia
 * sin provocar renders en cascada ni violaciones de ESLint react-hooks/set-state-in-effect.
 */
export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextDark = !isDark;
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nana_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nana_theme', 'light');
    }
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      className="fixed bottom-6 right-6 z-50 p-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
    >
      <span className="material-icons-outlined text-xl block">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}

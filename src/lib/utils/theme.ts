import { hasLocalStorage } from './browser';

export function initializeTheme(): void {
  if (!hasLocalStorage) return;

  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
  document.documentElement.classList.toggle('dark', theme === 'dark');
}
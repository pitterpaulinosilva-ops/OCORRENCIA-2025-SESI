export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme-preference';

/**
 * Get the stored theme preference from localStorage
 */
export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return null;
  } catch {
    console.warn('Failed to read theme from localStorage');
    return null;
  }
}

/**
 * Save theme preference to localStorage
 */
export function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    console.warn('Failed to save theme to localStorage');
  }
}

/**
 * Get the system color scheme preference
 */
export function getSystemPreference(): Theme {
  if (typeof window === 'undefined') return 'light';
  
  try {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch {
    console.warn('Failed to detect system preference');
    return 'light';
  }
}

/**
 * Apply theme to the document
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Get the initial theme based on stored preference or system preference
 */
export function getInitialTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  return getSystemPreference();
}

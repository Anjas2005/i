import {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import './theme.css';
import type { ResolvedTheme, Theme } from './types';

const STORAGE_KEY = 'i.theme';

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

function readStoredTheme(fallback: Theme): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored;
    }
  } catch {
    // localStorage may be unavailable; use the configured default.
  }
  return fallback;
}

function readSystemTheme(): ResolvedTheme {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
}

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
};

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === 'undefined'
      ? defaultTheme
      : readStoredTheme(defaultTheme),
  );
  const [systemTheme, setSystemTheme] =
    useState<ResolvedTheme>(readSystemTheme);

  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? systemTheme : theme;

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Theme changes remain active for the current session.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemTheme(media.matches ? 'dark' : 'light');

    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

import { useTheme } from './useTheme';
import './theme-toggle.css';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="i-theme-toggle">
      <span>THEME</span>
      <select
        aria-label="Color theme"
        value={theme}
        onChange={(event) =>
          setTheme(event.target.value as 'dark' | 'light' | 'system')
        }
      >
        <option value="dark">DARK</option>
        <option value="light">LIGHT</option>
        <option value="system">SYSTEM</option>
      </select>
    </label>
  );
}

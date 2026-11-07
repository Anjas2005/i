# Drop-in theme files for an existing Wails 3 + React project

These files add theming to your existing frontend. They do **not** replace your app, routes, components, or existing global stylesheet.

## 1. Copy the files

Copy the included `frontend/src/theme/` folder into your project's existing `frontend/src/` directory.

Expected result:

```text
your-wails-project/
└── frontend/
    └── src/
        ├── App.tsx              # keep your existing file
        ├── main.tsx             # edit your existing file
        └── theme/
            ├── ThemeProvider.tsx
            ├── ThemeToggle.tsx
            ├── theme.css
            ├── theme-toggle.css
            ├── types.ts
            ├── useTheme.ts
            └── index.ts
```

If your Wails template uses a different frontend source directory, put `theme/` beside your existing `App.tsx`.

## 2. Wrap your existing React app

In your current `main.tsx`, import `ThemeProvider` and wrap the existing `<App />`. Keep your other providers and setup; do not replace the whole file.

```tsx
import { ThemeProvider } from './theme';

// Keep your existing ReactDOM.createRoot(...) call and wrap App:
root.render(
  <ThemeProvider defaultTheme="dark">
    <App />
  </ThemeProvider>,
);
```

If your entry point already has providers, nest `ThemeProvider` with them rather than removing them.

## 3. Import the toggle's CSS if you use the supplied toggle

In the component or stylesheet entry point where appropriate:

```tsx
import './theme/theme-toggle.css';
```

Then use it inside any component rendered beneath `ThemeProvider`:

```tsx
import { ThemeToggle } from './theme';

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

You can skip `ThemeToggle` and make your own settings UI using `useTheme()`.

## 4. Consume tokens in your existing component CSS

Replace hardcoded theme-dependent colors with semantic variables:

```css
.card {
  color: var(--text-primary);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border-structural);
  box-shadow: var(--shadow-offset);
}

.card__meta {
  color: var(--text-secondary);
}

.primary-button {
  color: var(--button-primary-text);
  background: var(--button-primary-bg);
  border: var(--border-width) solid var(--border-strong);
}
```

Useful tokens include:

- Surfaces: `--surface-canvas`, `--surface-panel`, `--surface-card`, `--surface-elevated`, `--surface-input`
- Text: `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`
- Borders: `--border-structural`, `--border-subtle`, `--border-active`
- Accents: `--accent-primary`, `--accent-blue`, `--accent-red`, `--accent-green`, `--accent-yellow`
- Messages: `--message-gropius-border`, `--message-kandinsky-bg`, `--message-klee-border`
- Effects: `--shadow-offset`, `--radius`, `--border-width`

## 5. Change theme from your own settings component

```tsx
import { useTheme } from './theme';

function AppearanceSettings() {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();

  return (
    <section>
      <p>Selected: {theme}</p>
      <p>Currently rendered: {resolvedTheme}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
      <button onClick={toggleTheme}>Toggle</button>
    </section>
  );
}
```

The selected preference persists in `localStorage` under `i.theme`. `data-theme` on the root `<html>` element is resolved to `dark` or `light`.

## Font note

The tokens name Space Grotesk and JetBrains Mono, with system fallbacks. This package does not fetch fonts from the internet. To bundle the fonts in your app, install and import local font packages or add your licensed font files to your frontend assets.

## Keep in mind

The theme system only changes semantic values. It does not automatically restyle existing components whose CSS uses hardcoded colors. Convert those component styles to `var(--token-name)` gradually.

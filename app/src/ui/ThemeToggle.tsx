import type { FC } from 'react'

export interface ThemeToggleProps {
  readonly theme: 'light' | 'dark'
  readonly onToggle: () => void
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-md p-2 text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text"
      aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
    >
      {theme === 'light' ? '\u263E' : '\u2600'}
    </button>
  )
}

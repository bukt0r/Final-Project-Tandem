import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface ThemeToggleProps {
  readonly theme: 'light' | 'dark'
  readonly onToggle: () => void
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-md p-2 text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text"
      aria-label={theme === 'light' ? t('theme.toDark') : t('theme.toLight')}
    >
      {theme === 'light' ? '\u263E' : '\u2600'}
    </button>
  )
}

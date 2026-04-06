import type { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTE_PATHS } from '../routing/routePaths'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import { QuizSoundToggle } from '../ui/QuizSoundToggle'
import { useTheme } from '../shared'
import { useAuth } from '../entities/auth'

const navKeys: readonly { to: string; tKey: string }[] = [
  { to: ROUTE_PATHS.home, tKey: 'nav.home' },
  { to: ROUTE_PATHS.questions, tKey: 'nav.questions' },
  { to: ROUTE_PATHS.quiz, tKey: 'nav.quiz' },
  { to: ROUTE_PATHS.statistics, tKey: 'nav.statistics' },
  { to: ROUTE_PATHS.favorites, tKey: 'nav.favorites' },
  { to: ROUTE_PATHS.addQuestion, tKey: 'nav.addQuestion' },
]

const linkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text'
const activeClass = 'bg-app-surface-hover text-app-text'

const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  [linkClass, isActive ? activeClass : ''].filter(Boolean).join(' ')

export const Header: FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { username, logout } = useAuth()
  const isQuizRoute = pathname === ROUTE_PATHS.quiz

  return (
    <header className="flex shrink-0 border-b border-app-border bg-app-surface">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:max-w-none lg:px-6">
        <span className="text-sm font-semibold text-app-text">Tech Interview Trainer</span>
        <div className="flex items-center gap-2">
          <nav className="flex gap-1 lg:hidden" aria-label="Main navigation">
            {navKeys.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getLinkClassName}
                end={item.to === ROUTE_PATHS.home}
              >
                {t(item.tKey)}
              </NavLink>
            ))}
          </nav>
          {username ? (
            <span className="hidden text-xs text-app-text-muted sm:inline">{username}</span>
          ) : null}
          <LanguageToggle />
          {isQuizRoute ? <QuizSoundToggle /> : null}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            onClick={logout}
            className="rounded-md px-2 py-1 text-xs font-medium text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text"
            aria-label={t('auth.logout')}
          >
            {t('auth.logout')}
          </button>
        </div>
      </div>
    </header>
  )
}

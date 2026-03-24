import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../routing/routePaths'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useTheme } from '../shared'

const navItems: readonly { to: string; label: string }[] = [
  { to: ROUTE_PATHS.home, label: 'Home' },
  { to: ROUTE_PATHS.questions, label: 'Questions' },
  { to: ROUTE_PATHS.quiz, label: 'Quiz' },
  { to: ROUTE_PATHS.statistics, label: 'Statistics' },
  { to: ROUTE_PATHS.favorites, label: 'Favorites' },
  { to: ROUTE_PATHS.addQuestion, label: 'Add' },
]

const linkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text'
const activeClass = 'bg-app-surface-hover text-app-text'

const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  [linkClass, isActive ? activeClass : ''].filter(Boolean).join(' ')

export const Header: FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex shrink-0 border-b border-app-border bg-app-surface">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:max-w-none lg:px-6">
        <span className="text-sm font-semibold text-app-text">Tech Interview Trainer</span>
        <div className="flex items-center gap-2">
          <nav className="flex gap-1 lg:hidden" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getLinkClassName}
                end={item.to === ROUTE_PATHS.home}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  )
}

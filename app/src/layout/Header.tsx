import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../routing/routePaths'

const navItems: readonly { to: string; label: string }[] = [
  { to: ROUTE_PATHS.home, label: 'Home' },
  { to: ROUTE_PATHS.questions, label: 'Questions' },
  { to: ROUTE_PATHS.quiz, label: 'Quiz' },
  { to: ROUTE_PATHS.statistics, label: 'Statistics' },
  { to: ROUTE_PATHS.favorites, label: 'Favorites' },
]

const linkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-slate-50'
const activeClass = 'bg-slate-800 text-slate-50'

const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  [linkClass, isActive ? activeClass : ''].filter(Boolean).join(' ')

export const Header: FC = () => {
  return (
    <header className="flex shrink-0 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:max-w-none lg:px-6">
        <span className="text-sm font-semibold text-slate-50">Tech Interview Trainer</span>
        {/* Mobile/tablet: nav in header; desktop (lg): nav in sidebar, header stays minimal */}
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
      </div>
    </header>
  )
}

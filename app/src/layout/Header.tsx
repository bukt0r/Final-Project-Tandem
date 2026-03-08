import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../routing/routePaths'

const navItems: ReadonlyArray<{ to: string; label: string }> = [
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
    <header className="border-b border-slate-800 bg-slate-950">
      <nav className="mx-auto flex max-w-6xl gap-1 px-4 py-3" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={getLinkClassName} end={item.to === ROUTE_PATHS.home}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

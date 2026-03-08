import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTE_PATHS } from '../routing/routePaths'
import styles from './Layout.module.css'

const navItems: ReadonlyArray<{ to: string; label: string }> = [
  { to: ROUTE_PATHS.home, label: 'Home' },
  { to: ROUTE_PATHS.questions, label: 'Questions' },
  { to: ROUTE_PATHS.quiz, label: 'Quiz' },
  { to: ROUTE_PATHS.statistics, label: 'Statistics' },
  { to: ROUTE_PATHS.favorites, label: 'Favorites' },
]

const linkClass =
  'block rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-slate-50'
const activeClass = 'bg-slate-800 text-slate-50'

const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  [linkClass, isActive ? activeClass : ''].filter(Boolean).join(' ')

export const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar navigation">
      <nav className="border-r border-slate-800 bg-slate-950/50 px-4 py-4" aria-label="Main navigation">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={getLinkClassName}
                end={item.to === ROUTE_PATHS.home}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTE_PATHS } from '../routing/routePaths'
import styles from './Layout.module.css'

const navKeys: readonly { to: string; tKey: string }[] = [
  { to: ROUTE_PATHS.home, tKey: 'nav.home' },
  { to: ROUTE_PATHS.questions, tKey: 'nav.questions' },
  { to: ROUTE_PATHS.quiz, tKey: 'nav.quiz' },
  { to: ROUTE_PATHS.statistics, tKey: 'nav.statistics' },
  { to: ROUTE_PATHS.favorites, tKey: 'nav.favorites' },
  { to: ROUTE_PATHS.addQuestion, tKey: 'nav.addQuestion' },
]

const linkClass =
  'block rounded-md px-3 py-2 text-sm font-medium text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text'
const activeClass = 'bg-app-surface-hover text-app-text'

const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  [linkClass, isActive ? activeClass : ''].filter(Boolean).join(' ')

export const Sidebar: FC = () => {
  const { t } = useTranslation()

  return (
    <aside className={styles.sidebar} aria-label="Sidebar navigation">
      <nav className="border-r border-app-border bg-app-bg px-4 py-4" aria-label="Main navigation">
        <ul className="flex flex-col gap-1">
          {navKeys.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={getLinkClassName}
                end={item.to === ROUTE_PATHS.home}
              >
                {t(item.tKey)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

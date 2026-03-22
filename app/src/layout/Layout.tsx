import type { FC } from 'react'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styles from './Layout.module.css'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Loader } from '../ui'

export const Layout: FC = () => {
  const location = useLocation()

  return (
    <div className={`${styles.pageContainer} min-h-screen bg-app-bg text-app-text`}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <div className={`${styles.contentContainer} flex-1 py-6`}>
            <Suspense key={location.pathname} fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}

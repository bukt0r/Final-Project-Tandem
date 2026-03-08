import type { FC } from 'react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

const PageFallback: FC = () => (
  <div className="flex min-h-[12rem] items-center justify-center text-slate-400">Loading…</div>
)

export const Layout: FC = () => {
  return (
    <div className={`${styles.pageContainer} min-h-screen bg-slate-950 text-slate-50`}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <div className={`${styles.contentContainer} flex-1 py-6`}>
            <Suspense fallback={<PageFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}

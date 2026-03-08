import type { FC } from 'react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

const PageFallback: FC = () => (
  <div className="flex min-h-[12rem] items-center justify-center text-slate-400">Loading…</div>
)

export const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

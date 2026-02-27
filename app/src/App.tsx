import type { FC } from 'react'
import { useState } from 'react'
import styles from './App.module.css'

const App: FC = () => {
  const [count, setCount] = useState<number>(0)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-6 rounded-2xl bg-slate-900/80 p-8 shadow-xl ring-1 ring-slate-800">
          <header className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400">
              Tech interview prep
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome to your interview practice workspace
            </h1>
            <p className="text-sm text-slate-300">
              Weʼll gradually add modules for questions, topics, testing, and progress tracking. For
              now, the goal is to keep the project foundation clean and strict.
            </p>
          </header>

          <div className={`${styles.card} space-y-3 bg-slate-900/60 p-4 ring-1 ring-slate-800`}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Demo counter
            </p>
            <p className="text-sm text-slate-300">
              This tiny stateful widget exists only to verify that React, TypeScript, TailwindCSS,
              and CSS Modules are wired correctly.
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              onClick={() => setCount((previousCount: number): number => previousCount + 1)}
            >
              Count: {count}
            </button>
          </div>

          <footer className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
            <span>Core foundation is ready for feature modules.</span>
            <span className="font-mono">Vite · React · TS · Tailwind</span>
          </footer>
        </div>
      </section>
    </main>
  )
}

export default App

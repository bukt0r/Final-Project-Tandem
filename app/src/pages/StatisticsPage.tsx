import type { FC } from 'react'
import { useState, useCallback } from 'react'
import { getStatistics, clearStatistics } from '../entities/statistics'
import type { Statistics } from '../entities/statistics'

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const StatisticsPage: FC = () => {
  const [stats, setStats] = useState<Statistics>(getStatistics)

  const handleClear = useCallback((): void => {
    clearStatistics()
    setStats(getStatistics())
  }, [])

  if (stats.totalQuizzes === 0) {
    return (
      <section className="px-4 py-6">
        <h1 className="text-xl font-semibold text-app-text">Статистика</h1>
        <p className="mt-4 text-sm text-app-text-muted">
          Вы ещё не прошли ни одного квиза. Перейдите в раздел «Квиз», чтобы начать.
        </p>
      </section>
    )
  }

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-app-text">Статистика</h1>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
        >
          Очистить
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-app-border bg-app-surface p-4 text-center">
          <p className="text-2xl font-bold text-app-text">{stats.totalQuizzes}</p>
          <p className="mt-1 text-xs text-app-text-muted">Квизов пройдено</p>
        </div>
        <div className="rounded-lg border border-app-border bg-app-surface p-4 text-center">
          <p className="text-2xl font-bold text-app-text">{stats.totalAnswered}</p>
          <p className="mt-1 text-xs text-app-text-muted">Всего ответов</p>
        </div>
        <div className="rounded-lg border border-app-border bg-app-surface p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{stats.totalCorrect}</p>
          <p className="mt-1 text-xs text-app-text-muted">Правильных</p>
        </div>
        <div className="rounded-lg border border-app-border bg-app-surface p-4 text-center">
          <p className="text-2xl font-bold text-app-accent">{stats.accuracy}%</p>
          <p className="mt-1 text-xs text-app-text-muted">Точность</p>
        </div>
      </div>

      <h2 className="mt-6 text-sm font-semibold text-app-text">История</h2>
      <ul className="mt-2 flex flex-col gap-2" aria-label="История квизов">
        {[...stats.history].reverse().map((result, index) => {
          const pct = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0
          return (
            <li
              key={`${result.date}-${index}`}
              className="flex items-center justify-between rounded-lg border border-app-border bg-app-surface px-4 py-3"
            >
              <span className="text-xs text-app-text-muted">{formatDate(result.date)}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-app-text">
                  {result.correct} / {result.total}
                </span>
                <span className={`text-xs font-medium ${pct >= 70 ? 'text-emerald-600' : pct >= 40 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {pct}%
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default StatisticsPage

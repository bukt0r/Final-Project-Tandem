import type { FC } from 'react'
import { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getStatistics, clearStatistics } from '../entities/statistics'
import type { Statistics } from '../entities/statistics'

interface ChartDataPoint {
  readonly name: string
  readonly accuracy: number
}

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

function formatShortDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
}

const StatisticsPage: FC = () => {
  const { t } = useTranslation()
  const [stats, setStats] = useState<Statistics>(getStatistics)

  const chartData = useMemo((): ChartDataPoint[] =>
    stats.history.map((r, i) => ({
      name: formatShortDate(r.date) || `#${i + 1}`,
      accuracy: r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0,
    })),
  [stats.history])

  const handleClear = useCallback((): void => {
    clearStatistics()
    setStats(getStatistics())
  }, [])

  if (stats.totalQuizzes === 0) {
    return (
      <section className="px-4 py-6">
        <h1 className="text-xl font-semibold text-app-text">{t('statistics.title')}</h1>
        <p className="mt-4 text-sm text-app-text-muted">{t('statistics.empty')}</p>
      </section>
    )
  }

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-app-text">{t('statistics.title')}</h1>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
        >
          {t('statistics.clear')}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-app-border bg-app-surface p-4 text-center">
          <p className="text-2xl font-bold text-app-text">{stats.totalQuizzes}</p>
          <p className="mt-1 text-xs text-app-text-muted">{t('statistics.quizzesDone')}</p>
        </div>
        <div className="rounded-lg border border-app-border bg-app-surface p-4 text-center">
          <p className="text-2xl font-bold text-app-text">{stats.totalAnswered}</p>
          <p className="mt-1 text-xs text-app-text-muted">{t('statistics.totalAnswers')}</p>
        </div>
        <div className="rounded-lg border border-app-border bg-app-surface p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{stats.totalCorrect}</p>
          <p className="mt-1 text-xs text-app-text-muted">{t('statistics.correctAnswers')}</p>
        </div>
        <div className="rounded-lg border border-app-border bg-app-surface p-4 text-center">
          <p className="text-2xl font-bold text-app-accent">{stats.accuracy}%</p>
          <p className="mt-1 text-xs text-app-text-muted">{t('statistics.accuracy')}</p>
        </div>
      </div>

      {chartData.length >= 2 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-app-text">{t('statistics.chartTitle')}</h2>
          <div className="mt-2 rounded-lg border border-app-border bg-app-surface p-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-app-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--color-app-text-muted)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="var(--color-app-text-muted)" unit="%" />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, t('statistics.accuracy')]}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="var(--color-app-accent)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--color-app-accent)' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <h2 className="mt-6 text-sm font-semibold text-app-text">{t('statistics.historyTitle')}</h2>
      <ul className="mt-2 flex flex-col gap-2" aria-label={t('statistics.historyTitle')}>
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

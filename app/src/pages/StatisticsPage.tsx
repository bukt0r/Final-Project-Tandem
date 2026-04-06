import type { FC } from 'react'
import { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getStatistics, clearStatistics } from '../entities/statistics'
import type { Statistics } from '../entities/statistics'
import type { KnowledgeStatus } from '../entities/question/model/types'
import { getQuestions, parseAppLocale } from '../entities/question/api/questionsApi'
import { loadUserStorage } from '../shared'

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

const STORAGE_KEY_STATUS = 'knowledge-status'

const StatisticsPage: FC = () => {
  const { t, i18n } = useTranslation()
  const locale = useMemo(() => parseAppLocale(i18n.language), [i18n.language])
  const [stats, setStats] = useState<Statistics>(getStatistics)

  const totalQuestions = useMemo(() => getQuestions(locale).length, [locale])
  const statusMap = loadUserStorage<Record<string, KnowledgeStatus>>(STORAGE_KEY_STATUS, {})
  const knownCount = Object.values(statusMap).filter((s) => s === 'known').length
  const unknownCount = Object.values(statusMap).filter((s) => s === 'unknown').length
  const learnedPercent = totalQuestions > 0 ? Math.round((knownCount / totalQuestions) * 100) : 0

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

  const progressColor = learnedPercent >= 70 ? 'bg-emerald-500' : learnedPercent >= 40 ? 'bg-amber-500' : 'bg-app-accent'

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">{t('statistics.title')}</h1>

      <div className="mt-6 flex flex-col gap-6">
        {/* ── Block 1: Overall learning ── */}
        <div className="rounded-xl border border-app-border bg-app-surface p-5 shadow-sm">
          <h2 className="text-base font-semibold text-app-text">{t('statistics.learningTitle')}</h2>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-app-text">
              {t('statistics.learningPercent', { percent: learnedPercent })}
            </span>
            <span className="text-sm text-app-text-muted">
              {knownCount} / {totalQuestions}
            </span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-app-bg">
            <div
              className={`h-full rounded-full transition-all ${progressColor}`}
              style={{ width: `${learnedPercent}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-app-bg p-3 text-center">
              <p className="text-lg font-bold text-emerald-600">{knownCount}</p>
              <p className="text-xs text-app-text-muted">{t('statistics.learned')}</p>
            </div>
            <div className="rounded-lg bg-app-bg p-3 text-center">
              <p className="text-lg font-bold text-rose-600">{unknownCount}</p>
              <p className="text-xs text-app-text-muted">{t('statistics.notLearned')}</p>
            </div>
            <div className="rounded-lg bg-app-bg p-3 text-center">
              <p className="text-lg font-bold text-app-text">{totalQuestions}</p>
              <p className="text-xs text-app-text-muted">{t('statistics.totalQuestions')}</p>
            </div>
          </div>
        </div>

        {/* ── Block 2: Quiz ── */}
        <div className="rounded-xl border border-app-border bg-app-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-app-text">{t('statistics.quizSectionTitle')}</h2>
            {stats.totalQuizzes > 0 ? (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
              >
                {t('statistics.clear')}
              </button>
            ) : null}
          </div>

          {stats.totalQuizzes === 0 ? (
            <p className="mt-4 text-sm text-app-text-muted">{t('statistics.empty')}</p>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg bg-app-bg p-3 text-center">
                  <p className="text-2xl font-bold text-app-text">{stats.totalQuizzes}</p>
                  <p className="mt-1 text-xs text-app-text-muted">{t('statistics.quizzesDone')}</p>
                </div>
                <div className="rounded-lg bg-app-bg p-3 text-center">
                  <p className="text-2xl font-bold text-app-text">{stats.totalAnswered}</p>
                  <p className="mt-1 text-xs text-app-text-muted">{t('statistics.totalAnswers')}</p>
                </div>
                <div className="rounded-lg bg-app-bg p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{stats.totalCorrect}</p>
                  <p className="mt-1 text-xs text-app-text-muted">{t('statistics.correctAnswers')}</p>
                </div>
                <div className="rounded-lg bg-app-bg p-3 text-center">
                  <p className="text-2xl font-bold text-app-accent">{stats.accuracy}%</p>
                  <p className="mt-1 text-xs text-app-text-muted">{t('statistics.accuracy')}</p>
                </div>
              </div>

              {chartData.length >= 2 && (
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-app-text">{t('statistics.chartTitle')}</h3>
                  <div className="mt-2 rounded-lg bg-app-bg p-4">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-app-border)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--color-app-text-muted)" />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="var(--color-app-text-muted)" unit="%" />
                        <Tooltip
                          formatter={(value) => [`${String(value)}%`, t('statistics.accuracy')]}
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

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-app-text">{t('statistics.historyTitle')}</h3>
                <ul className="mt-2 flex flex-col gap-2" aria-label={t('statistics.historyTitle')}>
                  {[...stats.history].reverse().map((result, index) => {
                    const pct = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0
                    return (
                      <li
                        key={`${result.date}-${index}`}
                        className="flex items-center justify-between rounded-lg bg-app-bg px-4 py-3"
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
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default StatisticsPage

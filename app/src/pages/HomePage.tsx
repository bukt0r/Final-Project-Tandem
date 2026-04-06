import type { FC } from 'react'
import { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { KnowledgeStatus } from '../entities/question/model/types'
import { getRandomQuestion, getQuestions, getQuestionById, parseAppLocale } from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'
import { loadUserStorage, saveUserStorage } from '../shared'

const STORAGE_KEY_STATUS = 'knowledge-status'
const STORAGE_KEY_FAVORITES = 'favorites'

type StatusMap = Record<string, KnowledgeStatus>

const HomePage: FC = () => {
  const { t, i18n } = useTranslation()
  const [randomQuestionId, setRandomQuestionId] = useState<string | null>(null)
  const [cardRevision, setCardRevision] = useState(0)
  const locale = useMemo(() => parseAppLocale(i18n.language), [i18n.language])
  const totalQuestions = useMemo(() => getQuestions(locale).length, [locale])
  const randomQuestion = useMemo(
    () => (randomQuestionId === null ? null : getQuestionById(randomQuestionId, locale) ?? null),
    [randomQuestionId, locale],
  )

  const [statusMap, setStatusMap] = useState<StatusMap>(() => loadUserStorage<StatusMap>(STORAGE_KEY_STATUS, {}))
  const [favorites, setFavorites] = useState<string[]>(() => loadUserStorage<string[]>(STORAGE_KEY_FAVORITES, []))

  const handleRandom = useCallback((): void => {
    const q = getRandomQuestion(locale)
    if (q) {
      setRandomQuestionId(q.id)
      setCardRevision((r) => r + 1)
    }
  }, [locale])

  const handleStatusChange = useCallback((questionId: string, status: KnowledgeStatus): void => {
    setStatusMap((prev) => {
      const next = { ...prev, [questionId]: status }
      saveUserStorage(STORAGE_KEY_STATUS, next)
      return next
    })
    setTimeout(() => {
      const q = getRandomQuestion(locale)
      if (q) {
        setRandomQuestionId(q.id)
        setCardRevision((r) => r + 1)
      }
    }, 400)
  }, [locale])

  const handleFavoriteToggle = useCallback((questionId: string): void => {
    setFavorites((prev) => {
      const next = prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
      saveUserStorage(STORAGE_KEY_FAVORITES, next)
      return next
    })
  }, [])

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">{t('home.title')}</h1>
      <p className="mt-2 text-sm text-app-text-muted">
        {t('home.description')} {t('home.totalQuestions', { count: totalQuestions })}
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleRandom}
          className="rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
        >
          {t('home.randomButton')}
        </button>
      </div>

      {randomQuestion !== null && (
        <div className="mt-4">
          <QuestionCard
            key={`${randomQuestion.id}-${cardRevision}`}
            question={randomQuestion}
            knowledgeStatus={statusMap[randomQuestion.id] ?? 'none'}
            onStatusChange={handleStatusChange}
            isFavorite={favorites.includes(randomQuestion.id)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>
      )}
    </section>
  )
}

export default HomePage

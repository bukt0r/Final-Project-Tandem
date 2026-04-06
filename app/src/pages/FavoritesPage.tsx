import type { FC } from 'react'
import { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { KnowledgeStatus } from '../entities/question/model/types'
import {
  getQuestions,
  parseAppLocale,
  isCustomQuestion,
  deleteCustomQuestion,
} from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'
import { loadUserStorage, saveUserStorage } from '../shared'

const STORAGE_KEY_STATUS = 'knowledge-status'
const STORAGE_KEY_FAVORITES = 'favorites'

type StatusMap = Record<string, KnowledgeStatus>

const FavoritesPage: FC = () => {
  const { t, i18n } = useTranslation()
  const locale = useMemo(() => parseAppLocale(i18n.language), [i18n.language])
  const [favorites, setFavorites] = useState<string[]>(() => loadUserStorage<string[]>(STORAGE_KEY_FAVORITES, []))
  const [statusMap, setStatusMap] = useState<StatusMap>(() => loadUserStorage<StatusMap>(STORAGE_KEY_STATUS, {}))
  const [revision, setRevision] = useState(0)

  const questions = useMemo(
    () => getQuestions(locale).filter((q) => favorites.includes(q.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- revision forces re-read after delete
    [favorites, locale, revision],
  )

  const handleStatusChange = useCallback((questionId: string, status: KnowledgeStatus): void => {
    setStatusMap((prev) => {
      const next = { ...prev, [questionId]: status }
      saveUserStorage(STORAGE_KEY_STATUS, next)
      return next
    })
  }, [])

  const handleFavoriteToggle = useCallback((questionId: string): void => {
    setFavorites((prev) => {
      const next = prev.filter((id) => id !== questionId)
      saveUserStorage(STORAGE_KEY_FAVORITES, next)
      return next
    })
  }, [])

  const handleDelete = useCallback((questionId: string): void => {
    deleteCustomQuestion(questionId)
    setFavorites((prev) => {
      const next = prev.filter((id) => id !== questionId)
      saveUserStorage(STORAGE_KEY_FAVORITES, next)
      return next
    })
    setRevision((r) => r + 1)
  }, [])

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">{t('favorites.title')}</h1>
      <p className="mt-1 text-sm text-app-text-muted">
        {questions.length === 0 ? t('favorites.empty') : t('favorites.total', { count: questions.length })}
      </p>

      {questions.length > 0 && (
        <ul className="mt-4 flex flex-col gap-3" aria-label={t('favorites.title')}>
          {questions.map((q) => (
            <li key={q.id}>
              <QuestionCard
                question={q}
                knowledgeStatus={statusMap[q.id] ?? 'none'}
                onStatusChange={handleStatusChange}
                isFavorite
                onFavoriteToggle={handleFavoriteToggle}
                isCustom={isCustomQuestion(q.id)}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default FavoritesPage

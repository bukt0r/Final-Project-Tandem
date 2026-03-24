import type { FC } from 'react'
import { useState, useMemo, useCallback } from 'react'
import type { KnowledgeStatus } from '../entities/question/model/types'
import { getQuestions } from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'
import { loadFromStorage, saveToStorage } from '../shared'

const STORAGE_KEY_STATUS = 'knowledge-status'
const STORAGE_KEY_FAVORITES = 'favorites'

type StatusMap = Record<string, KnowledgeStatus>

const FavoritesPage: FC = () => {
  const [favorites, setFavorites] = useState<string[]>(() => loadFromStorage<string[]>(STORAGE_KEY_FAVORITES, []))
  const [statusMap, setStatusMap] = useState<StatusMap>(() => loadFromStorage<StatusMap>(STORAGE_KEY_STATUS, {}))

  const questions = useMemo(
    () => getQuestions().filter((q) => favorites.includes(q.id)),
    [favorites],
  )

  const handleStatusChange = useCallback((questionId: string, status: KnowledgeStatus): void => {
    setStatusMap((prev) => {
      const next = { ...prev, [questionId]: status }
      saveToStorage(STORAGE_KEY_STATUS, next)
      return next
    })
  }, [])

  const handleFavoriteToggle = useCallback((questionId: string): void => {
    setFavorites((prev) => {
      const next = prev.filter((id) => id !== questionId)
      saveToStorage(STORAGE_KEY_FAVORITES, next)
      return next
    })
  }, [])

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">Избранное</h1>
      <p className="mt-1 text-sm text-app-text-muted">
        {questions.length === 0 ? 'Вы ещё не добавили вопросы в избранное.' : `Всего: ${questions.length}`}
      </p>

      {questions.length > 0 && (
        <ul className="mt-4 flex flex-col gap-3" aria-label="Избранные вопросы">
          {questions.map((q) => (
            <li key={q.id}>
              <QuestionCard
                question={q}
                knowledgeStatus={statusMap[q.id] ?? 'none'}
                onStatusChange={handleStatusChange}
                isFavorite
                onFavoriteToggle={handleFavoriteToggle}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default FavoritesPage

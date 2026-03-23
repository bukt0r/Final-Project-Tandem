import type { FC, MouseEvent } from 'react'
import { useState, useCallback } from 'react'
import type { Question, KnowledgeStatus } from '../entities/question/model/types'
import { DifficultyBadge } from './DifficultyBadge'

export interface QuestionCardProps {
  readonly question: Question
  readonly knowledgeStatus?: KnowledgeStatus
  readonly onStatusChange?: (questionId: string, status: KnowledgeStatus) => void
  readonly isFavorite?: boolean
  readonly onFavoriteToggle?: (questionId: string) => void
}

const borderByStatus: Record<KnowledgeStatus, string> = {
  known: 'border-l-emerald-500',
  unknown: 'border-l-rose-500',
  none: 'border-l-transparent',
}

const statusBadge: Record<KnowledgeStatus, { label: string; className: string }> = {
  known: { label: 'Изучено', className: 'bg-emerald-100 text-emerald-700' },
  unknown: { label: 'Не изучено', className: 'bg-rose-100 text-rose-700' },
  none: { label: '', className: '' },
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  knowledgeStatus = 'none',
  onStatusChange,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = useCallback((): void => {
    setIsFlipped((prev) => !prev)
  }, [])

  const handleKnown = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onStatusChange?.(question.id, knowledgeStatus === 'known' ? 'none' : 'known')
  }, [question.id, knowledgeStatus, onStatusChange])

  const handleUnknown = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onStatusChange?.(question.id, knowledgeStatus === 'unknown' ? 'none' : 'unknown')
  }, [question.id, knowledgeStatus, onStatusChange])

  const handleFavorite = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onFavoriteToggle?.(question.id)
  }, [question.id, onFavoriteToggle])

  const badge = statusBadge[knowledgeStatus]

  return (
    <article
      className={`cursor-pointer rounded-lg border border-app-border border-l-4 bg-app-surface p-4 shadow-sm transition hover:shadow-md ${borderByStatus[knowledgeStatus]}`}
      aria-labelledby={`question-title-${question.id}`}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleFlip()
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={question.difficulty} className="shrink-0" />
          {knowledgeStatus !== 'none' && (
            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${badge.className}`}>
              {badge.label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFavorite}
            className={`text-lg transition ${isFavorite ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'}`}
            aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            {isFavorite ? '\u2605' : '\u2606'}
          </button>
          <span className="text-xs text-app-text-muted">
            {isFlipped ? 'Ответ' : 'Вопрос'}
          </span>
        </div>
      </div>

      <div className="mt-3 text-sm text-app-text">
        {isFlipped ? question.answer : question.question}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="inline-block rounded bg-app-bg px-2 py-0.5 text-xs text-app-text-muted">
          {question.category}
        </span>
        <span className="text-xs text-app-accent">
          {isFlipped ? '\u2190 нажми, чтобы вернуться' : 'нажми, чтобы увидеть ответ \u2192'}
        </span>
      </div>

      {isFlipped && (
        <div className="mt-3 flex gap-2 border-t border-app-border pt-3">
          <button
            type="button"
            onClick={handleKnown}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              knowledgeStatus === 'known'
                ? 'bg-emerald-500 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Знаю
          </button>
          <button
            type="button"
            onClick={handleUnknown}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              knowledgeStatus === 'unknown'
                ? 'bg-rose-500 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Не знаю
          </button>
        </div>
      )}
    </article>
  )
}

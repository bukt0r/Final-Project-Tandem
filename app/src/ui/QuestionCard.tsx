import type { FC, MouseEvent } from 'react'
import { useState, useCallback } from 'react'
import type { Question, KnowledgeStatus } from '../entities/question/model/types'
import { DifficultyBadge } from './DifficultyBadge'

export interface QuestionCardProps {
  readonly question: Question
  readonly knowledgeStatus?: KnowledgeStatus
  readonly onStatusChange?: (questionId: string, status: KnowledgeStatus) => void
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  knowledgeStatus = 'none',
  onStatusChange,
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

  return (
    <article
      className="cursor-pointer rounded-lg border border-app-border bg-app-surface p-4 shadow-sm transition hover:shadow-md"
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
        <DifficultyBadge difficulty={question.difficulty} className="shrink-0" />
        <span className="text-xs text-app-text-muted">
          {isFlipped ? 'Ответ' : 'Вопрос'}
        </span>
      </div>

      <div className="mt-3 text-sm text-app-text">
        {isFlipped ? question.answer : question.question}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="inline-block rounded bg-app-bg px-2 py-0.5 text-xs text-app-text-muted">
          {question.category}
        </span>
        <span className="text-xs text-app-accent">
          {isFlipped ? '← нажми, чтобы вернуться' : 'нажми, чтобы увидеть ответ →'}
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

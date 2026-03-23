import type { FC } from 'react'
import { useState, useCallback } from 'react'
import type { Question } from '../entities/question/model/types'
import { DifficultyBadge } from './DifficultyBadge'

export interface QuestionCardProps {
  readonly question: Question
}

export const QuestionCard: FC<QuestionCardProps> = ({ question }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = useCallback((): void => {
    setIsFlipped((prev) => !prev)
  }, [])

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
    </article>
  )
}

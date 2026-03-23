import type { FC } from 'react'
import type { Question } from '../entities/question/model/types'
import { DifficultyBadge } from './DifficultyBadge'

export interface QuestionCardProps {
  readonly question: Question
}

export const QuestionCard: FC<QuestionCardProps> = ({ question }) => {
  return (
    <article
      className="rounded-lg border border-app-border bg-app-surface p-4 shadow-sm transition hover:shadow-md"
      aria-labelledby={`question-title-${question.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id={`question-title-${question.id}`} className="text-sm font-medium text-app-text">
          {question.question}
        </h2>
        <DifficultyBadge difficulty={question.difficulty} className="shrink-0" />
      </div>
      <div className="mt-2">
        <span className="inline-block rounded bg-app-bg px-2 py-0.5 text-xs text-app-text-muted">
          {question.category}
        </span>
      </div>
    </article>
  )
}

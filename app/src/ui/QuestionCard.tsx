import type { FC } from 'react'
import type { Question } from '../features/questions'
import { DifficultyBadge } from './DifficultyBadge'

export interface QuestionCardProps {
  readonly question: Question
}

export const QuestionCard: FC<QuestionCardProps> = ({ question }) => {
  return (
    <article
      className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 ring-1 ring-slate-800 transition hover:ring-slate-700"
      aria-labelledby={`question-title-${question.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 id={`question-title-${question.id}`} className="text-sm font-medium text-slate-50">
          {question.title}
        </h2>
        <DifficultyBadge difficulty={question.difficulty} className="shrink-0" />
      </div>
      {question.topicIds.length > 0 && (
        <p className="mt-2 text-xs text-slate-400">
          Topics: {question.topicIds.length} {question.topicIds.length === 1 ? 'topic' : 'topics'}
        </p>
      )}
    </article>
  )
}

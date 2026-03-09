import type { FC } from 'react'
import type { QuestionDifficulty } from '../features/questions'

export interface DifficultyBadgeProps {
  readonly difficulty: QuestionDifficulty
  readonly className?: string
}

const difficultyStyles: Record<QuestionDifficulty, string> = {
  easy: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  medium: 'bg-amber-100 text-amber-700 ring-amber-200',
  hard: 'bg-rose-100 text-rose-700 ring-rose-200',
}

const difficultyLabels: Record<QuestionDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export const DifficultyBadge: FC<DifficultyBadgeProps> = ({ difficulty, className = '' }) => {
  const style = difficultyStyles[difficulty]
  const label = difficultyLabels[difficulty]
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style} ${className}`.trim()}
      aria-label={`Difficulty: ${label}`}
    >
      {label}
    </span>
  )
}

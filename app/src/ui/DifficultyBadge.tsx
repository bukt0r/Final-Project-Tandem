import type { FC } from 'react'
import type { QuestionDifficulty } from '../features/questions'

export interface DifficultyBadgeProps {
  readonly difficulty: QuestionDifficulty
  readonly className?: string
}

const difficultyStyles: Record<QuestionDifficulty, string> = {
  easy: 'bg-emerald-500/20 text-emerald-400 ring-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-400 ring-amber-500/30',
  hard: 'bg-rose-500/20 text-rose-400 ring-rose-500/30',
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

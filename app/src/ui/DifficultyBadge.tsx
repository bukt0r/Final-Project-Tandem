import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { Difficulty } from '../entities/question/model/types'

export interface DifficultyBadgeProps {
  readonly difficulty: Difficulty
  readonly className?: string
}

const difficultyStyles: Record<Difficulty, string> = {
  easy: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  medium: 'bg-amber-100 text-amber-700 ring-amber-200',
  hard: 'bg-rose-100 text-rose-700 ring-rose-200',
}

const difficultyKeys: Record<Difficulty, string> = {
  easy: 'difficulty.easy',
  medium: 'difficulty.medium',
  hard: 'difficulty.hard',
}

export const DifficultyBadge: FC<DifficultyBadgeProps> = ({ difficulty, className = '' }) => {
  const { t } = useTranslation()
  const style = difficultyStyles[difficulty]
  const label = t(difficultyKeys[difficulty])

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style} ${className}`.trim()}
      aria-label={label}
    >
      {label}
    </span>
  )
}

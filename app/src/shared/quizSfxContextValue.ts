import { createContext } from 'react'

export interface QuizSfxContextValue {
  readonly muted: boolean
  readonly setMuted: (value: boolean) => void
  readonly toggleMuted: () => void
}

export const QuizSfxContext = createContext<QuizSfxContextValue | null>(null)

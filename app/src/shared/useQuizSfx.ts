import { useContext } from 'react'
import { QuizSfxContext, type QuizSfxContextValue } from './quizSfxContextValue'

export function useQuizSfx(): QuizSfxContextValue {
  const ctx = useContext(QuizSfxContext)
  if (!ctx) {
    throw new Error('useQuizSfx must be used within QuizSfxProvider')
  }
  return ctx
}

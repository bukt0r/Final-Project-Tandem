import type { FC, ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { QuizSfxContext } from './quizSfxContextValue'
import { loadFromStorage, saveToStorage } from './storage'

const STORAGE_KEY = 'quiz-sfx-muted'

export const QuizSfxProvider: FC<{ readonly children: ReactNode }> = ({ children }) => {
  const [muted, setMutedState] = useState(
    () => loadFromStorage<boolean>(STORAGE_KEY, false) === true,
  )

  const setMuted = useCallback((value: boolean): void => {
    setMutedState(value)
    saveToStorage(STORAGE_KEY, value)
  }, [])

  const toggleMuted = useCallback((): void => {
    setMutedState((prev) => {
      const next = !prev
      saveToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ muted, setMuted, toggleMuted }),
    [muted, setMuted, toggleMuted],
  )

  return <QuizSfxContext.Provider value={value}>{children}</QuizSfxContext.Provider>
}

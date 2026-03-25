import { useState, useCallback, useEffect } from 'react'
import { loadFromStorage, saveToStorage } from './storage'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  const stored = loadFromStorage<Theme | null>(STORAGE_KEY, null)
  if (stored === 'light' || stored === 'dark') return stored

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback((): void => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light'
      saveToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  return { theme, toggleTheme }
}

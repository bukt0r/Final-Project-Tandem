import type { QuizResult, Statistics } from './types'
import { loadUserStorage, saveUserStorage } from '../../shared'

const STORAGE_KEY = 'quiz-statistics'

function computeAccuracy(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

export function getStatistics(): Statistics {
  const history = loadUserStorage<QuizResult[]>(STORAGE_KEY, [])

  const totalQuizzes = history.length
  const totalCorrect = history.reduce((sum, r) => sum + r.correct, 0)
  const totalAnswered = history.reduce((sum, r) => sum + r.total, 0)

  return {
    totalQuizzes,
    totalCorrect,
    totalAnswered,
    accuracy: computeAccuracy(totalCorrect, totalAnswered),
    history,
  }
}

export function addQuizResult(correct: number, total: number): void {
  const history = loadUserStorage<QuizResult[]>(STORAGE_KEY, [])

  const result: QuizResult = {
    date: new Date().toISOString(),
    correct,
    total,
  }

  saveUserStorage(STORAGE_KEY, [...history, result])
}

export function clearStatistics(): void {
  saveUserStorage(STORAGE_KEY, [])
}

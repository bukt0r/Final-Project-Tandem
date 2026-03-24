export interface QuizResult {
  readonly date: string
  readonly correct: number
  readonly total: number
}

export interface Statistics {
  readonly totalQuizzes: number
  readonly totalCorrect: number
  readonly totalAnswered: number
  readonly accuracy: number
  readonly history: readonly QuizResult[]
}

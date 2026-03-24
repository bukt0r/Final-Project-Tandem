import type { Question } from '../question/model/types'

export interface QuizOption {
  readonly id: string
  readonly text: string
  readonly isCorrect: boolean
}

export interface QuizQuestion {
  readonly question: Question
  readonly options: readonly QuizOption[]
}

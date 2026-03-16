export type Difficulty = 'easy' | 'medium' | 'hard'

export type Question = {
  readonly id: string
  readonly question: string
  readonly answer: string
  readonly category: string
  readonly difficulty: Difficulty
  readonly tags: string[]
}


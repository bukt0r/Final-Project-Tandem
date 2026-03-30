export type Difficulty = 'easy' | 'medium' | 'hard'

export type AppLocale = 'ru' | 'en'

export type KnowledgeStatus = 'known' | 'unknown' | 'none'

export interface BilingualText {
  readonly ru: string
  readonly en: string
}

export interface BilingualTags {
  readonly ru: readonly string[]
  readonly en: readonly string[]
}

export interface QuestionSource {
  readonly id: string
  readonly question: BilingualText
  readonly answer: BilingualText
  readonly category: BilingualText
  readonly categoryKey: string
  readonly difficulty: Difficulty
  readonly tags: BilingualTags
}

export interface Question {
  readonly id: string
  readonly question: string
  readonly answer: string
  readonly category: string
  readonly categoryKey: string
  readonly difficulty: Difficulty
  readonly tags: string[]
}


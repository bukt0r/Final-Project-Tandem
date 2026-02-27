export type QuestionId = string & { readonly brand: unique symbol }

export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export interface QuestionMeta {
  readonly id: QuestionId
  readonly title: string
  readonly difficulty: QuestionDifficulty
}

export const createQuestionMeta = (params: {
  readonly id: QuestionId
  readonly title: string
  readonly difficulty: QuestionDifficulty
}): QuestionMeta => ({
  id: params.id,
  title: params.title,
  difficulty: params.difficulty,
})

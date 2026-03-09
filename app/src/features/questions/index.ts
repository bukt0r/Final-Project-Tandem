export type QuestionId = string & { readonly brand: unique symbol }

export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  readonly id: QuestionId
  readonly title: string
  readonly difficulty: QuestionDifficulty
  readonly createdAt: string
  readonly updatedAt: string
  readonly topicIds: readonly string[]
}

export interface QuestionFromApi {
  readonly id: string
  readonly title: string
  readonly difficulty: QuestionDifficulty
  readonly createdAt: string
  readonly updatedAt: string
  readonly topicIds: readonly string[]
}

export const toQuestion = (from: QuestionFromApi): Question => ({
  id: from.id as QuestionId,
  title: from.title,
  difficulty: from.difficulty,
  createdAt: from.createdAt,
  updatedAt: from.updatedAt,
  topicIds: from.topicIds,
})

export const createQuestionMeta = (params: {
  readonly id: QuestionId
  readonly title: string
  readonly difficulty: QuestionDifficulty
}): Pick<Question, 'id' | 'title' | 'difficulty'> => ({
  id: params.id,
  title: params.title,
  difficulty: params.difficulty,
})

import type { Question } from '../../question/model/types'
import { questions } from '../../../data/questions'

export const getQuestions = (): Question[] => questions

export const getCategories = (): string[] =>
  [...new Set(questions.map((q) => q.category))].sort()

export const getQuestionById = (id: string): Question | undefined =>
  questions.find((question) => question.id === id)

export const getQuestionsByCategory = (category: string): Question[] =>
  questions.filter((question) => question.category === category)

export const getRandomQuestion = (): Question | undefined => {
  if (questions.length === 0) return undefined
  const index = Math.floor(Math.random() * questions.length)
  return questions[index]
}

export const searchQuestions = (query: string): Question[] => {
  const normalizedQuery = query.trim().toLowerCase()

  if (normalizedQuery.length === 0) {
    return questions
  }

  return questions.filter((question) =>
    question.question.toLowerCase().includes(normalizedQuery),
  )
}


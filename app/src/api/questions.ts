import type { Question, QuestionFromApi } from '../features/questions'
import { toQuestion } from '../features/questions'
import { getApiBaseUrl } from './config'

export const fetchQuestions = async (): Promise<Question[]> => {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/api/questions`)
  if (!res.ok) {
    throw new Error(`Failed to fetch questions: ${res.status}`)
  }
  const data = (await res.json()) as QuestionFromApi[]
  return data.map(toQuestion)
}

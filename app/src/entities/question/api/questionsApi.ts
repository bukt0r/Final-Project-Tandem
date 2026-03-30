import type { AppLocale, Question } from '../../question/model/types'
import { toLocalizedQuestion } from '../../question/model/locale'
import { questionSources } from '../../../data/questionSources'

export { parseAppLocale } from '../../question/model/locale'

export interface CategoryOption {
  readonly key: string
  readonly label: string
}

function localizeAll(locale: AppLocale): Question[] {
  return questionSources.map((source) => toLocalizedQuestion(source, locale))
}

export const getQuestions = (locale: AppLocale): Question[] => localizeAll(locale)

export const getCategoryOptions = (locale: AppLocale): CategoryOption[] => {
  const seen = new Set<string>()
  const options: CategoryOption[] = []
  for (const q of localizeAll(locale)) {
    if (!seen.has(q.categoryKey)) {
      seen.add(q.categoryKey)
      options.push({ key: q.categoryKey, label: q.category })
    }
  }
  return options.sort((a, b) => a.label.localeCompare(b.label, locale === 'ru' ? 'ru' : 'en'))
}

export const getQuestionById = (id: string, locale: AppLocale): Question | undefined =>
  localizeAll(locale).find((question) => question.id === id)

export const getQuestionsByCategoryKey = (categoryKey: string, locale: AppLocale): Question[] =>
  localizeAll(locale).filter((question) => question.categoryKey === categoryKey)

export const getRandomQuestion = (locale: AppLocale): Question | undefined => {
  const list = localizeAll(locale)
  if (list.length === 0) return undefined
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}

export const searchQuestions = (query: string, locale: AppLocale): Question[] => {
  const list = localizeAll(locale)
  const normalizedQuery = query.trim().toLowerCase()

  if (normalizedQuery.length === 0) {
    return list
  }

  return list.filter((question) =>
    question.question.toLowerCase().includes(normalizedQuery),
  )
}

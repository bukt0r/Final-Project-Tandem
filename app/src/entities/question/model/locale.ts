import type { AppLocale, Question, QuestionSource } from './types'

export function parseAppLocale(language: string): AppLocale {
  return language.toLowerCase().startsWith('en') ? 'en' : 'ru'
}

export function toLocalizedQuestion(source: QuestionSource, locale: AppLocale): Question {
  return {
    id: source.id,
    question: source.question[locale],
    answer: source.answer[locale],
    category: source.category[locale],
    categoryKey: source.categoryKey,
    difficulty: source.difficulty,
    tags: [...source.tags[locale]],
  }
}

import type { AppLocale, Question, QuestionSource } from './types'

export function parseAppLocale(language: string): AppLocale {
  return language.toLowerCase().startsWith('en') ? 'en' : 'ru'
}

function resolveTags(tags: QuestionSource['tags'] | readonly string[], locale: AppLocale): string[] {
  if (Array.isArray(tags)) {
    if (tags.length === 0) return []
    if (typeof tags[0] === 'string') return tags.map(String)
  }
  const bilingual = tags as QuestionSource['tags']
  const localized: readonly string[] | undefined = bilingual[locale]
  return localized ? [...localized] : []
}

function resolveText(field: string | QuestionSource['question'], locale: AppLocale): string {
  if (typeof field === 'string') return field
  return field[locale] ?? ''
}

export function toLocalizedQuestion(source: QuestionSource, locale: AppLocale): Question {
  return {
    id: source.id,
    question: resolveText(source.question, locale),
    answer: resolveText(source.answer, locale),
    category: resolveText(source.category, locale),
    categoryKey: source.categoryKey ?? 'custom',
    difficulty: source.difficulty ?? 'medium',
    tags: resolveTags(source.tags, locale),
  }
}

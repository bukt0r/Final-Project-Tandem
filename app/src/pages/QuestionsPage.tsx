import type { FC, ChangeEvent } from 'react'
import { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { KnowledgeStatus } from '../entities/question/model/types'
import { getQuestions, getCategoryOptions, getQuestionsByCategoryKey, parseAppLocale } from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'
import { useDebounce, loadUserStorage, saveUserStorage } from '../shared'

const ALL_CATEGORIES = ''
const SEARCH_DEBOUNCE_MS = 300
const STORAGE_KEY_STATUS = 'knowledge-status'
const STORAGE_KEY_FAVORITES = 'favorites'

type StatusMap = Record<string, KnowledgeStatus>

const QuestionsPage: FC = () => {
  const { t, i18n } = useTranslation()
  const locale = useMemo(() => parseAppLocale(i18n.language), [i18n.language])
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(ALL_CATEGORIES)
  const [searchInput, setSearchInput] = useState('')
  const [statusMap, setStatusMap] = useState<StatusMap>(() => loadUserStorage<StatusMap>(STORAGE_KEY_STATUS, {}))
  const [favorites, setFavorites] = useState<string[]>(() => loadUserStorage<string[]>(STORAGE_KEY_FAVORITES, []))
  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS)

  const categoryOptions = useMemo(() => getCategoryOptions(locale), [locale])

  const filterCategoryKey = useMemo(() => {
    if (selectedCategoryKey === ALL_CATEGORIES) return ALL_CATEGORIES
    return categoryOptions.some((o) => o.key === selectedCategoryKey) ? selectedCategoryKey : ALL_CATEGORIES
  }, [selectedCategoryKey, categoryOptions])

  const questions = useMemo(() => {
    const base = filterCategoryKey === ALL_CATEGORIES
      ? getQuestions(locale)
      : getQuestionsByCategoryKey(filterCategoryKey, locale)

    const query = debouncedSearch.trim().toLowerCase()
    if (query.length === 0) return base

    return base.filter((q) => q.question.toLowerCase().includes(query))
  }, [filterCategoryKey, debouncedSearch, locale])

  const handleCategoryChange = useCallback((e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategoryKey(e.target.value)
  }, [])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value)
  }, [])

  const handleStatusChange = useCallback((questionId: string, status: KnowledgeStatus): void => {
    setStatusMap((prev) => {
      const next = { ...prev, [questionId]: status }
      saveUserStorage(STORAGE_KEY_STATUS, next)
      return next
    })
  }, [])

  const handleFavoriteToggle = useCallback((questionId: string): void => {
    setFavorites((prev) => {
      const next = prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
      saveUserStorage(STORAGE_KEY_FAVORITES, next)
      return next
    })
  }, [])

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">{t('questions.title')}</h1>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="sm:w-64">
          <label htmlFor="category-filter" className="block text-sm font-medium text-app-text-muted">
            {t('questions.categoryLabel')}
          </label>
          <select
            id="category-filter"
            value={filterCategoryKey}
            onChange={handleCategoryChange}
            className="mt-1 w-full rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text focus:border-app-accent focus:outline-none focus:ring-1 focus:ring-app-accent"
          >
            <option value={ALL_CATEGORIES}>{t('questions.allCategories')}</option>
            {categoryOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="search-input" className="block text-sm font-medium text-app-text-muted">
            {t('questions.searchLabel')}
          </label>
          <input
            id="search-input"
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder={t('questions.searchPlaceholder')}
            className="mt-1 w-full rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text placeholder:text-app-text-muted focus:border-app-accent focus:outline-none focus:ring-1 focus:ring-app-accent"
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-app-text-muted">
        {t('questions.found', { count: questions.length })}
      </p>

      {questions.length === 0 ? (
        <p className="mt-4 text-sm text-app-text-muted">{t('questions.empty')}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3" aria-label={t('questions.title')}>
          {questions.map((q) => (
            <li key={q.id}>
              <QuestionCard
                question={q}
                knowledgeStatus={statusMap[q.id] ?? 'none'}
                onStatusChange={handleStatusChange}
                isFavorite={favorites.includes(q.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default QuestionsPage

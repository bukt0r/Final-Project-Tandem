import type { FC, ChangeEvent } from 'react'
import { useState, useMemo, useCallback } from 'react'
import { getQuestions, getCategories, getQuestionsByCategory } from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'
import { useDebounce } from '../shared'

const ALL_CATEGORIES = ''
const SEARCH_DEBOUNCE_MS = 300

const QuestionsPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS)

  const categories = useMemo(() => getCategories(), [])

  const questions = useMemo(() => {
    const base = selectedCategory === ALL_CATEGORIES
      ? getQuestions()
      : getQuestionsByCategory(selectedCategory)

    const query = debouncedSearch.trim().toLowerCase()
    if (query.length === 0) return base

    return base.filter((q) => q.question.toLowerCase().includes(query))
  }, [selectedCategory, debouncedSearch])

  const handleCategoryChange = useCallback((e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(e.target.value)
  }, [])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value)
  }, [])

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">Вопросы</h1>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="sm:w-64">
          <label htmlFor="category-filter" className="block text-sm font-medium text-app-text-muted">
            Категория
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 w-full rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text focus:border-app-accent focus:outline-none focus:ring-1 focus:ring-app-accent"
          >
            <option value={ALL_CATEGORIES}>Все категории</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="search-input" className="block text-sm font-medium text-app-text-muted">
            Поиск
          </label>
          <input
            id="search-input"
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Введите текст для поиска..."
            className="mt-1 w-full rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text placeholder:text-app-text-muted focus:border-app-accent focus:outline-none focus:ring-1 focus:ring-app-accent"
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-app-text-muted">
        Найдено: {questions.length}
      </p>

      {questions.length === 0 ? (
        <p className="mt-4 text-sm text-app-text-muted">Вопросов не найдено.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3" aria-label="Список вопросов">
          {questions.map((q) => (
            <li key={q.id}>
              <QuestionCard question={q} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default QuestionsPage

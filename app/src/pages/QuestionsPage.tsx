import type { FC, ChangeEvent } from 'react'
import { useState, useMemo, useCallback } from 'react'
import { getQuestions, getCategories, getQuestionsByCategory } from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'

const ALL_CATEGORIES = ''

const QuestionsPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  const categories = useMemo(() => getCategories(), [])

  const questions = useMemo(
    () => (selectedCategory === ALL_CATEGORIES ? getQuestions() : getQuestionsByCategory(selectedCategory)),
    [selectedCategory],
  )

  const handleCategoryChange = useCallback((e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(e.target.value)
  }, [])

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">Вопросы</h1>

      <div className="mt-3">
        <label htmlFor="category-filter" className="block text-sm font-medium text-app-text-muted">
          Категория
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mt-1 w-full rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text focus:border-app-accent focus:outline-none focus:ring-1 focus:ring-app-accent sm:w-64"
        >
          <option value={ALL_CATEGORIES}>Все категории</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
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

import type { FC, FormEvent, ChangeEvent } from 'react'
import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { Difficulty } from '../entities/question/model/types'
import { loadUserStorage, saveUserStorage } from '../shared'

interface FormData {
  readonly question: string
  readonly answer: string
  readonly category: string
  readonly difficulty: Difficulty
}

const INITIAL_FORM: FormData = {
  question: '',
  answer: '',
  category: '',
  difficulty: 'medium',
}

const inputClass =
  'mt-1 w-full rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text placeholder:text-app-text-muted focus:border-app-accent focus:outline-none focus:ring-1 focus:ring-app-accent'

const AddQuestionPage: FC = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSubmitted(true)

    if (
      form.question.trim().length === 0 ||
      form.answer.trim().length === 0 ||
      form.category.trim().length === 0
    ) {
      return
    }

    const newQuestion = {
      id: `custom-${Date.now()}`,
      question: form.question.trim(),
      answer: form.answer.trim(),
      category: form.category.trim(),
      difficulty: form.difficulty,
      tags: [],
    }

    const existing = loadUserStorage<unknown[]>('custom-questions', [])
    saveUserStorage('custom-questions', [...existing, newQuestion])

    setForm(INITIAL_FORM)
    setSubmitted(false)
  }, [form])

  const isFieldInvalid = (value: string): boolean =>
    submitted && value.trim().length === 0

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">{t('addQuestion.title')}</h1>
      <p className="mt-1 text-sm text-app-text-muted">{t('addQuestion.description')}</p>

      <form onSubmit={handleSubmit} className="mt-4 flex max-w-lg flex-col gap-4" noValidate>
        <div>
          <label htmlFor="field-question" className="block text-sm font-medium text-app-text">
            {t('addQuestion.questionLabel')}
          </label>
          <textarea
            id="field-question"
            name="question"
            value={form.question}
            onChange={handleChange}
            rows={3}
            placeholder={t('addQuestion.questionPlaceholder')}
            className={`${inputClass} resize-y ${isFieldInvalid(form.question) ? 'border-rose-500' : ''}`}
          />
          {isFieldInvalid(form.question) && (
            <p className="mt-1 text-xs text-rose-600">{t('addQuestion.required')}</p>
          )}
        </div>

        <div>
          <label htmlFor="field-answer" className="block text-sm font-medium text-app-text">
            {t('addQuestion.answerLabel')}
          </label>
          <textarea
            id="field-answer"
            name="answer"
            value={form.answer}
            onChange={handleChange}
            rows={3}
            placeholder={t('addQuestion.answerPlaceholder')}
            className={`${inputClass} resize-y ${isFieldInvalid(form.answer) ? 'border-rose-500' : ''}`}
          />
          {isFieldInvalid(form.answer) && (
            <p className="mt-1 text-xs text-rose-600">{t('addQuestion.required')}</p>
          )}
        </div>

        <div>
          <label htmlFor="field-category" className="block text-sm font-medium text-app-text">
            {t('addQuestion.categoryLabel')}
          </label>
          <input
            id="field-category"
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder={t('addQuestion.categoryPlaceholder')}
            className={`${inputClass} ${isFieldInvalid(form.category) ? 'border-rose-500' : ''}`}
          />
          {isFieldInvalid(form.category) && (
            <p className="mt-1 text-xs text-rose-600">{t('addQuestion.required')}</p>
          )}
        </div>

        <div>
          <label htmlFor="field-difficulty" className="block text-sm font-medium text-app-text">
            {t('addQuestion.difficultyLabel')}
          </label>
          <select
            id="field-difficulty"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="easy">{t('difficulty.easy')}</option>
            <option value="medium">{t('difficulty.medium')}</option>
            <option value="hard">{t('difficulty.hard')}</option>
          </select>
        </div>

        <button
          type="submit"
          className="self-start rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
        >
          {t('addQuestion.save')}
        </button>
      </form>
    </section>
  )
}

export default AddQuestionPage

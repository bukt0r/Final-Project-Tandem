import type { FC } from 'react'
import { useState, useCallback } from 'react'
import type { Question } from '../entities/question/model/types'
import { getRandomQuestion, getQuestions } from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'

const HomePage: FC = () => {
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null)
  const totalQuestions = getQuestions().length

  const handleRandom = useCallback((): void => {
    const q = getRandomQuestion()
    if (q) setRandomQuestion(q)
  }, [])

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">Tech Interview Trainer</h1>
      <p className="mt-2 text-sm text-app-text-muted">
        Тренажёр для подготовки к техническим интервью. Всего вопросов: {totalQuestions}.
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleRandom}
          className="rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
        >
          Случайный вопрос
        </button>
      </div>

      {randomQuestion !== null && (
        <div className="mt-4">
          <QuestionCard question={randomQuestion} />
        </div>
      )}
    </section>
  )
}

export default HomePage

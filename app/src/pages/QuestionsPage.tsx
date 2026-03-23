import type { FC } from 'react'
import { getQuestions } from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'

const QuestionsPage: FC = () => {
  const questions = getQuestions()

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">Вопросы</h1>
      <p className="mt-1 text-sm text-app-text-muted">
        Всего: {questions.length}
      </p>
      {questions.length === 0 ? (
        <p className="mt-4 text-sm text-app-text-muted">Вопросов пока нет.</p>
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

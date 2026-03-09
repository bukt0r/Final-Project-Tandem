import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { Question } from '../features/questions'
import { fetchQuestions } from '../api'
import { QuestionCard } from '../ui'

type QuestionsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: readonly Question[] }

const QuestionsPage: FC = () => {
  const [state, setState] = useState<QuestionsState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    const load = async (): Promise<void> => {
      try {
        const data = await fetchQuestions()
        if (!cancelled) {
          setState({ status: 'success', data })
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load questions'
          setState({ status: 'error', message })
        }
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === 'loading') {
    return (
      <section className="px-4 py-6">
        <h1 className="text-xl font-semibold text-slate-50">Questions</h1>
        <p className="mt-4 text-sm text-slate-400">Loading…</p>
      </section>
    )
  }

  if (state.status === 'error') {
    return (
      <section className="px-4 py-6">
        <h1 className="text-xl font-semibold text-slate-50">Questions</h1>
        <p className="mt-4 text-sm text-rose-400" role="alert">
          {state.message}
        </p>
      </section>
    )
  }

  const questions = state.data

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-slate-50">Questions</h1>
      <p className="mt-1 text-sm text-slate-400">
        {questions.length} {questions.length === 1 ? 'question' : 'questions'}
      </p>
      <ul className="mt-4 flex flex-col gap-3" aria-label="Questions list">
        {questions.length === 0 ? (
          <li className="text-sm text-slate-400">No questions yet.</li>
        ) : (
          questions.map((q) => (
            <li key={q.id}>
              <QuestionCard question={q} />
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default QuestionsPage

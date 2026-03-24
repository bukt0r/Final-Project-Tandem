import type { FC } from 'react'
import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { getQuestions } from '../entities/question/api/questionsApi'
import { generateQuiz } from '../entities/quiz'
import type { QuizQuestion } from '../entities/quiz'
import { addQuizResult } from '../entities/statistics'
import { DifficultyBadge } from '../ui/DifficultyBadge'

const QUIZ_SIZE = 10

type AnswerState = 'idle' | 'correct' | 'wrong'

interface QuizState {
  readonly questions: readonly QuizQuestion[]
  readonly currentIndex: number
  readonly selectedOptionId: string | null
  readonly answerState: AnswerState
  readonly isFinished: boolean
  readonly correctCount: number
}

function createInitialState(questions: readonly QuizQuestion[]): QuizState {
  return {
    questions,
    currentIndex: 0,
    selectedOptionId: null,
    answerState: 'idle',
    isFinished: false,
    correctCount: 0,
  }
}

const QuizPage: FC = () => {
  const allQuestions = useMemo(() => getQuestions(), [])

  const [state, setState] = useState<QuizState>(() =>
    createInitialState(generateQuiz(allQuestions, QUIZ_SIZE)),
  )

  const currentQuestion = state.questions[state.currentIndex]

  const handleSelectOption = useCallback((optionId: string): void => {
    setState((prev) => {
      if (prev.answerState !== 'idle') return prev

      const current = prev.questions[prev.currentIndex]
      const selected = current.options.find((o) => o.id === optionId)
      if (!selected) return prev

      const isCorrect = selected.isCorrect

      return {
        ...prev,
        selectedOptionId: optionId,
        answerState: isCorrect ? 'correct' : 'wrong',
        correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
      }
    })
  }, [])

  const handleNext = useCallback((): void => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1
      if (nextIndex >= prev.questions.length) {
        return { ...prev, isFinished: true }
      }
      return {
        ...prev,
        currentIndex: nextIndex,
        selectedOptionId: null,
        answerState: 'idle',
      }
    })
  }, [])

  const savedRef = useRef(false)

  useEffect(() => {
    if (state.isFinished && !savedRef.current) {
      savedRef.current = true
      addQuizResult(state.correctCount, state.questions.length)
    }
  }, [state.isFinished, state.correctCount, state.questions.length])

  const handleRestart = useCallback((): void => {
    savedRef.current = false
    setState(createInitialState(generateQuiz(allQuestions, QUIZ_SIZE)))
  }, [allQuestions])

  if (state.isFinished) {
    const total = state.questions.length
    const correct = state.correctCount
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

    return (
      <section className="px-4 py-6">
        <h1 className="text-xl font-semibold text-app-text">Результаты</h1>
        <div className="mt-4 rounded-lg border border-app-border bg-app-surface p-6 text-center">
          <p className="text-3xl font-bold text-app-text">{correct} / {total}</p>
          <p className="mt-1 text-sm text-app-text-muted">{percentage}% правильных ответов</p>
          <button
            type="button"
            onClick={handleRestart}
            className="mt-4 rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
          >
            Пройти ещё раз
          </button>
        </div>
      </section>
    )
  }

  if (!currentQuestion) return null

  const { question, options } = currentQuestion

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-app-text">Квиз</h1>
        <span className="text-sm text-app-text-muted">
          {state.currentIndex + 1} / {state.questions.length}
        </span>
      </div>

      <div className="mt-4 rounded-lg border border-app-border bg-app-surface p-4">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="text-xs text-app-text-muted">{question.category}</span>
        </div>
        <p className="mt-3 text-sm font-medium text-app-text">{question.question}</p>
      </div>

      <ul className="mt-4 flex flex-col gap-2" aria-label="Варианты ответа">
        {options.map((option) => {
          let optionStyle = 'border-app-border bg-app-surface hover:bg-app-bg'

          if (state.answerState !== 'idle') {
            if (option.isCorrect) {
              optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700'
            } else if (option.id === state.selectedOptionId) {
              optionStyle = 'border-rose-500 bg-rose-50 text-rose-700'
            } else {
              optionStyle = 'border-app-border bg-app-surface opacity-50'
            }
          }

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => handleSelectOption(option.id)}
                disabled={state.answerState !== 'idle'}
                className={`w-full rounded-lg border p-3 text-left text-sm transition ${optionStyle}`}
              >
                {option.text}
              </button>
            </li>
          )
        })}
      </ul>

      {state.answerState !== 'idle' && (
        <div className="mt-4">
          <p className={`text-sm font-medium ${state.answerState === 'correct' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {state.answerState === 'correct' ? 'Правильно!' : 'Неправильно!'}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="mt-2 rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
          >
            {state.currentIndex + 1 < state.questions.length ? 'Следующий вопрос' : 'Результаты'}
          </button>
        </div>
      )}
    </section>
  )
}

export default QuizPage

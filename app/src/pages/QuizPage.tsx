import type { FC } from 'react'
import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { AppLocale } from '../entities/question/model/types'
import { getQuestions, parseAppLocale } from '../entities/question/api/questionsApi'
import { generateQuiz } from '../entities/quiz'
import type { QuizQuestion } from '../entities/quiz'
import { addQuizResult } from '../entities/statistics'
import { DifficultyBadge } from '../ui/DifficultyBadge'
import {
  bumpQuizSfxSession,
  playQuizAnswerSfx,
  playQuizStartSfx,
  useCountdown,
  useQuizSfx,
} from '../shared'

const QUIZ_SIZE = 10
const SECONDS_PER_QUESTION = 30

type AnswerState = 'idle' | 'correct' | 'wrong' | 'timeout'

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

interface QuizPageInnerProps {
  readonly locale: AppLocale
}

const QuizPageInner: FC<QuizPageInnerProps> = ({ locale }) => {
  const { t } = useTranslation()
  const { muted } = useQuizSfx()
  const allQuestions = useMemo(() => getQuestions(locale), [locale])

  const [state, setState] = useState<QuizState>(() =>
    createInitialState(generateQuiz(getQuestions(locale), QUIZ_SIZE)),
  )
  const [quizStarted, setQuizStarted] = useState(false)

  const savedRef = useRef(false)

  useEffect(() => {
    bumpQuizSfxSession()
  }, [locale])

  const handleTimeout = useCallback((): void => {
    setState((prev) => {
      if (prev.answerState !== 'idle') return prev
      return { ...prev, answerState: 'timeout' }
    })
  }, [])

  const { secondsLeft, stop, reset } = useCountdown(handleTimeout)

  useEffect(() => {
    if (!quizStarted) {
      stop()
    }
  }, [quizStarted, stop])

  useEffect(() => {
    if (!quizStarted || state.isFinished || state.answerState !== 'idle') return
    reset(SECONDS_PER_QUESTION)
  }, [quizStarted, state.currentIndex, state.isFinished, state.answerState, reset])

  const currentQuestion = state.questions[state.currentIndex]

  const handleSelectOption = useCallback((optionId: string): void => {
    setState((prev) => {
      if (prev.answerState !== 'idle') return prev

      const current = prev.questions[prev.currentIndex]
      if (!current) return prev
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
    stop()
  }, [stop])

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

  useEffect(() => {
    if (state.isFinished && !savedRef.current) {
      savedRef.current = true
      addQuizResult(state.correctCount, state.questions.length)
    }
  }, [state.isFinished, state.correctCount, state.questions.length])

  const handleRestart = useCallback((): void => {
    bumpQuizSfxSession()
    savedRef.current = false
    setQuizStarted(false)
    setState(createInitialState(generateQuiz(allQuestions, QUIZ_SIZE)))
  }, [allQuestions])

  useEffect(() => {
    if (!quizStarted || state.answerState === 'idle') return
    const kind = state.answerState === 'correct' ? 'correct' : 'wrong'
    playQuizAnswerSfx(state.currentIndex, kind, muted)
  }, [quizStarted, state.answerState, state.currentIndex, muted])

  if (state.isFinished) {
    const total = state.questions.length
    const correct = state.correctCount
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

    return (
      <section className="px-4 py-6">
        <h1 className="text-xl font-semibold text-app-text">{t('quiz.resultsTitle')}</h1>
        <div className="mt-4 rounded-lg border border-app-border bg-app-surface p-6 text-center">
          <p className="text-3xl font-bold text-app-text">{t('quiz.score', { correct, total })}</p>
          <p className="mt-1 text-sm text-app-text-muted">{t('quiz.accuracy', { percent: percentage })}</p>
          <button
            type="button"
            onClick={handleRestart}
            className="mt-4 rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
          >
            {t('quiz.restart')}
          </button>
        </div>
      </section>
    )
  }

  if (!quizStarted) {
    return (
      <section className="px-4 py-6">
        <h1 className="text-xl font-semibold text-app-text">{t('quiz.title')}</h1>
        <p className="mt-3 text-sm text-app-text-muted">
          {t('quiz.intro', { questions: QUIZ_SIZE, seconds: SECONDS_PER_QUESTION })}
        </p>
        <button
          type="button"
          onClick={() => {
            playQuizStartSfx(muted)
            setQuizStarted(true)
          }}
          className="mt-6 rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
        >
          {t('quiz.start')}
        </button>
      </section>
    )
  }

  if (!currentQuestion) return null

  const { question, options } = currentQuestion
  const isAnswered = state.answerState !== 'idle'
  const timerColor = secondsLeft <= 5 ? 'text-rose-600 border-rose-300 bg-rose-50' : secondsLeft <= 10 ? 'text-amber-600 border-amber-300 bg-amber-50' : 'text-app-accent border-app-accent/30 bg-app-accent/5'

  return (
    <section className="px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-app-text">{t('quiz.title')}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-app-text-muted">
            {t('quiz.progress', { current: state.currentIndex + 1, total: state.questions.length })}
          </span>
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-md border border-app-border bg-app-surface px-3 py-1.5 text-sm font-medium text-app-text transition hover:border-app-accent hover:bg-app-bg"
          >
            {t('quiz.startOver')}
          </button>
        </div>
      </div>

      {!isAnswered && (
        <div className="mt-3 flex justify-center">
          <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-lg font-bold tabular-nums transition-colors ${timerColor}`}>
            {t('quiz.timer', { seconds: secondsLeft })}
          </span>
        </div>
      )}

      <div className="mt-4 rounded-lg border border-app-border bg-app-surface p-4">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="text-xs text-app-text-muted">{question.category}</span>
        </div>
        <p className="mt-3 text-sm font-medium text-app-text">{question.question}</p>
      </div>

      <ul className="mt-4 flex flex-col gap-2" aria-label={t('quiz.title')}>
        {options.map((option) => {
          let optionStyle = 'border-app-border bg-app-surface hover:bg-app-bg'

          if (isAnswered) {
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
                disabled={isAnswered}
                className={`w-full rounded-lg border p-3 text-left text-sm transition ${optionStyle}`}
              >
                {option.text}
              </button>
            </li>
          )
        })}
      </ul>

      {isAnswered && (
        <div className="mt-4">
          <p className={`text-sm font-medium ${
            state.answerState === 'correct' ? 'text-emerald-600'
            : state.answerState === 'timeout' ? 'text-amber-600'
            : 'text-rose-600'
          }`}>
            {state.answerState === 'correct'
              ? t('quiz.correct')
              : state.answerState === 'timeout'
                ? t('quiz.timeUp')
                : t('quiz.wrong')}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="mt-2 rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
          >
            {state.currentIndex + 1 < state.questions.length ? t('quiz.next') : t('quiz.showResults')}
          </button>
        </div>
      )}
    </section>
  )
}

const QuizPage: FC = () => {
  const { i18n } = useTranslation()
  const locale = useMemo(() => parseAppLocale(i18n.language), [i18n.language])

  return <QuizPageInner key={locale} locale={locale} />
}

export default QuizPage

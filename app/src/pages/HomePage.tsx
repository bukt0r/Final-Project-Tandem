import type { FC } from 'react'
import { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getRandomQuestion, getQuestions, getQuestionById, parseAppLocale } from '../entities/question/api/questionsApi'
import { QuestionCard } from '../ui'

const HomePage: FC = () => {
  const { t, i18n } = useTranslation()
  const [randomQuestionId, setRandomQuestionId] = useState<string | null>(null)
  const locale = useMemo(() => parseAppLocale(i18n.language), [i18n.language])
  const totalQuestions = useMemo(() => getQuestions(locale).length, [locale])
  const randomQuestion = useMemo(
    () => (randomQuestionId === null ? null : getQuestionById(randomQuestionId, locale) ?? null),
    [randomQuestionId, locale],
  )

  const handleRandom = useCallback((): void => {
    const q = getRandomQuestion(locale)
    if (q) setRandomQuestionId(q.id)
  }, [locale])

  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">{t('home.title')}</h1>
      <p className="mt-2 text-sm text-app-text-muted">
        {t('home.description')} {t('home.totalQuestions', { count: totalQuestions })}
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleRandom}
          className="rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
        >
          {t('home.randomButton')}
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

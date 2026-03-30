import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuizSfx } from '../shared'

export const QuizSoundToggle: FC = () => {
  const { t } = useTranslation()
  const { muted, toggleMuted } = useQuizSfx()

  return (
    <button
      type="button"
      onClick={toggleMuted}
      className="rounded-md p-2 text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text"
      aria-label={muted ? t('quiz.soundTurnOn') : t('quiz.soundTurnOff')}
      aria-pressed={muted}
    >
      {muted ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M11 5 6 9H2v6h4l5 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m22 9-6 6M16 9l6 6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M11 5 6 9H2v6h4l5 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a9 9 0 0 1 0 14.14" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}

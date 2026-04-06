import type { FC, MouseEvent } from 'react'
import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { Question, KnowledgeStatus } from '../entities/question/model/types'
import { DifficultyBadge } from './DifficultyBadge'
import { FormattedText } from './FormattedText'
import { useSpeech } from '../shared'

export interface QuestionCardProps {
  readonly question: Question
  readonly knowledgeStatus?: KnowledgeStatus
  readonly onStatusChange?: (questionId: string, status: KnowledgeStatus) => void
  readonly isFavorite?: boolean
  readonly onFavoriteToggle?: (questionId: string) => void
  readonly isCustom?: boolean
  readonly onDelete?: (questionId: string) => void
}

const borderByStatus: Record<KnowledgeStatus, string> = {
  known: 'border-l-emerald-500',
  unknown: 'border-l-rose-500',
  none: 'border-l-transparent',
}

const statusKeys: Record<KnowledgeStatus, string> = {
  known: 'card.known',
  unknown: 'card.unknown',
  none: '',
}

const statusBadgeStyle: Record<KnowledgeStatus, string> = {
  known: 'bg-emerald-100 text-emerald-700',
  unknown: 'bg-rose-100 text-rose-700',
  none: '',
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  knowledgeStatus = 'none',
  onStatusChange,
  isFavorite = false,
  onFavoriteToggle,
  isCustom = false,
  onDelete,
}) => {
  const { t, i18n } = useTranslation()
  const [isFlipped, setIsFlipped] = useState(false)
  const speechLang = i18n.language === 'en' ? 'en-US' : 'ru-RU'
  const { isSpeaking, isSupported: isSpeechSupported, speak, stop: stopSpeech } = useSpeech(speechLang)

  const handleSpeak = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    if (isSpeaking) {
      stopSpeech()
    } else {
      const text = isFlipped ? question.answer : question.question
      speak(text)
    }
  }, [isSpeaking, isFlipped, question.answer, question.question, speak, stopSpeech])

  const handleFlip = useCallback((): void => {
    setIsFlipped((prev) => !prev)
  }, [])

  const handleKnown = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onStatusChange?.(question.id, knowledgeStatus === 'known' ? 'none' : 'known')
  }, [question.id, knowledgeStatus, onStatusChange])

  const handleUnknown = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onStatusChange?.(question.id, knowledgeStatus === 'unknown' ? 'none' : 'unknown')
  }, [question.id, knowledgeStatus, onStatusChange])

  const handleFavorite = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onFavoriteToggle?.(question.id)
  }, [question.id, onFavoriteToggle])

  const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onDelete?.(question.id)
  }, [question.id, onDelete])

  return (
    <article
      className={`cursor-pointer rounded-lg border border-app-border border-l-4 bg-app-surface p-4 shadow-sm transition hover:shadow-md ${borderByStatus[knowledgeStatus]}`}
      aria-labelledby={`question-title-${question.id}`}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleFlip()
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={question.difficulty} className="shrink-0" />
          {knowledgeStatus !== 'none' && (
            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${statusBadgeStyle[knowledgeStatus]}`}>
              {t(statusKeys[knowledgeStatus])}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isSpeechSupported && (
            <button
              type="button"
              onClick={handleSpeak}
              className={`text-base transition ${isSpeaking ? 'text-app-accent' : 'text-gray-300 hover:text-app-accent'}`}
              aria-label={isSpeaking ? t('card.stopSpeaking') : t('card.speak')}
            >
              {isSpeaking ? '\u23F9' : '\u25B6'}
            </button>
          )}
          <button
            type="button"
            onClick={handleFavorite}
            className={`text-lg transition ${isFavorite ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'}`}
            aria-label={isFavorite ? t('card.removeFavorite') : t('card.addFavorite')}
          >
            {isFavorite ? '\u2605' : '\u2606'}
          </button>
          <span className="text-xs text-app-text-muted">
            {isFlipped ? t('card.answer') : t('card.question')}
          </span>
        </div>
      </div>

      <div className="mt-3 text-sm text-app-text">
        <FormattedText text={isFlipped ? question.answer : question.question} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded bg-app-bg px-2 py-0.5 text-xs text-app-text-muted">
            {question.category}
          </span>
          {isCustom ? (
            <span className="inline-block rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
              {t('card.custom')}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {isCustom && onDelete ? (
            <button
              type="button"
              onClick={handleDelete}
              className="text-xs text-rose-400 transition hover:text-rose-600"
            >
              {t('card.delete')}
            </button>
          ) : null}
          <span className="text-xs text-app-accent">
            {isFlipped ? t('card.flipToQuestion') : t('card.flipToAnswer')}
          </span>
        </div>
      </div>

      {isFlipped && (
        <div className="mt-3 flex gap-2 border-t border-app-border pt-3">
          <button
            type="button"
            onClick={handleKnown}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              knowledgeStatus === 'known'
                ? 'bg-emerald-500 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {t('card.know')}
          </button>
          <button
            type="button"
            onClick={handleUnknown}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              knowledgeStatus === 'unknown'
                ? 'bg-rose-500 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            {t('card.dontKnow')}
          </button>
        </div>
      )}
    </article>
  )
}

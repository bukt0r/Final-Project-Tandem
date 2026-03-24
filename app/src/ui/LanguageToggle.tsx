import type { FC } from 'react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { saveToStorage } from '../shared'
import { I18N_STORAGE_KEY } from '../i18n'

export const LanguageToggle: FC = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  const handleToggle = useCallback((): void => {
    const next = currentLang === 'ru' ? 'en' : 'ru'
    void i18n.changeLanguage(next)
    saveToStorage(I18N_STORAGE_KEY, next)
  }, [currentLang, i18n])

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-md px-2 py-1 text-xs font-medium text-app-text-muted transition hover:bg-app-surface-hover hover:text-app-text"
      aria-label={currentLang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      {currentLang === 'ru' ? 'EN' : 'RU'}
    </button>
  )
}

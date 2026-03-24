import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ru } from './locales/ru'
import { en } from './locales/en'

const STORAGE_KEY = 'language'

function getSavedLanguage(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as string
      if (parsed === 'ru' || parsed === 'en') return parsed
    }
  } catch {
    // ignore
  }
  return 'ru'
}

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: getSavedLanguage(),
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
})

export { i18n, STORAGE_KEY }

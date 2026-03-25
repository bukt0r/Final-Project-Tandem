import { useState, useCallback, useEffect, useRef } from 'react'

interface UseSpeechResult {
  readonly isSpeaking: boolean
  readonly isSupported: boolean
  readonly speak: (text: string) => void
  readonly stop: () => void
}

export function useSpeech(lang = 'ru-RU'): UseSpeechResult {
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const stop = useCallback((): void => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [isSupported])

  const speak = useCallback((text: string): void => {
    if (!isSupported) return

    stop()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }, [isSupported, lang, stop])

  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isSupported])

  return { isSpeaking, isSupported, speak, stop }
}

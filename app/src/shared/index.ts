export type NonEmptyArray<T> = readonly [T, ...T[]]

export const isNonEmptyArray = <T>(value: readonly T[]): value is NonEmptyArray<T> =>
  value.length > 0

export { useDebounce } from './useDebounce'
export {
  loadFromStorage,
  saveToStorage,
  loadUserStorage,
  saveUserStorage,
  setStorageUserPrefix,
} from './storage'
export { useTheme } from './useTheme'
export { useCountdown } from './useCountdown'
export { useSpeech } from './useSpeech'
export { QuizSfxProvider } from './QuizSfxProvider'
export { useQuizSfx } from './useQuizSfx'
export type { QuizSfxContextValue } from './quizSfxContextValue'
export { bumpQuizSfxSession, playQuizStartSfx, playQuizAnswerSfx } from './quizSfxAudio'

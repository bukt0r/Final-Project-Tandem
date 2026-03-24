export type NonEmptyArray<T> = readonly [T, ...T[]]

export const isNonEmptyArray = <T>(value: readonly T[]): value is NonEmptyArray<T> =>
  value.length > 0

export { useDebounce } from './useDebounce'
export { loadFromStorage, saveToStorage } from './storage'
export { useTheme } from './useTheme'

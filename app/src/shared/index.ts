export type NonEmptyArray<T> = readonly [T, ...T[]]

export const isNonEmptyArray = <T>(value: readonly T[]): value is NonEmptyArray<T> =>
  value.length > 0

export interface ProgressSummary {
  readonly totalAnswered: number
  readonly correct: number
}

export const calculateAccuracy = (summary: ProgressSummary): number => {
  if (summary.totalAnswered === 0) {
    return 0
  }

  return summary.correct / summary.totalAnswered
}

export type TestMode = 'practice' | 'exam'

export interface TestSession {
  readonly id: string
  readonly mode: TestMode
  readonly startedAt: Date
}

export const startTestSession = (mode: TestMode, now: Date): TestSession => ({
  id: `${mode}-${now.getTime()}`,
  mode,
  startedAt: now,
})

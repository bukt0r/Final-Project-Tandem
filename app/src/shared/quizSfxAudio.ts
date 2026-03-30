export type QuizSfxKind = 'start' | 'correct' | 'wrong'

let sfxSessionCounter = 0
let lastDedupKey = ''

let audioContext: AudioContext | null = null

/** New quiz round — call on quiz mount (locale), restart, or new question set. */
export function bumpQuizSfxSession(): void {
  sfxSessionCounter += 1
}

function getAudioContext(): AudioContext {
  audioContext ??= new AudioContext()
  return audioContext
}

function scheduleBeep(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  type: OscillatorType = 'sine',
  peakVolume = 0.12,
): void {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, startTime)
  const nearZero = 0.0001
  gain.gain.setValueAtTime(nearZero, startTime)
  gain.gain.exponentialRampToValueAtTime(peakVolume, startTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(nearZero, startTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.04)
}

async function playKind(kind: QuizSfxKind): Promise<void> {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }
  const t = ctx.currentTime

  if (kind === 'start') {
    scheduleBeep(ctx, 523.25, t, 0.07)
    scheduleBeep(ctx, 659.25, t + 0.085, 0.07)
    scheduleBeep(ctx, 783.99, t + 0.17, 0.11)
  } else if (kind === 'correct') {
    scheduleBeep(ctx, 523.25, t, 0.09)
    scheduleBeep(ctx, 659.25, t + 0.095, 0.14)
  } else {
    scheduleBeep(ctx, 185, t, 0.12, 'square', 0.07)
    scheduleBeep(ctx, 130, t + 0.11, 0.18, 'square', 0.06)
  }
}

/** Call from the Start button (user gesture unlocks AudioContext). */
export function playQuizStartSfx(muted: boolean): void {
  if (muted) return
  const key = `${sfxSessionCounter}:start`
  if (lastDedupKey === key) return
  lastDedupKey = key
  void playKind('start')
}

export function playQuizAnswerSfx(
  questionIndex: number,
  kind: 'correct' | 'wrong',
  muted: boolean,
): void {
  if (muted) return
  const key = `${sfxSessionCounter}:${questionIndex}:${kind}`
  if (lastDedupKey === key) return
  lastDedupKey = key
  void playKind(kind)
}

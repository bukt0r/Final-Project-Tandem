import { useState, useEffect, useCallback, useRef } from 'react'

interface UseCountdownResult {
  readonly secondsLeft: number
  readonly isRunning: boolean
  readonly start: (seconds: number) => void
  readonly stop: () => void
  readonly reset: (seconds: number) => void
}

export function useCountdown(onComplete: () => void): UseCountdownResult {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onCompleteRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [isRunning, secondsLeft])

  const start = useCallback((seconds: number): void => {
    setSecondsLeft(seconds)
    setIsRunning(true)
  }, [])

  const stop = useCallback((): void => {
    setIsRunning(false)
  }, [])

  const reset = useCallback((seconds: number): void => {
    setSecondsLeft(seconds)
    setIsRunning(true)
  }, [])

  return { secondsLeft, isRunning, start, stop, reset }
}

import type { FC } from 'react'

export interface ErrorMessageProps {
  readonly message?: string
  readonly onRetry?: () => void
}

export const ErrorMessage: FC<ErrorMessageProps> = ({
  message = 'Что-то пошло не так. Попробуйте снова.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-app-border bg-app-surface px-6 py-8 text-center" role="alert">
      <p className="text-sm text-app-danger">{message}</p>
      {onRetry != null && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
        >
          Попробовать снова
        </button>
      )}
    </div>
  )
}

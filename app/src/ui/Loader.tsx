import type { FC } from 'react'

export interface LoaderProps {
  readonly text?: string
  readonly className?: string
}

export const Loader: FC<LoaderProps> = ({ text = 'Загрузка...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`.trim()} role="status">
      <div className="h-8 w-8 animate-spin rounded-full border-3 border-app-border border-t-app-accent" />
      <span className="text-sm text-app-text-muted">{text}</span>
    </div>
  )
}

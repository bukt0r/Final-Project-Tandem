import type { FC } from 'react'
import { useRouteError, Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../routing/routePaths'

const isChunkLoadError = (error: unknown): boolean => {
  if (error instanceof TypeError && error.message.includes('dynamically imported module')) {
    return true
  }
  return false
}

export const RouteErrorFallback: FC = () => {
  const error = useRouteError()
  const isOffline = isChunkLoadError(error)

  const title = isOffline ? 'Нет подключения к сети' : 'Что-то пошло не так'
  const description = isOffline
    ? 'Не удалось загрузить страницу. Проверьте подключение к интернету и попробуйте снова.'
    : 'Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.'

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-app-bg px-4 py-20 text-center text-app-text">
      <h1 className="text-xl font-semibold text-app-text">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-app-text-muted">{description}</p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => {
            window.location.reload()
          }}
          className="rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
        >
          Перезагрузить
        </button>
        <Link
          to={ROUTE_PATHS.home}
          className="rounded-md border border-app-border px-4 py-2 text-sm font-medium text-app-text transition hover:bg-app-surface-hover"
        >
          На главную
        </Link>
      </div>
    </section>
  )
}

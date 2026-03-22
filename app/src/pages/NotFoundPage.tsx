import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../routing/routePaths'

const NotFoundPage: FC = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <span className="text-7xl font-bold text-app-accent">404</span>
      <h1 className="mt-4 text-2xl font-semibold text-app-text">Страница не найдена</h1>
      <p className="mt-2 text-sm text-app-text-muted">
        Такой страницы не существует или она была удалена.
      </p>
      <Link
        to={ROUTE_PATHS.home}
        className="mt-6 inline-flex items-center rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover"
      >
        На главную
      </Link>
    </section>
  )
}

export default NotFoundPage

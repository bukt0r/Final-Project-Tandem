import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { ROUTE_PATHS } from './routePaths'
import { Layout } from '../layout'
import { RouteErrorFallback } from '../ui/RouteErrorFallback'

const lazyPage = (importFn: () => Promise<{ default: ComponentType }>): LazyExoticComponent<ComponentType> =>
  lazy(importFn)

const HomePage = lazyPage(() => import('../pages/HomePage'))
const QuestionsPage = lazyPage(() => import('../pages/QuestionsPage'))
const QuizPage = lazyPage(() => import('../pages/QuizPage'))
const StatisticsPage = lazyPage(() => import('../pages/StatisticsPage'))
const FavoritesPage = lazyPage(() => import('../pages/FavoritesPage'))
const NotFoundPage = lazyPage(() => import('../pages/NotFoundPage'))

const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.home,
    element: <Layout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'questions', element: <QuestionsPage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'statistics', element: <StatisticsPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)

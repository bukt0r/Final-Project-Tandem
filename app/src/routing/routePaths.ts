export const ROUTE_PATHS = {
  home: '/',
  questions: '/questions',
  quiz: '/quiz',
  statistics: '/statistics',
  favorites: '/favorites',
} as const

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS]

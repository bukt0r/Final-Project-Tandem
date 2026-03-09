import type { FC } from 'react'

const FavoritesPage: FC = () => {
  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">Favorites</h1>
      <p className="mt-2 text-sm text-app-text-muted">Favorite questions will appear here.</p>
    </section>
  )
}

export default FavoritesPage

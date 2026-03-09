import type { FC } from 'react'

const HomePage: FC = () => {
  return (
    <section className="px-4 py-6">
      <h1 className="text-xl font-semibold text-app-text">Home</h1>
      <p className="mt-2 text-sm text-app-text-muted">Welcome to Tech Interview Trainer. Navigate using the header.</p>
    </section>
  )
}

export default HomePage

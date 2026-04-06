import type { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routing'
import { AuthProvider, useAuth } from './entities/auth'
import LoginPage from './pages/LoginPage'

const AuthGate: FC = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <RouterProvider router={router} />
}

const App: FC = () => {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  )
}

export default App

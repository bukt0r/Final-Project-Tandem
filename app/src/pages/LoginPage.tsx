import type { FC, FormEvent } from 'react'
import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../entities/auth'
import { LanguageToggle } from '../ui/LanguageToggle'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useTheme } from '../shared'

type AuthMode = 'login' | 'register'

const inputClass =
  'mt-1 w-full rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text placeholder:text-app-text-muted focus:border-app-accent focus:outline-none focus:ring-1 focus:ring-app-accent'

const LoginPage: FC = () => {
  const { t } = useTranslation()
  const { login, register } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const [mode, setMode] = useState<AuthMode>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      setError(null)
      setLoading(true)

      const result =
        mode === 'login'
          ? await login(username, password)
          : await register(username, password)

      setLoading(false)

      if (!result.ok) {
        const errorKey =
          result.error === 'credentials'
            ? 'auth.errorCredentials'
            : result.error === 'exists'
              ? 'auth.errorExists'
              : 'auth.errorInvalid'
        setError(t(errorKey))
      }
    },
    [mode, username, password, login, register, t],
  )

  const toggleMode = useCallback((): void => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
    setError(null)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-app-bg">
      <div className="flex justify-end gap-2 px-4 py-3">
        <LanguageToggle />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-app-text">
              {t('auth.welcome')}
            </h1>
            <p className="mt-2 text-sm text-app-text-muted">
              {t('auth.welcomeDescription')}
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-app-border bg-app-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-app-text">
              {mode === 'login' ? t('auth.loginTitle') : t('auth.registerTitle')}
            </h2>

            <form onSubmit={(e) => void handleSubmit(e)} className="mt-4 flex flex-col gap-4" noValidate>
              <div>
                <label htmlFor="auth-username" className="block text-sm font-medium text-app-text">
                  {t('auth.username')}
                </label>
                <input
                  id="auth-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('auth.usernamePlaceholder')}
                  className={inputClass}
                  autoComplete="username"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="auth-password" className="block text-sm font-medium text-app-text">
                  {t('auth.password')}
                </label>
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.passwordPlaceholder')}
                  className={inputClass}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
              </div>

              {error ? (
                <p className="text-sm text-rose-600">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-app-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-app-accent-hover disabled:opacity-60"
              >
                {mode === 'login' ? t('auth.loginButton') : t('auth.registerButton')}
              </button>
            </form>

            <button
              type="button"
              onClick={toggleMode}
              className="mt-4 w-full text-center text-sm text-app-accent transition hover:underline"
            >
              {mode === 'login' ? t('auth.switchToRegister') : t('auth.switchToLogin')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

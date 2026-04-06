import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './authContextValue'
import {
  getCurrentUsername,
  loginUser,
  registerUser,
  logoutUser,
} from './authService'
import { setStorageUserPrefix } from '../../shared'

export const AuthProvider: FC<{ readonly children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(getCurrentUsername)

  useEffect(() => {
    setStorageUserPrefix(username)
  }, [username])

  const login = useCallback(async (name: string, password: string) => {
    const result = await loginUser(name, password)
    if (result.ok) {
      setStorageUserPrefix(name.trim())
      setUsername(name.trim())
    }
    return result
  }, [])

  const register = useCallback(async (name: string, password: string) => {
    const result = await registerUser(name, password)
    if (result.ok) {
      setStorageUserPrefix(name.trim())
      setUsername(name.trim())
    }
    return result
  }, [])

  const logout = useCallback((): void => {
    logoutUser()
    setUsername(null)
  }, [])

  const value = useMemo(
    () => ({ username, isAuthenticated: username !== null, login, register, logout }),
    [username, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

import { createContext } from 'react'

export interface AuthContextValue {
  readonly username: string | null
  readonly isAuthenticated: boolean
  readonly login: (username: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>
  readonly register: (username: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>
  readonly logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

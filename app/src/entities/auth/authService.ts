import { loadFromStorage, saveToStorage } from '../../shared'

const USERS_KEY = 'auth-users'
const SESSION_KEY = 'auth-current-user'

interface StoredUser {
  readonly username: string
  readonly passwordHash: string
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function getUsers(): StoredUser[] {
  return loadFromStorage<StoredUser[]>(USERS_KEY, [])
}

export function getCurrentUsername(): string | null {
  return loadFromStorage<string | null>(SESSION_KEY, null)
}

export function userKey(key: string): string {
  const user = getCurrentUsername()
  if (!user) return key
  return `user:${user}:${key}`
}

export async function registerUser(
  username: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: 'exists' | 'invalid' }> {
  const trimmed = username.trim()
  if (trimmed.length < 2 || password.length < 4) {
    return { ok: false, error: 'invalid' }
  }

  const users = getUsers()
  if (users.some((u) => u.username.toLowerCase() === trimmed.toLowerCase())) {
    return { ok: false, error: 'exists' }
  }

  const passwordHash = await hashPassword(password)
  saveToStorage(USERS_KEY, [...users, { username: trimmed, passwordHash }])
  saveToStorage(SESSION_KEY, trimmed)

  return { ok: true }
}

export async function loginUser(
  username: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: 'credentials' }> {
  const trimmed = username.trim()
  const users = getUsers()
  const user = users.find((u) => u.username.toLowerCase() === trimmed.toLowerCase())

  if (!user) return { ok: false, error: 'credentials' }

  const passwordHash = await hashPassword(password)
  if (user.passwordHash !== passwordHash) {
    return { ok: false, error: 'credentials' }
  }

  saveToStorage(SESSION_KEY, user.username)
  return { ok: true }
}

export function logoutUser(): void {
  saveToStorage<string | null>(SESSION_KEY, null)
}

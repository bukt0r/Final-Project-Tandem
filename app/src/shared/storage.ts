export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota exceeded or unavailable — silently ignore
  }
}

let currentUserPrefix: string | null = null

export function setStorageUserPrefix(username: string | null): void {
  currentUserPrefix = username
}

function scopedKey(key: string): string {
  if (!currentUserPrefix) return key
  return `user:${currentUserPrefix}:${key}`
}

export function loadUserStorage<T>(key: string, fallback: T): T {
  return loadFromStorage(scopedKey(key), fallback)
}

export function saveUserStorage<T>(key: string, value: T): void {
  saveToStorage(scopedKey(key), value)
}

import { describe, it, expect } from 'vitest'
import { getApiBaseUrl } from './config'

describe('getApiBaseUrl', () => {
  it('returns default URL when VITE_API_URL is not set', () => {
    expect(getApiBaseUrl()).toBe('http://localhost:3000')
  })
})

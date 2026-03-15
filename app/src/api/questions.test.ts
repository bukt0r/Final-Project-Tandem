import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchQuestions } from './questions'

describe('fetchQuestions', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (typeof url === 'string' && url.endsWith('/api/questions')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve([
                {
                  id: 'q1',
                  title: 'Question One',
                  difficulty: 'easy',
                  createdAt: '2024-01-01T00:00:00Z',
                  updatedAt: '2024-01-01T00:00:00Z',
                  topicIds: [],
                },
              ]),
          } as Response)
        }
        return Promise.reject(new Error('unexpected url'))
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns array of questions when API responds successfully', async () => {
    const result = await fetchQuestions()
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({
      id: 'q1',
      title: 'Question One',
      difficulty: 'easy',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      topicIds: [],
    })
  })

  it('throws when response.ok is false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        } as Response),
      ),
    )
    await expect(fetchQuestions()).rejects.toThrow('Failed to fetch questions: 500')
  })
})

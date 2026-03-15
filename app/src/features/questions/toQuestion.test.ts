import { describe, it, expect } from 'vitest'
import { toQuestion, type QuestionFromApi } from './index'

describe('toQuestion', () => {
  it('maps API response to Question model', () => {
    const from: QuestionFromApi = {
      id: 'id-1',
      title: 'What is React?',
      difficulty: 'easy',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
      topicIds: ['topic-a', 'topic-b'],
    }
    const result = toQuestion(from)
    expect(result.id).toBe('id-1')
    expect(result.title).toBe('What is React?')
    expect(result.createdAt).toBe('2024-01-01T00:00:00Z')
    expect(result.updatedAt).toBe('2024-01-02T00:00:00Z')
    expect(result.topicIds).toEqual(['topic-a', 'topic-b'])
  })

  it('preserves difficulty field correctly', () => {
    const from: QuestionFromApi = {
      id: 'id-2',
      title: 'Hard question',
      difficulty: 'hard',
      createdAt: '',
      updatedAt: '',
      topicIds: [],
    }
    const result = toQuestion(from)
    expect(result.difficulty).toBe('hard')
  })
})

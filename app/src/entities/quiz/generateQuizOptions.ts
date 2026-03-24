import type { Question } from '../question/model/types'
import type { QuizOption, QuizQuestion } from './types'

const WRONG_OPTIONS_COUNT = 3

function shuffleArray<T>(array: readonly T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function pickRandomItems<T>(source: readonly T[], count: number): T[] {
  return shuffleArray(source).slice(0, count)
}

export function generateQuizQuestion(
  target: Question,
  allQuestions: readonly Question[],
): QuizQuestion {
  const wrongPool = allQuestions.filter((q) => q.id !== target.id)
  const wrongQuestions = pickRandomItems(wrongPool, WRONG_OPTIONS_COUNT)

  const correctOption: QuizOption = {
    id: target.id,
    text: target.answer,
    isCorrect: true,
  }

  const wrongOptions: QuizOption[] = wrongQuestions.map((q) => ({
    id: q.id,
    text: q.answer,
    isCorrect: false,
  }))

  return {
    question: target,
    options: shuffleArray([correctOption, ...wrongOptions]),
  }
}

export function generateQuiz(
  questions: readonly Question[],
  count: number,
): QuizQuestion[] {
  const selected = pickRandomItems(questions, count)
  return selected.map((q) => generateQuizQuestion(q, questions))
}

import type { FC } from 'react'
import { CodeBlock } from './CodeBlock'

export interface FormattedTextProps {
  readonly text: string
}

interface TextSegment {
  readonly type: 'text' | 'code'
  readonly content: string
  readonly language: string
}

const CODE_BLOCK_REGEX = /```(\w*)\n([\s\S]*?)```/g

function parseText(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  let lastIndex = 0

  for (const match of text.matchAll(CODE_BLOCK_REGEX)) {
    const matchIndex = match.index ?? 0

    if (matchIndex > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, matchIndex), language: '' })
    }

    segments.push({
      type: 'code',
      content: match[2],
      language: match[1] ?? 'javascript',
    })

    lastIndex = matchIndex + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex), language: '' })
  }

  return segments
}

export const FormattedText: FC<FormattedTextProps> = ({ text }) => {
  const segments = parseText(text)

  if (segments.length === 1 && segments[0].type === 'text') {
    return <span>{text}</span>
  }

  return (
    <div className="flex flex-col gap-2">
      {segments.map((segment, index) => {
        const key = `${segment.type}-${index}`

        if (segment.type === 'code') {
          return <CodeBlock key={key} code={segment.content} language={segment.language} />
        }

        return segment.content.trim().length > 0 ? (
          <span key={key}>{segment.content.trim()}</span>
        ) : null
      })}
    </div>
  )
}

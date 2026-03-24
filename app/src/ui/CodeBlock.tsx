import { useEffect, useRef, type FC } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

export interface CodeBlockProps {
  readonly code: string
  readonly language?: string
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <pre className="overflow-x-auto rounded-md text-xs">
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}

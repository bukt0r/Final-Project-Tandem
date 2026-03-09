import type { ReactElement, ChangeEvent } from "react"
import "./Input.css"

interface InputProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
}: InputProps): ReactElement {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
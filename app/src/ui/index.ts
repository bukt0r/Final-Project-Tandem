export interface ButtonProps {
  readonly label: string
  readonly onClick?: () => void
}

export const noop = (): void => {
  // Intentionally empty: semantic no-op helper for callbacks
}

export const getButtonAriaLabel = (props: ButtonProps): string =>
  props.label.trim().length > 0 ? props.label : 'Button'

export { DifficultyBadge, type DifficultyBadgeProps } from './DifficultyBadge'
export { QuestionCard, type QuestionCardProps } from './QuestionCard'
export { Loader, type LoaderProps } from './Loader'
export { ErrorMessage, type ErrorMessageProps } from './ErrorMessage'

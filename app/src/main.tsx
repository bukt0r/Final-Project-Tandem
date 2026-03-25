import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/i18n'
import App from './App.tsx'

const createRootContainer = (): HTMLElement => {
  const existingRootElement = document.getElementById('root')

  if (existingRootElement instanceof HTMLElement) {
    return existingRootElement
  }

  const rootElement = document.createElement('div')
  rootElement.id = 'root'
  document.body.appendChild(rootElement)

  return rootElement
}

const removePreloader = (): void => {
  const preloader = document.getElementById('app-preloader')
  if (preloader) {
    preloader.remove()
  }
}

const renderApplication = (): void => {
  const container = createRootContainer()
  removePreloader()

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

renderApplication()

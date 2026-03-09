const getEnvApiUrl = (): string | undefined => {
  const env = import.meta.env as unknown as { VITE_API_URL?: string }
  return env.VITE_API_URL
}

export const getApiBaseUrl = (): string => getEnvApiUrl() ?? 'http://localhost:3000'

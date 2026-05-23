const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME
export const CODESPACE_NAME = typeof rawCodespaceName === 'string' && rawCodespaceName.trim() !== '' ? rawCodespaceName.trim() : null
export const API_HOST = CODESPACE_NAME ? `${CODESPACE_NAME}-8000.app.github.dev` : 'localhost:8000'
export const API_BASE_URL = `https://${API_HOST}/api`

export function buildApiUrl(resource) {
  return `${API_BASE_URL}/${resource}`
}

export function normalizeApiResponse(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (value == null) {
    return []
  }

  if (Array.isArray(value.data)) {
    return value.data
  }

  if (Array.isArray(value.items)) {
    return value.items
  }

  if (Array.isArray(value.results)) {
    return value.results
  }

  return []
}

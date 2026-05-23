const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME
export const CODESPACE_NAME = typeof rawCodespaceName === 'string' && rawCodespaceName.trim() !== '' ? rawCodespaceName.trim() : null

// Build API base URL: use Codespaces public URL when available, otherwise localhost with http
export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : `http://localhost:8000/api`

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

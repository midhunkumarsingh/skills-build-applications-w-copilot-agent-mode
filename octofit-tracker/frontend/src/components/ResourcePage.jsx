import React, { useEffect, useMemo, useState } from 'react'
import { buildApiUrl, normalizeApiResponse, API_BASE_URL, CODESPACE_NAME, API_HOST } from './api'

function formatValue(value) {
  if (value === null || value === undefined) {
    return <span className="text-muted">N/A</span>
  }

  if (typeof value === 'object') {
    return <pre className="mb-0 text-wrap">{JSON.stringify(value, null, 2)}</pre>
  }

  return String(value)
}

export default function ResourcePage({ resource, title, columns = [] }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const url = buildApiUrl(resource)

    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((payload) => {
        setItems(normalizeApiResponse(payload))
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
          setItems([])
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => controller.abort()
  }, [resource])

  const headers = useMemo(() => {
    if (columns.length) {
      return columns
    }

    if (items.length > 0 && typeof items[0] === 'object' && items[0] !== null) {
      return Object.keys(items[0])
    }

    return ['Value']
  }, [columns, items])

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div>
          <h2>{title}</h2>
          <p className="mb-1">API endpoint: <code>{`${API_BASE_URL}/${resource}`}</code></p>
          {!CODESPACE_NAME ? (
            <div className="alert alert-warning py-2 px-3 mt-2" role="alert">
              <strong>Warning:</strong> `VITE_CODESPACE_NAME` is not defined. The app is using <code>{API_HOST}</code> as a safe fallback.
            </div>
          ) : null}
        </div>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading {title.toLowerCase()}...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : items.length === 0 ? (
        <div className="alert alert-secondary">No {resource} found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, rowIndex) => {
                if (typeof item !== 'object' || item === null) {
                  return (
                    <tr key={rowIndex}>
                      <td colSpan={headers.length}>{formatValue(item)}</td>
                    </tr>
                  )
                }

                return (
                  <tr key={rowIndex}>
                    {headers.map((header) => (
                      <td key={header}>{formatValue(item[header])}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

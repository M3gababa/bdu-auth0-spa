const BASE_URL = import.meta.env.VITE_IGBC_API_BASE_URL

async function request(path, { method = 'GET', token, body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    // A missing/invalid bearer token also lands here as 400, not 401 — see api.igbc.sheev.fr/docs
    const payload = await res.json().catch(() => null)
    throw new Error(payload?.error || `Request failed with status ${res.status}`)
  }

  if (res.status === 204) return null
  return res.json()
}

export function updateProfile(token, data) {
  return request('/api/profile', { method: 'PUT', token, body: data })
}

export function updateConsents(token, data) {
  return request('/api/profile/consents', { method: 'PUT', token, body: data })
}

// Custom Token Exchange (RFC 8693) — dev-only endpoint as of 2026-08-11
export function exchangeToken(token, audience) {
  return request('/api/security/cte', { method: 'POST', token, body: { audience } })
}

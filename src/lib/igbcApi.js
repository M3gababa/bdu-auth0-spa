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
// scope is optional, space-delimited, forwarded verbatim to /oauth/token (no server-side allowlist)
export function exchangeToken(token, audience, scope) {
  return request('/api/security/cte', { method: 'POST', token, body: { audience, ...(scope && { scope }) } })
}

// Custom Database (CDB) provisioning — experimental, self-only
export function createCdbCredentials(token, data) {
  return request('/api/security/cdb', { method: 'POST', token, body: data })
}

// Reads back the caller's Public-API-Users identity + app_metadata['api-credentials']
export function getCdbCredentials(token) {
  return request('/api/security/cdb', { token })
}

// Unlinks + deletes the secondary user and removes it from api-credentials — only `identity` is used server-side
export function deleteCdbCredentials(token, identity) {
  return request('/api/security/cdb', { method: 'DELETE', token, body: { identity } })
}

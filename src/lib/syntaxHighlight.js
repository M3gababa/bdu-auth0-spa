function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const JSON_TOKEN_RE = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g

// Returns HTML with <span class="json-*"> wrapping each token — render with v-html.
export function highlightJson(value) {
  const json = JSON.stringify(value, null, 2)
  if (json === undefined) return '<span class="json-null">null</span>'
  return escapeHtml(json).replace(JSON_TOKEN_RE, (match) => {
    if (match.startsWith('"')) return `<span class="${match.endsWith(':') ? 'json-key' : 'json-string'}">${match}</span>`
    if (match === 'true' || match === 'false') return `<span class="json-boolean">${match}</span>`
    if (match === 'null') return `<span class="json-null">${match}</span>`
    return `<span class="json-number">${match}</span>`
  })
}

// Colors the header/payload/signature segments of a raw JWT — render with v-html.
// Falls back to plain escaped text for opaque (non-JWT) tokens.
export function highlightJwt(token) {
  const parts = token.split('.')
  if (parts.length !== 3) return escapeHtml(token)
  const [header, payload, signature] = parts.map(escapeHtml)
  return `<span class="jwt-part--header">${header}</span>.<span class="jwt-part--payload">${payload}</span>.<span class="jwt-part--sig">${signature}</span>`
}

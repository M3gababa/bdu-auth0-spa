<template>
  <div class="tokens-page">

    <div class="page-intro">
      <h1 class="page-title">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
        Tokens
      </h1>
      <p class="page-subtitle">Raw and decoded JWT tokens issued for the current session.</p>
    </div>

    <div v-if="loading" class="tokens-loading">
      <span class="loading-spinner"></span>
    </div>

    <div v-else-if="fetchError" class="alert alert-info">{{ fetchError }}</div>

    <template v-else>
      <section v-for="token in tokens" :key="token.id" class="section">

        <div class="section-header">
          <div>
            <h2 class="section-title">
              <svg v-if="token.id === 'access'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {{ token.label }}
            </h2>
            <p class="section-subtitle">{{ token.description }}</p>
          </div>
          <button class="btn btn-ghost btn-sm" @click="copyToken(token)">
            {{ token.copied ? 'Copied!' : 'Copy JWT' }}
          </button>
        </div>

        <div class="card token-card">
          <div class="token-tabs">
            <button
              class="token-tab"
              :class="{ active: token.activeTab === 'raw' }"
              @click="token.activeTab = 'raw'"
            >Raw</button>
            <button
              class="token-tab"
              :class="{ active: token.activeTab === 'decoded' }"
              @click="token.activeTab = 'decoded'"
            >Decoded</button>
          </div>

          <div v-if="token.activeTab === 'raw'" class="token-panel">
            <template v-if="isJwt(token.raw)">
              <pre class="jwt-raw" v-html="highlightJwt(token.raw)"></pre>
            </template>
            <pre v-else class="jwt-raw jwt-raw--opaque">{{ token.raw }}</pre>
          </div>

          <div v-else class="token-panel">
            <template v-if="isJwt(token.raw)">
              <div class="decoded-section">
                <p class="decoded-label">Header</p>
                <pre class="json-block" v-html="highlightJson(decodeJwtPart(token.raw, 0))"></pre>
              </div>
              <div class="decoded-section">
                <p class="decoded-label">Payload</p>
                <pre class="json-block" v-html="highlightJson(decodeJwtPart(token.raw, 1))"></pre>
              </div>
            </template>
            <p v-else class="opaque-notice">This token is opaque (not a JWT). Set <code>VITE_AUTH0_AUDIENCE</code> to receive a signed JWT access token.</p>
          </div>
        </div>

      </section>
    </template>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { highlightJson, highlightJwt } from '@/lib/syntaxHighlight'

const { getAccessTokenSilently, idTokenClaims } = useAuth0()

const loading = ref(true)
const fetchError = ref(null)

const tokens = reactive([
  {
    id: 'access',
    label: 'Access Token',
    description: 'Bearer token for API authorization. Present in the Authorization header of API requests.',
    raw: null,
    activeTab: 'raw',
    copied: false,
  },
  {
    id: 'id',
    label: 'ID Token',
    description: 'Identity assertion issued by Auth0. Contains user profile claims.',
    raw: null,
    activeTab: 'raw',
    copied: false,
  },
])

onMounted(async () => {
  try {
    tokens[0].raw = await getAccessTokenSilently()
    tokens[1].raw = idTokenClaims.value?.__raw ?? null
  } catch (e) {
    fetchError.value = e?.message ?? 'Failed to retrieve tokens.'
  } finally {
    loading.value = false
  }
})

function isJwt(token) {
  return typeof token === 'string' && token.split('.').length === 3
}

function decodeJwtPart(token, index) {
  try {
    const part = token.split('.')[index]
    const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

async function copyToken(token) {
  if (!token.raw) return
  await navigator.clipboard.writeText(token.raw)
  token.copied = true
  setTimeout(() => { token.copied = false }, 2000)
}
</script>

<style scoped>
.tokens-page {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-bottom: 2rem;
}

.page-intro {
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.4rem;
}

.page-subtitle {
  font-size: 0.9rem;
  color: #666;
}

.tokens-loading {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

/* ── Token card ── */
.token-card {
  padding: 0;
  overflow: hidden;
}

.token-tabs {
  display: flex;
  border-bottom: 2px solid var(--auth0-accentuate-4);
}

.token-tab {
  padding: 0.65rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #888;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.token-tab:hover { color: var(--auth0-accentuate-1); }
.token-tab.active {
  color: var(--auth0-accentuate-1);
  border-bottom-color: var(--auth0-txt-background-3);
}

.token-panel {
  padding: 1.25rem 1.5rem;
}

/* ── Raw JWT ── */
.jwt-raw {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.78rem;
  line-height: 1.6;
  word-break: break-all;
  white-space: pre-wrap;
  background: var(--auth0-accentuate-4);
  border-radius: 8px;
  padding: 1rem;
  color: var(--auth0-accentuate-1);
}

.jwt-raw--opaque { color: #555; }

/* ── Decoded JSON ── */
.decoded-section {
  margin-bottom: 1.25rem;
}
.decoded-section:last-child { margin-bottom: 0; }

.decoded-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--auth0-accentuate-2);
  margin-bottom: 0.4rem;
}

.json-block {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.82rem;
  line-height: 1.65;
  white-space: pre;
  overflow-x: auto;
  background: var(--auth0-accentuate-4);
  border-radius: 8px;
  padding: 1rem;
  color: var(--auth0-accentuate-1);
}

.opaque-notice {
  font-size: 0.88rem;
  color: #666;
}

@media (max-width: 768px) {
  .json-block { font-size: 0.75rem; }
  .jwt-raw    { font-size: 0.72rem; }
}
</style>

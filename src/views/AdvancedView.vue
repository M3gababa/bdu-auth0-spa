<template>
  <div class="advanced-page">
    <div class="page-intro">
      <h1 class="page-title">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        Advanced
      </h1>
      <p class="page-subtitle">Advanced configuration and tools.</p>
    </div>

    <!-- ════════════════════════════════════════
         Feature selector
    ═════════════════════════════════════════ -->
    <div class="feature-grid">
      <button
        class="feature-btn"
        :class="{ 'feature-btn--active': activeFeature === 'cte' }"
        @click="selectFeature('cte')"
      >
        <svg class="feature-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 2l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 22l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
        <span class="feature-btn-name">Custom Token Exchange</span>
      </button>

      <button
        class="feature-btn"
        :class="{ 'feature-btn--active': activeFeature === 'oauth2' }"
        @click="selectFeature('oauth2')"
      >
        <svg class="feature-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path d="M15 3h6v6" />
          <path d="M10 14L21 3" />
        </svg>
        <span class="feature-btn-name">External OAuth2.0 Token</span>
      </button>

      <button
        class="feature-btn"
        :class="{ 'feature-btn--active': activeFeature === 'tbd' }"
        @click="selectFeature('tbd')"
      >
        <svg class="feature-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        <span class="feature-btn-name">TBD</span>
      </button>
    </div>

    <!-- ════════════════════════════════════════
         Custom Token Exchange
    ═════════════════════════════════════════ -->
    <section v-if="activeFeature === 'cte'" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 2l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 22l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            Custom Token Exchange
          </h2>
          <p class="section-subtitle">
            Exchange your current access token for one scoped to a different audience (RFC 8693).
            Calls <code>POST /api/security/cte</code>.
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" @click="activeFeature = null">Close</button>
      </div>

      <div class="card">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="cte-token-name">Token Name</label>
            <input
              id="cte-token-name"
              v-model="tokenName"
              type="text"
              class="form-input"
              placeholder="e.g. my-test-token"
              title="Not used yet"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="cte-expiration">Expiration</label>
            <select id="cte-expiration" v-model="expirationDays" class="form-input" title="Not used yet">
              <option v-for="opt in expirationOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>

          <div class="form-group form-group--full">
            <label class="form-label" for="cte-description">Description</label>
            <input
              id="cte-description"
              v-model="description"
              type="text"
              class="form-input"
              placeholder="What is this token for?"
              title="Not used yet"
            />
          </div>
        </div>

        <div class="form-grid form-grid--spaced">
          <div class="form-group">
            <label class="form-label" for="cte-audience">Target Audience</label>
            <select id="cte-audience" v-model="audience" class="form-input">
              <option v-for="opt in AUDIENCES" :key="opt.value" :value="opt.value">{{ opt.value }}</option>
            </select>
            <span class="form-hint">Must be on the server-side allowed-audiences list.</span>
          </div>

          <div class="form-group">
            <label class="form-label">Permissions / Scopes</label>
            <div class="scope-grid">
              <label v-for="scope in currentScopes" :key="scope" class="scope-item" title="Not used yet">
                <input type="checkbox" v-model="selectedScopes[scope]" />
                <span>{{ scope }}</span>
              </label>
            </div>
            <span class="form-hint">Not yet supported by the API — the audience alone determines the token's permissions server-side for now.</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-primary btn-sm" :disabled="exchanging || !audience" @click="handleExchange">
            {{ exchanging ? 'Generating…' : 'Generate Token' }}
          </button>
          <span v-if="exchangeError" class="save-feedback save-feedback--error">{{ exchangeError }}</span>
        </div>

        <div v-if="result" class="cte-result">
          <dl class="info-list">
            <div class="info-item">
              <dt>Token Type</dt>
              <dd>{{ result.token_type }}</dd>
            </div>
            <div class="info-item">
              <dt>Expires In</dt>
              <dd>{{ result.expires_in }}s</dd>
            </div>
            <div v-if="result.scope" class="info-item">
              <dt>Scope</dt>
              <dd>{{ result.scope }}</dd>
            </div>
          </dl>

          <div class="cte-block">
            <div class="cte-block-header">
              <span class="cte-block-label">Access Token</span>
              <button class="btn btn-ghost btn-sm" @click="copyToken">{{ copied ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="cte-raw">{{ result.access_token }}</pre>
          </div>

          <div class="cte-block">
            <p class="cte-block-label">Decoded Payload</p>
            <pre class="cte-json">{{ fmtJson(result.decoded) }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════
         External OAuth2.0 Token
    ═════════════════════════════════════════ -->
    <section v-if="activeFeature === 'oauth2'" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
            </svg>
            External OAuth2.0 Token
          </h2>
          <p class="section-subtitle">
            Request an access token from an external OAuth 2.0 / OIDC provider.
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" @click="activeFeature = null">Close</button>
      </div>

      <div class="card">
        <div class="form-grid">
          <div class="form-group form-group--full">
            <label class="form-label" for="oauth2-issuer">Issuer / Authority URL</label>
            <input
              id="oauth2-issuer"
              v-model="oauthForm.issuer"
              type="text"
              class="form-input"
              placeholder="https://your-idp.example.com"
            />
            <span class="form-hint">Used to discover endpoints via /.well-known/openid-configuration.</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="oauth2-client-id">Client ID</label>
            <input id="oauth2-client-id" v-model="oauthForm.clientId" type="text" class="form-input" placeholder="e.g. abc123" />
          </div>

          <div class="form-group">
            <label class="form-label" for="oauth2-audience">Audience</label>
            <input id="oauth2-audience" v-model="oauthForm.audience" type="text" class="form-input" placeholder="e.g. api://my-api" />
          </div>

          <div class="form-group form-group--full">
            <label class="form-label" for="oauth2-scope">Scopes</label>
            <input id="oauth2-scope" v-model="oauthForm.scope" type="text" class="form-input" placeholder="openid profile email offline_access" />
            <span class="form-hint">Space-separated. Include <code>offline_access</code> to request a refresh token.</span>
          </div>

          <div class="form-group form-group--full">
            <label class="form-label" for="oauth2-redirect-uri">Redirect URI</label>
            <input id="oauth2-redirect-uri" v-model="oauthForm.redirectUri" type="text" class="form-input" />
            <span class="form-hint">Must be registered as an allowed callback URL with the provider.</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-secondary btn-sm" @click="loadPreset">Load Preset Values</button>
          <button class="btn btn-primary btn-sm" :disabled="generatingOAuthToken" @click="handleGenerateOAuthToken">
            {{ generatingOAuthToken ? 'Generating…' : 'Generate Token' }}
          </button>
          <button v-if="oauthCachedTokenAvailable" class="btn btn-secondary btn-sm" @click="showCachedOAuthToken">
            Display Cached Token
          </button>
          <button v-if="oauthCachedTokenAvailable" class="btn btn-ghost btn-sm" @click="clearCachedOAuthToken">
            Clear Cached Token
          </button>
          <span v-if="oauthError" class="save-feedback save-feedback--error">{{ oauthError }}</span>
        </div>

        <div v-if="oauthResult" class="cte-result">
          <div class="cte-block">
            <div class="cte-block-header">
              <span class="cte-block-label">Access Token</span>
              <div class="cte-block-actions">
                <button class="btn btn-ghost btn-sm" @click="oauthAccessTokenDecoded = !oauthAccessTokenDecoded">
                  {{ oauthAccessTokenDecoded ? 'Hide Decoded' : 'Decode' }}
                </button>
                <button class="btn btn-ghost btn-sm" @click="copyOAuthField('access_token')">
                  {{ oauthCopied === 'access_token' ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>
            <pre class="cte-raw">{{ oauthResult.access_token }}</pre>

            <template v-if="oauthAccessTokenDecoded">
              <template v-if="isJwt(oauthResult.access_token)">
                <p class="cte-block-label">Decoded Header</p>
                <pre class="cte-json">{{ fmtJson(decodeJwtPart(oauthResult.access_token, 0)) }}</pre>
                <p class="cte-block-label">Decoded Payload</p>
                <pre class="cte-json">{{ fmtJson(decodeJwtPart(oauthResult.access_token, 1)) }}</pre>
              </template>
              <p v-else class="form-hint">This token is opaque (not a JWT) — nothing to decode.</p>
            </template>
          </div>

          <div class="cte-block">
            <div class="cte-block-header">
              <span class="cte-block-label">Refresh Token</span>
              <button
                v-if="oauthResult.refresh_token"
                class="btn btn-ghost btn-sm"
                @click="copyOAuthField('refresh_token')"
              >
                {{ oauthCopied === 'refresh_token' ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre v-if="oauthResult.refresh_token" class="cte-raw">{{ oauthResult.refresh_token }}</pre>
            <p v-else class="form-hint">
              No refresh token returned — check that the scope includes <code>offline_access</code> and the provider issues one.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════
         TBD
    ═════════════════════════════════════════ -->
    <section v-if="activeFeature === 'tbd'" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            TBD
          </h2>
          <p class="section-subtitle">Reserved for a future feature.</p>
        </div>
        <button class="btn btn-ghost btn-sm" @click="activeFeature = null">Close</button>
      </div>

      <div class="card">
        <p class="wip-placeholder">Work in Progress</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { UserManager, WebStorageStateStore } from 'oidc-client-ts'
import { exchangeToken } from '@/lib/igbcApi'

const { getAccessTokenSilently } = useAuth0()

const activeFeature = ref(null)
function selectFeature(key) {
  activeFeature.value = activeFeature.value === key ? null : key
}

const AUDIENCES = [
  {
    value: 'api://sheev-public/v1',
    scopes: ['get:all', 'put:all', 'post:all', 'delete:all', 'patch:all', 'query:all'],
  },
  {
    value: 'mcp://sheev/v1',
    scopes: ['read:accounts', 'write:accounts', 'read:payments', 'write:payments', 'read:transfers', 'write:transfers'],
  },
]

const audience = ref(AUDIENCES[0].value)
const currentScopes = computed(() => AUDIENCES.find((a) => a.value === audience.value)?.scopes ?? [])
const selectedScopes = reactive({})

// Not sent to the API yet — placeholders until the endpoint supports them
const tokenName = ref('')
const description = ref('')
const EXPIRATION_DAYS = [1, 7, 30, 60, 90]
const expirationDays = ref(30)
const expirationOptions = computed(() =>
  EXPIRATION_DAYS.map((days) => ({
    value: days,
    label: `${days} day${days === 1 ? '' : 's'} (${formatExpiryDate(days)})`,
  }))
)

function formatExpiryDate(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const exchanging = ref(false)
const exchangeError = ref('')
const result = ref(null)
const copied = ref(false)

async function handleExchange() {
  exchanging.value = true
  exchangeError.value = ''
  result.value = null
  try {
    const token = await getAccessTokenSilently()
    result.value = await exchangeToken(token, audience.value)
  } catch (e) {
    exchangeError.value = e?.message ?? 'Token exchange failed.'
  } finally {
    exchanging.value = false
  }
}

async function copyToken() {
  if (!result.value?.access_token) return
  await navigator.clipboard.writeText(result.value.access_token)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function fmtJson(value) {
  return value == null ? 'null' : JSON.stringify(value, null, 2)
}

const oauthForm = reactive({
  issuer: '',
  clientId: '',
  audience: '',
  scope: '',
  redirectUri: `${window.location.origin}/oidc-callback`,
})

function loadPreset() {
  oauthForm.issuer = 'https://partners.sheev.fr'
  oauthForm.clientId = 'https://bdu-spa.sheev.fr/oauth-client-metadata.json'
  oauthForm.audience = 'api://sheev-public/v1'
  oauthForm.scope = 'openid profile email offline_access get:all'
}

const generatingOAuthToken = ref(false)
const oauthError = ref('')
const oauthResult = ref(null)
const oauthCopied = ref('')
const oauthAccessTokenDecoded = ref(false)

// sessionStorage (not localStorage) so this stays isolated from the primary
// auth0-vue session and doesn't outlive the tab.
const oauthSessionStore = new WebStorageStateStore({ store: window.sessionStorage })
const oauthCachedTokenAvailable = ref(false)

function buildOAuthUserManager() {
  return new UserManager({
    authority: oauthForm.issuer,
    client_id: oauthForm.clientId,
    redirect_uri: oauthForm.redirectUri,
    scope: oauthForm.scope,
    response_type: 'code',
    loadUserInfo: false,
    automaticSilentRenew: false,
    userStore: oauthSessionStore,
    stateStore: oauthSessionStore,
    ...(oauthForm.audience && { extraQueryParams: { audience: oauthForm.audience } }),
  })
}

async function refreshCachedOAuthTokenState() {
  try {
    const user = await buildOAuthUserManager().getUser()
    oauthCachedTokenAvailable.value = !!user
  } catch {
    oauthCachedTokenAvailable.value = false
  }
}

watch(activeFeature, (key) => {
  if (key === 'oauth2') refreshCachedOAuthTokenState()
})

watch([() => oauthForm.issuer, () => oauthForm.clientId], () => {
  if (activeFeature.value === 'oauth2') refreshCachedOAuthTokenState()
})

async function handleGenerateOAuthToken() {
  generatingOAuthToken.value = true
  oauthError.value = ''
  oauthResult.value = null
  oauthAccessTokenDecoded.value = false
  try {
    const user = await buildOAuthUserManager().signinPopup()
    oauthResult.value = {
      access_token: user.access_token,
      refresh_token: user.refresh_token,
    }
    oauthCachedTokenAvailable.value = true
  } catch (e) {
    oauthError.value = e?.message ?? 'Token generation failed.'
  } finally {
    generatingOAuthToken.value = false
  }
}

async function showCachedOAuthToken() {
  oauthError.value = ''
  try {
    const user = await buildOAuthUserManager().getUser()
    if (!user) {
      oauthCachedTokenAvailable.value = false
      oauthError.value = 'No cached token found.'
      return
    }
    oauthResult.value = { access_token: user.access_token, refresh_token: user.refresh_token }
    oauthAccessTokenDecoded.value = false
  } catch (e) {
    oauthError.value = e?.message ?? 'Failed to read cached token.'
  }
}

async function clearCachedOAuthToken() {
  try {
    await buildOAuthUserManager().removeUser()
  } finally {
    oauthCachedTokenAvailable.value = false
    oauthResult.value = null
    oauthAccessTokenDecoded.value = false
  }
}

async function copyOAuthField(field) {
  const value = oauthResult.value?.[field]
  if (!value) return
  await navigator.clipboard.writeText(value)
  oauthCopied.value = field
  setTimeout(() => { oauthCopied.value = '' }, 2000)
}

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
</script>

<style scoped>
.advanced-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

/* ── Feature selector ── */
.feature-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.feature-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 140px;
  height: 140px;
  border-radius: 12px;
  border: 2px solid var(--auth0-accentuate-4);
  background: #ffffff;
  color: var(--auth0-accentuate-1);
  cursor: pointer;
  transition: all 0.18s ease;
}

.feature-btn:hover {
  border-color: var(--auth0-txt-background-3);
  background-color: var(--auth0-accentuate-4);
}

.feature-btn-icon {
  width: 2rem;
  height: 2rem;
}

.feature-btn-name {
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
}

.feature-btn--active {
  background-color: #059669;
  border-color: #059669;
  color: #ffffff;
}

.feature-btn--active:hover {
  background-color: #047857;
  border-color: #047857;
}

/* ── Section header ── */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.wip-placeholder {
  text-align: center;
  padding: 1.5rem 0;
  font-weight: 600;
  color: var(--auth0-accentuate-2);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;
}

.form-group--full {
  grid-column: 1 / -1;
}

.form-grid--spaced {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--auth0-accentuate-4);
}

.scope-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
}

.scope-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: var(--auth0-accentuate-1);
  cursor: pointer;
}

.save-feedback {
  align-self: center;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--auth0-accentuate-2);
}
.save-feedback--error {
  color: #b91c1c;
}

.cte-result {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--auth0-accentuate-4);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cte-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.cte-block-actions {
  display: flex;
  gap: 0.5rem;
}

.cte-block-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--auth0-accentuate-2);
}

.cte-raw,
.cte-json {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.78rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  background: var(--auth0-accentuate-4);
  border-radius: 8px;
  padding: 1rem;
  color: var(--auth0-accentuate-1);
}

@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
}
</style>

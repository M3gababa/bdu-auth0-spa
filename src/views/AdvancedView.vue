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
        :class="{ 'feature-btn--active': activeFeature === 'cimd' }"
        @click="selectFeature('cimd')"
      >
        <svg class="feature-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </svg>
        <span class="feature-btn-name">Client ID Metadata Document</span>
      </button>

      <button
        class="feature-btn"
        :class="{ 'feature-btn--active': activeFeature === 'dcr' }"
        @click="selectFeature('dcr')"
      >
        <svg class="feature-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="7" r="4" />
          <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="16" y1="11" x2="22" y2="11" />
        </svg>
        <span class="feature-btn-name">Dynamic Client Registration</span>
      </button>

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
        :class="{ 'feature-btn--active': activeFeature === 'mycreds' }"
        @click="selectFeature('mycreds')"
      >
        <svg class="feature-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        <span class="feature-btn-name">My Credentials</span>
      </button>

      <button
        class="feature-btn"
        :class="{ 'feature-btn--active': activeFeature === 'ropg' }"
        @click="selectFeature('ropg')"
      >
        <svg class="feature-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="7.5" cy="15.5" r="5.5" />
          <path d="M21 2l-9.6 9.6" />
          <path d="M15.5 7.5l3 3L22 7l-3-3" />
        </svg>
        <span class="feature-btn-name">ROPG</span>
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
            <label class="form-label" for="cte-audience">Target Audience</label>
            <select id="cte-audience" v-model="audience" class="form-input">
              <option v-for="opt in AUDIENCES" :key="opt.value" :value="opt.value">{{ opt.value }}</option>
            </select>
            <span class="form-hint">Must be on the server-side allowed-audiences list.</span>

            <label class="scope-item scope-item--spaced">
              <input type="checkbox" v-model="includeRefreshToken" />
              <span>Include a refresh token</span>
            </label>
            <span class="form-hint">Sends the <code>offline_access</code> scope to request a <code>refresh_token</code> (also requires "Allow Offline Access" on the target API).</span>
          </div>

          <div class="form-group">
            <label class="form-label">Permissions / Scopes</label>
            <div class="scope-grid">
              <label v-for="scope in currentScopes" :key="scope" class="scope-item">
                <input type="checkbox" v-model="selectedScopes[scope]" />
                <span>{{ scope }}</span>
              </label>
            </div>
            <span class="form-hint">Sent as the <code>scope</code> parameter — Auth0 RBAC, not this list, is the actual gate on what's granted.</span>
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
            <pre class="cte-raw" v-html="highlightJwt(result.access_token)"></pre>
          </div>

          <div v-if="includeRefreshToken" class="cte-block">
            <div class="cte-block-header">
              <span class="cte-block-label">Refresh Token</span>
              <button
                v-if="result.refresh_token"
                class="btn btn-ghost btn-sm"
                @click="copyRefreshToken"
              >
                {{ refreshCopied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre v-if="result.refresh_token" class="cte-raw">{{ result.refresh_token }}</pre>
            <p v-else class="form-hint">
              No refresh token returned — check "Allow Offline Access" is enabled on the target API.
            </p>
          </div>

          <div class="cte-block">
            <p class="cte-block-label">Decoded Payload</p>
            <pre class="cte-json" v-html="highlightJson(result.decoded)"></pre>
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
            <pre class="cte-raw" v-html="highlightJwt(oauthResult.access_token)"></pre>

            <template v-if="oauthAccessTokenDecoded">
              <template v-if="isJwt(oauthResult.access_token)">
                <p class="cte-block-label">Decoded Header</p>
                <pre class="cte-json" v-html="highlightJson(decodeJwtPart(oauthResult.access_token, 0))"></pre>
                <p class="cte-block-label">Decoded Payload</p>
                <pre class="cte-json" v-html="highlightJson(decodeJwtPart(oauthResult.access_token, 1))"></pre>
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
         Client ID Metadata Document (CIMD)
    ═════════════════════════════════════════ -->
    <section v-if="activeFeature === 'cimd'" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M9 13h6" />
              <path d="M9 17h6" />
            </svg>
            Client ID Metadata Document
          </h2>
          <p class="section-subtitle">
            Served at <code>{{ cimdUrl }}</code> — usable as a <code>client_id</code> by any OIDC-compliant
            authorization server that supports CIMD (RFC-in-progress).
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" @click="activeFeature = null">Close</button>
      </div>

      <div class="card">
        <p class="cimd-note">
          After importing this client in Auth0, the application must be changed to
          <strong>Single Page Application</strong> — it's imported as a generic client by default.
        </p>

        <div class="cte-block">
          <div class="cte-block-header">
            <span class="cte-block-label">oauth-client-metadata.json</span>
            <button class="btn btn-ghost btn-sm" @click="copyCimd">{{ cimdCopied ? 'Copied!' : 'Copy' }}</button>
          </div>
          <pre v-if="cimdJson" class="cte-json" v-html="highlightJson(cimdJson)"></pre>
          <p v-else-if="cimdError" class="save-feedback save-feedback--error">{{ cimdError }}</p>
          <p v-else class="form-hint">Loading…</p>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════
         Dynamic Client Registration (DCR)
    ═════════════════════════════════════════ -->
    <section v-if="activeFeature === 'dcr'" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="7" r="4" />
              <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="16" y1="11" x2="22" y2="11" />
            </svg>
            Dynamic Client Registration
          </h2>
          <p class="section-subtitle">
            Register a new OIDC client (RFC 7591). Calls <code>POST https://auth.sheev.fr/oidc/register</code>.
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" @click="activeFeature = null">Close</button>
      </div>

      <div class="card">
        <div class="form-grid">
          <div class="form-group form-group--full">
            <label class="form-label" for="dcr-client-name">Client Name</label>
            <input id="dcr-client-name" v-model="dcrForm.clientName" type="text" class="form-input" placeholder="e.g. SPA - DCR" />
          </div>

          <div class="form-group form-group--full">
            <label class="form-label" for="dcr-redirect-uris">Redirect URIs</label>
            <textarea
              id="dcr-redirect-uris"
              v-model="dcrForm.redirectUris"
              class="form-input"
              rows="3"
              placeholder="One per line"
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="dcr-auth-method">Token Endpoint Auth Method</label>
            <select id="dcr-auth-method" v-model="dcrForm.tokenEndpointAuthMethod" class="form-input">
              <option value="none">none</option>
              <option value="client_secret_post">client_secret_post</option>
              <option value="client_secret_basic">client_secret_basic</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="dcr-grant-types">Grant Types</label>
            <input
              id="dcr-grant-types"
              v-model="dcrForm.grantTypes"
              type="text"
              class="form-input"
              placeholder="authorization_code, refresh_token"
            />
            <span class="form-hint">Comma-separated.</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="dcr-response-types">Response Types</label>
            <input id="dcr-response-types" v-model="dcrForm.responseTypes" type="text" class="form-input" placeholder="code" />
            <span class="form-hint">Comma-separated.</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-secondary btn-sm" @click="loadDcrPreset">Load Preset Values</button>
          <button class="btn btn-primary btn-sm" :disabled="registering" @click="handleRegisterApp">
            {{ registering ? 'Registering…' : 'Register App' }}
          </button>
          <span v-if="registerError" class="save-feedback save-feedback--error">{{ registerError }}</span>
        </div>

        <div v-if="registerResult" class="cte-result">
          <dl class="info-list">
            <div class="info-item">
              <dt>Client ID</dt>
              <dd>{{ registerResult.client_id }}</dd>
            </div>
            <div v-if="registerResult.client_secret" class="info-item">
              <dt>Client Secret</dt>
              <dd>{{ registerResult.client_secret }}</dd>
            </div>
          </dl>

          <div class="cte-block">
            <p class="cte-block-label">Full Response</p>
            <pre class="cte-json" v-html="highlightJson(registerResult)"></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════
         ROPG
    ═════════════════════════════════════════ -->
    <section v-if="activeFeature === 'ropg'" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="7.5" cy="15.5" r="5.5" />
              <path d="M21 2l-9.6 9.6" />
              <path d="M15.5 7.5l3 3L22 7l-3-3" />
            </svg>
            ROPG
          </h2>
          <p class="section-subtitle">
            Run a Resource Owner Password Credentials grant directly against Auth0.
            Need credentials first? Provision some under <strong>My Credentials</strong>.
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" @click="activeFeature = null">Close</button>
      </div>

      <div class="card">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="ropg-client-id">Client ID</label>
            <input id="ropg-client-id" v-model="ropgForm.clientId" type="text" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="ropg-client-secret">Client Secret</label>
            <input id="ropg-client-secret" v-model="ropgForm.clientSecret" type="text" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="ropg-username">Username</label>
            <input id="ropg-username" v-model="ropgForm.username" type="text" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="ropg-password">Password</label>
            <div class="input-with-action">
              <input
                id="ropg-password"
                v-model="ropgForm.password"
                :type="ropgPasswordVisible ? 'text' : 'password'"
                class="form-input"
              />
              <button type="button" class="btn btn-ghost btn-sm" @click="ropgPasswordVisible = !ropgPasswordVisible">
                {{ ropgPasswordVisible ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="ropg-audience">Audience</label>
            <select id="ropg-audience" v-model="ropgForm.audience" class="form-input">
              <option v-for="opt in AUDIENCES" :key="opt.value" :value="opt.value">{{ opt.value }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Permissions</label>
            <div class="scope-grid">
              <label v-for="scope in ropgCurrentScopes" :key="scope" class="scope-item">
                <input type="checkbox" v-model="ropgSelectedScopes[scope]" />
                <span>{{ scope }}</span>
              </label>
            </div>
            <span class="form-hint">Sent as the <code>scope</code> parameter, alongside <code>openid profile offline_access</code>.</span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-primary btn-sm" :disabled="generatingRopgToken || !ropgFormValid" @click="handleGenerateRopgToken">
            {{ generatingRopgToken ? 'Generating…' : 'Generate Token' }}
          </button>
          <span v-if="ropgError" class="save-feedback save-feedback--error">{{ ropgError }}</span>
        </div>

        <div v-if="ropgResult" class="cte-result">
          <dl class="info-list">
            <div class="info-item">
              <dt>Token Type</dt>
              <dd>{{ ropgResult.token_type }}</dd>
            </div>
            <div class="info-item">
              <dt>Expires In</dt>
              <dd>{{ ropgResult.expires_in }}s</dd>
            </div>
            <div v-if="ropgResult.scope" class="info-item">
              <dt>Scope</dt>
              <dd>{{ ropgResult.scope }}</dd>
            </div>
          </dl>

          <div class="cte-block">
            <div class="cte-block-header">
              <span class="cte-block-label">Access Token</span>
              <div class="cte-block-actions">
                <button class="btn btn-ghost btn-sm" @click="ropgAccessTokenDecoded = !ropgAccessTokenDecoded">
                  {{ ropgAccessTokenDecoded ? 'Hide Decoded' : 'Decode' }}
                </button>
                <button class="btn btn-ghost btn-sm" @click="copyRopgField('access_token')">
                  {{ ropgCopied === 'access_token' ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>
            <pre class="cte-raw" v-html="highlightJwt(ropgResult.access_token)"></pre>

            <template v-if="ropgAccessTokenDecoded">
              <template v-if="isJwt(ropgResult.access_token)">
                <p class="cte-block-label">Decoded Payload</p>
                <pre class="cte-json" v-html="highlightJson(decodeJwtPart(ropgResult.access_token, 1))"></pre>
              </template>
              <p v-else class="form-hint">This token is opaque (not a JWT) — nothing to decode.</p>
            </template>
          </div>

          <div class="cte-block">
            <div class="cte-block-header">
              <span class="cte-block-label">ID Token</span>
              <div v-if="ropgResult.id_token" class="cte-block-actions">
                <button class="btn btn-ghost btn-sm" @click="ropgIdTokenDecoded = !ropgIdTokenDecoded">
                  {{ ropgIdTokenDecoded ? 'Hide Decoded' : 'Decode' }}
                </button>
                <button class="btn btn-ghost btn-sm" @click="copyRopgField('id_token')">
                  {{ ropgCopied === 'id_token' ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>
            <pre v-if="ropgResult.id_token" class="cte-raw" v-html="highlightJwt(ropgResult.id_token)"></pre>
            <p v-else class="form-hint">No ID token returned — check the scope includes <code>openid</code>.</p>

            <template v-if="ropgIdTokenDecoded && ropgResult.id_token">
              <template v-if="isJwt(ropgResult.id_token)">
                <p class="cte-block-label">Decoded Payload</p>
                <pre class="cte-json" v-html="highlightJson(decodeJwtPart(ropgResult.id_token, 1))"></pre>
              </template>
              <p v-else class="form-hint">This token is opaque (not a JWT) — nothing to decode.</p>
            </template>
          </div>

          <div class="cte-block">
            <div class="cte-block-header">
              <span class="cte-block-label">Refresh Token</span>
              <button
                v-if="ropgResult.refresh_token"
                class="btn btn-ghost btn-sm"
                @click="copyRopgField('refresh_token')"
              >
                {{ ropgCopied === 'refresh_token' ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <pre v-if="ropgResult.refresh_token" class="cte-raw">{{ ropgResult.refresh_token }}</pre>
            <p v-else class="form-hint">
              No refresh token returned — check <code>offline_access</code> is included and the target audience allows offline access.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════
         My Credentials
    ═════════════════════════════════════════ -->
    <section v-if="activeFeature === 'mycreds'" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            My Credentials
          </h2>
          <p class="section-subtitle">
            Public-API-Users credentials provisioned for your account. Calls <code>GET /api/security/cdb</code>.
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" @click="activeFeature = null">Close</button>
      </div>

      <div class="card">
        <h3 class="card-title">Credentials</h3>
        <dl class="info-list">
          <div class="info-item">
            <dt>Client ID</dt>
            <dd>{{ identityClientId || '—' }}</dd>
          </div>
          <div class="info-item">
            <dt>Client Secret</dt>
            <dd>{{ identityClientSecret ? (identitySecretVisible ? identityClientSecret : maskedPassword) : '—' }}
              <button
                v-if="identityClientSecret"
                class="btn btn-ghost btn-sm"
                @click="identitySecretVisible = !identitySecretVisible"
              >
                {{ identitySecretVisible ? 'Hide' : 'Show' }}
              </button>
            </dd>
          </div>
        </dl>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Provisioned Credentials</h3>
          <button class="btn btn-primary btn-sm" @click="openCreateModal">Create New</button>
        </div>
        <p v-if="mycredsLoading" class="form-hint">Loading…</p>
        <p v-else-if="mycredsError" class="save-feedback save-feedback--error">{{ mycredsError }}</p>
        <p v-else-if="!mycredsList.length" class="form-hint">No credentials provisioned yet — create one above.</p>

        <table v-else class="creds-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Endpoint</th>
              <th>Permissions</th>
              <th>Expiration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cred, index) in mycredsList" :key="cred.identity ?? index">
              <td>{{ cred.name }}</td>
              <td>{{ cred.description }}</td>
              <td>{{ cred.endpoint }}</td>
              <td>
                <span v-for="perm in cred.permissions" :key="perm" class="badge badge-info">{{ perm }}</span>
              </td>
              <td>{{ cred.expiration }}</td>
              <td>
                <button
                  class="btn btn-sm btn-delete"
                  :disabled="deletingCredIdentity === cred.identity"
                  @click="handleDeleteCredential(cred)"
                >
                  {{ deletingCredIdentity === cred.identity ? 'Deleting…' : 'Delete' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ════════════════════════════════════════
         Create Credential (modal)
    ═════════════════════════════════════════ -->
    <Teleport to="body">
      <div v-if="createModalOpen" class="modal-overlay" @click.self="closeCreateModal">
        <div class="modal-dialog card">
          <div class="card-header">
            <h3 class="card-title">Create Credential</h3>
            <button class="btn btn-ghost btn-sm" @click="closeCreateModal">Close</button>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="cdb-name">Name</label>
              <input id="cdb-name" v-model="cdbForm.name" type="text" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label" for="cdb-expiration">Expiration</label>
              <input id="cdb-expiration" v-model="cdbForm.expiration" type="date" class="form-input" />
            </div>

            <div class="form-group form-group--full">
              <label class="form-label" for="cdb-description">Description</label>
              <input id="cdb-description" v-model="cdbForm.description" type="text" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label" for="cdb-endpoint">Endpoint</label>
              <select id="cdb-endpoint" v-model="cdbForm.endpoint" class="form-input">
                <option v-for="opt in AUDIENCES" :key="opt.value" :value="opt.value">{{ opt.value }}</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Permissions</label>
              <div class="scope-grid">
                <label v-for="scope in cdbCurrentScopes" :key="scope" class="scope-item">
                  <input type="checkbox" v-model="cdbSelectedScopes[scope]" />
                  <span>{{ scope }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn btn-primary btn-sm" :disabled="generatingCreds || !cdbForm.name" @click="handleGenerateCredentials">
              {{ generatingCreds ? 'Generating…' : 'Create Credential' }}
            </button>
            <span v-if="credsError" class="save-feedback save-feedback--error">{{ credsError }}</span>
          </div>

          <div v-if="credsResult" class="cte-result">
            <dl class="info-list">
              <div class="info-item">
                <dt>Client ID</dt>
                <dd>{{ credsResult.clientId }}
                  <button class="btn btn-ghost btn-sm" @click="copyCredsField('clientId')">
                    {{ credsCopied === 'clientId' ? 'Copied!' : 'Copy' }}
                  </button>
                </dd>
              </div>
              <div class="info-item">
                <dt>Client Secret</dt>
                <dd>{{ credsSecretVisible ? credsResult.clientSecret : maskedPassword }}
                  <button class="btn btn-ghost btn-sm" @click="credsSecretVisible = !credsSecretVisible">
                    {{ credsSecretVisible ? 'Hide' : 'Show' }}
                  </button>
                  <button class="btn btn-ghost btn-sm" @click="copyCredsField('clientSecret')">
                    {{ credsCopied === 'clientSecret' ? 'Copied!' : 'Copy' }}
                  </button>
                </dd>
              </div>
              <div class="info-item">
                <dt>Username</dt>
                <dd>{{ credsResult.name }}
                  <button class="btn btn-ghost btn-sm" @click="copyCredsField('name')">
                    {{ credsCopied === 'name' ? 'Copied!' : 'Copy' }}
                  </button>
                </dd>
              </div>
              <div class="info-item">
                <dt>Password</dt>
                <dd>
                  <span
                    class="secret-highlight"
                    title="This value is only visible once — save it securely now or it will be lost."
                  >{{ credsPasswordVisible ? credsResult.password : maskedPassword }}</span>
                  <button class="btn btn-ghost btn-sm" @click="credsPasswordVisible = !credsPasswordVisible">
                    {{ credsPasswordVisible ? 'Hide' : 'Show' }}
                  </button>
                  <button class="btn btn-ghost btn-sm" @click="copyCredsField('password')">
                    {{ credsCopied === 'password' ? 'Copied!' : 'Copy' }}
                  </button>
                </dd>
              </div>
            </dl>
            <p class="form-hint">Saved — head to <strong>ROPG</strong> to generate a token with these credentials.</p>
          </div>
        </div>
      </div>
    </Teleport>

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
import { exchangeToken, createCdbCredentials, getCdbCredentials, deleteCdbCredentials } from '@/lib/igbcApi'
import { highlightJson, highlightJwt } from '@/lib/syntaxHighlight'

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

const includeRefreshToken = ref(false)

// Space-delimited scope forwarded verbatim to /oauth/token — Auth0 RBAC (not this string) is the actual gate.
const requestedScope = computed(() => {
  const scopes = currentScopes.value.filter((scope) => selectedScopes[scope])
  if (includeRefreshToken.value) scopes.push('offline_access')
  return scopes.join(' ')
})

const exchanging = ref(false)
const exchangeError = ref('')
const result = ref(null)
const copied = ref(false)
const refreshCopied = ref(false)

async function handleExchange() {
  exchanging.value = true
  exchangeError.value = ''
  result.value = null
  try {
    const token = await getAccessTokenSilently()
    result.value = await exchangeToken(token, audience.value, requestedScope.value)
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

async function copyRefreshToken() {
  if (!result.value?.refresh_token) return
  await navigator.clipboard.writeText(result.value.refresh_token)
  refreshCopied.value = true
  setTimeout(() => { refreshCopied.value = false }, 2000)
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

const cimdUrl = `${window.location.origin}/oauth-client-metadata.json`
const cimdJson = ref(null)
const cimdError = ref('')
const cimdCopied = ref(false)

async function loadCimd() {
  if (cimdJson.value || cimdError.value) return
  try {
    const res = await fetch('/oauth-client-metadata.json')
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    cimdJson.value = await res.json()
  } catch (e) {
    cimdError.value = e?.message ?? 'Failed to load the CIMD document.'
  }
}

async function copyCimd() {
  if (!cimdJson.value) return
  await navigator.clipboard.writeText(fmtJson(cimdJson.value))
  cimdCopied.value = true
  setTimeout(() => { cimdCopied.value = false }, 2000)
}

watch(activeFeature, (key) => {
  if (key === 'cimd') loadCimd()
})

const dcrForm = reactive({
  clientName: '',
  redirectUris: '',
  tokenEndpointAuthMethod: 'client_secret_post',
  grantTypes: '',
  responseTypes: '',
})

async function loadDcrPreset() {
  const res = await fetch('/oauth-client-registration.json')
  const preset = await res.json()
  dcrForm.clientName = preset.client_name ?? ''
  dcrForm.redirectUris = (preset.redirect_uris ?? []).join('\n')
  dcrForm.tokenEndpointAuthMethod = preset.token_endpoint_auth_method ?? 'client_secret_post'
  dcrForm.grantTypes = (preset.grant_types ?? []).join(', ')
  dcrForm.responseTypes = (preset.response_types ?? []).join(', ')
}

const registering = ref(false)
const registerError = ref('')
const registerResult = ref(null)

function splitList(value, separator) {
  return value.split(separator).map((v) => v.trim()).filter(Boolean)
}

async function handleRegisterApp() {
  registering.value = true
  registerError.value = ''
  registerResult.value = null
  try {
    const payload = {
      client_name: dcrForm.clientName,
      redirect_uris: splitList(dcrForm.redirectUris, '\n'),
      token_endpoint_auth_method: dcrForm.tokenEndpointAuthMethod,
      grant_types: splitList(dcrForm.grantTypes, ','),
      response_types: splitList(dcrForm.responseTypes, ','),
    }
    const res = await fetch('https://auth.sheev.fr/oidc/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      throw new Error(data?.error_description || data?.error || `Request failed with status ${res.status}`)
    }
    registerResult.value = data
  } catch (e) {
    registerError.value = e?.message ?? 'Registration failed.'
  } finally {
    registering.value = false
  }
}

const cdbForm = reactive({
  name: '',
  description: '',
  expiration: '',
  endpoint: AUDIENCES[0].value,
})
const cdbSelectedScopes = reactive({})
const cdbCurrentScopes = computed(() => AUDIENCES.find((a) => a.value === cdbForm.endpoint)?.scopes ?? [])
const cdbPermissions = computed(() => cdbCurrentScopes.value.filter((scope) => cdbSelectedScopes[scope]))

const generatingCreds = ref(false)
const credsError = ref('')
const credsResult = ref(null)
const credsCopied = ref('')
const credsPasswordVisible = ref(false)
const credsSecretVisible = ref(false)
const maskedPassword = '•'.repeat(12)

const step1Open = ref(true)
const step2Open = ref(false)

const createModalOpen = ref(false)

function openCreateModal() {
  cdbForm.name = ''
  cdbForm.description = ''
  cdbForm.expiration = ''
  cdbForm.endpoint = AUDIENCES[0].value
  Object.keys(cdbSelectedScopes).forEach((key) => delete cdbSelectedScopes[key])
  credsError.value = ''
  credsResult.value = null
  credsPasswordVisible.value = false
  credsSecretVisible.value = false
  createModalOpen.value = true
}

function closeCreateModal() {
  if (credsResult.value && !confirm('Did you save the password? It cannot be seen again once you close this window.')) return
  createModalOpen.value = false
}

async function handleGenerateCredentials() {
  generatingCreds.value = true
  credsError.value = ''
  credsResult.value = null
  credsPasswordVisible.value = false
  credsSecretVisible.value = false
  ropgResult.value = null
  ropgError.value = ''
  try {
    const token = await getAccessTokenSilently()
    credsResult.value = await createCdbCredentials(token, {
      name: cdbForm.name,
      description: cdbForm.description,
      expiration: cdbForm.expiration,
      endpoint: cdbForm.endpoint,
      permissions: cdbPermissions.value,
    })

    // Carry the freshly minted credentials into Step 2 so the user doesn't re-type them.
    ropgForm.clientId = credsResult.value.clientId
    ropgForm.clientSecret = credsResult.value.clientSecret
    ropgForm.username = credsResult.value.name
    ropgForm.password = credsResult.value.password
    ropgForm.audience = cdbForm.endpoint
    ropgPasswordVisible.value = false
    Object.keys(ropgSelectedScopes).forEach((key) => delete ropgSelectedScopes[key])
    cdbPermissions.value.forEach((scope) => { ropgSelectedScopes[scope] = true })
    step2Open.value = true
    loadMyCredentials()
  } catch (e) {
    credsError.value = e?.message ?? 'Credential generation failed.'
  } finally {
    generatingCreds.value = false
  }
}

async function copyCredsField(field) {
  const value = credsResult.value?.[field]
  if (!value) return
  await navigator.clipboard.writeText(value)
  credsCopied.value = field
  setTimeout(() => { credsCopied.value = '' }, 2000)
}

const generatingRopgToken = ref(false)
const ropgError = ref('')
const ropgResult = ref(null)
const ropgAccessTokenDecoded = ref(false)
const ropgIdTokenDecoded = ref(false)
const ropgCopied = ref('')
const ropgPasswordVisible = ref(false)

const ropgForm = reactive({
  clientId: '',
  clientSecret: '',
  username: '',
  password: '',
  audience: AUDIENCES[0].value,
})
const ropgSelectedScopes = reactive({})
const ropgCurrentScopes = computed(() => AUDIENCES.find((a) => a.value === ropgForm.audience)?.scopes ?? [])
const ropgPermissions = computed(() => ropgCurrentScopes.value.filter((scope) => ropgSelectedScopes[scope]))
const ropgFormValid = computed(() =>
  Boolean(ropgForm.clientId && ropgForm.clientSecret && ropgForm.username && ropgForm.password && ropgForm.audience)
)

async function handleGenerateRopgToken() {
  if (!ropgFormValid.value) return
  generatingRopgToken.value = true
  ropgError.value = ''
  ropgResult.value = null
  ropgAccessTokenDecoded.value = false
  ropgIdTokenDecoded.value = false
  try {
    const body = new URLSearchParams({
      grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
      realm: 'Public-API-Users',
      username: ropgForm.username,
      password: ropgForm.password,
      client_id: ropgForm.clientId,
      client_secret: ropgForm.clientSecret,
      audience: ropgForm.audience,
      scope: ['openid', 'profile', 'offline_access', ...ropgPermissions.value].join(' '),
    })
    const res = await fetch(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      throw new Error(data?.error_description || data?.error || `Request failed with status ${res.status}`)
    }
    ropgResult.value = data
  } catch (e) {
    ropgError.value = e?.message ?? 'ROPG token generation failed.'
  } finally {
    generatingRopgToken.value = false
  }
}

async function copyRopgField(field) {
  const value = ropgResult.value?.[field]
  if (!value) return
  await navigator.clipboard.writeText(value)
  ropgCopied.value = field
  setTimeout(() => { ropgCopied.value = '' }, 2000)
}

const mycredsLoading = ref(false)
const mycredsError = ref('')
const mycredsList = ref([])
const identityClientId = ref('')
const identityClientSecret = ref('')
const identitySecretVisible = ref(false)

async function loadMyCredentials() {
  mycredsLoading.value = true
  mycredsError.value = ''
  try {
    const token = await getAccessTokenSilently()
    const data = await getCdbCredentials(token)
    mycredsList.value = data?.credentials ?? []
    identityClientId.value = data?.clientId ?? ''
    identityClientSecret.value = data?.clientSecret ?? ''
    identitySecretVisible.value = false
  } catch (e) {
    mycredsError.value = e?.message ?? 'Failed to load credentials.'
  } finally {
    mycredsLoading.value = false
  }
}

watch(activeFeature, (key) => {
  if (key === 'mycreds') loadMyCredentials()
})

const deletingCredIdentity = ref('')

async function handleDeleteCredential(cred) {
  if (!confirm(`Delete credential "${cred.name}"? This cannot be undone.`)) return
  deletingCredIdentity.value = cred.identity
  mycredsError.value = ''
  try {
    const token = await getAccessTokenSilently()
    await deleteCdbCredentials(token, cred.identity)
    await loadMyCredentials()
  } catch (e) {
    mycredsError.value = e?.message ?? 'Failed to delete credential.'
  } finally {
    deletingCredIdentity.value = ''
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

.scope-item--spaced {
  margin-top: 0.5rem;
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

.form-hint--warning {
  color: #92400e;
  font-weight: 600;
}

.input-with-action {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.input-with-action .form-input {
  flex: 1;
}

.ropg-step + .ropg-step {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--auth0-accentuate-4);
}

.ropg-step-summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.6rem;
  user-select: none;
}

.ropg-step-summary::-webkit-details-marker {
  display: none;
}

.ropg-step-summary::before {
  content: '▸';
  color: var(--auth0-accentuate-2);
  transition: transform 0.15s ease;
}

.ropg-step[open] > .ropg-step-summary::before {
  transform: rotate(90deg);
}

.ropg-step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--auth0-accentuate-1);
}

.ropg-step-hint {
  font-size: 0.82rem;
  color: #666;
}

.ropg-step-body {
  margin-top: 1rem;
}

.cimd-note {
  font-size: 0.85rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  border-radius: 8px;
  background: var(--auth0-accentuate-4);
  color: var(--auth0-accentuate-1);
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

.creds-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.creds-table th {
  text-align: left;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--auth0-accentuate-2);
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid var(--auth0-accentuate-4);
}

.creds-table td {
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid var(--auth0-accentuate-4);
  color: var(--auth0-accentuate-1);
  vertical-align: middle;
}

.creds-table .badge {
  margin: 0 0.25rem 0.25rem 0;
}

.btn-delete {
  background-color: #dc2626;
  color: #ffffff;
  border-color: #dc2626;
}
.btn-delete:hover:not(:disabled) {
  background-color: #b91c1c;
  border-color: #b91c1c;
  color: #ffffff;
}

.secret-highlight {
  background-color: #fee2e2;
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
  cursor: help;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(32, 0, 58, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 1000;
}

.modal-dialog {
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
  .creds-table { font-size: 0.78rem; }
}
</style>

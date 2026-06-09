<template>
  <div v-if="mfaChecking" class="mfa-gate">
    <span class="loading-spinner"></span>
  </div>
  <div v-else class="profile">

    <!-- ── Profile header banner ── -->
    <div class="profile-banner">
      <div class="profile-banner-avatar">
        <img v-if="user?.picture" :src="user.picture" :alt="user.name" />
        <span v-else>{{ userInitials }}</span>
      </div>
      <div class="profile-banner-info">
        <h1>{{ user?.name || 'Your Profile' }}</h1>
        <p>{{ user?.email }}</p>
        <span class="chip profile-sub-chip">{{ user?.sub }}</span>
      </div>
      <button
        class="banner-refresh"
        :disabled="refreshing"
        :aria-label="refreshing ? 'Refreshing…' : 'Refresh token'"
        @click="refreshProfile"
      >
        <svg
          class="banner-refresh-icon"
          :class="{ spinning: refreshing }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          width="16" height="16"
        >
          <path d="M23 4v6h-6" />
          <path d="M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
        {{ refreshing ? 'Refreshing…' : 'Refresh' }}
      </button>
    </div>

    <!-- ════════════════════════════════════════
         Section 1 — Basic Attributes
    ═════════════════════════════════════════ -->
    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Basic Attributes
          </h2>
          <p class="section-subtitle">Personal information stored in your Auth0 user profile.</p>
        </div>
      </div>

      <div class="card">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="given-name">First Name</label>
            <input
              id="given-name"
              v-model="basicForm.givenName"
              type="text"
              class="form-input"
              placeholder="John"
              autocomplete="given-name"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="family-name">Last Name</label>
            <input
              id="family-name"
              v-model="basicForm.familyName"
              type="text"
              class="form-input"
              placeholder="Doe"
              autocomplete="family-name"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="nickname">Display Name</label>
            <input
              id="nickname"
              v-model="basicForm.nickname"
              type="text"
              class="form-input"
              placeholder="johndoe"
              autocomplete="nickname"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input
              id="email"
              :value="user?.email"
              type="email"
              class="form-input"
              disabled
              autocomplete="email"
            />
            <span class="form-hint">Managed by your identity provider — update via Auth0.</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="street">Street</label>
            <input
              id="street"
              v-model="basicForm.street"
              type="text"
              class="form-input"
              placeholder="4 Avenue des Champs-Élysées"
              autocomplete="street-address"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="phone">Phone Number</label>
            <input
              id="phone"
              v-model="basicForm.phoneNumber"
              type="tel"
              class="form-input"
              placeholder="+1 555 000 0000"
              autocomplete="tel"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="zipcode">ZIP Code</label>
            <input
              id="zipcode"
              v-model="basicForm.zipcode"
              type="text"
              class="form-input"
              placeholder="75008"
              autocomplete="postal-code"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="city">City</label>
            <input
              id="city"
              v-model="basicForm.city"
              type="text"
              class="form-input"
              placeholder="Paris"
              autocomplete="address-level2"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="country">Country</label>
            <input
              id="country"
              v-model="basicForm.country"
              type="text"
              class="form-input"
              placeholder="France"
              autocomplete="country-name"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="locale">Language</label>
            <select id="locale" v-model="basicForm.locale" class="form-input">
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="fr-FR">Français (France)</option>
              <option value="de-DE">Deutsch (Deutschland)</option>
              <option value="es-ES">Español (España)</option>
              <option value="ja-JP">日本語</option>
              <option value="zh-CN">中文 (简体)</option>
            </select>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-primary btn-sm" disabled title="API integration coming soon">
            Update Profile
          </button>
          <button class="btn btn-ghost btn-sm" @click="loginWithRedirect({ authorizationParams: { custom_param: 'profileMgmt' }, appState: { returnTo: '/profile' } })">
            Edit in Auth0 ↗
          </button>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════
         Section 2 — Consent Management
    ═════════════════════════════════════════ -->
    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Consent Management
          </h2>
          <p class="section-subtitle">Manage your privacy and communication preferences.</p>
        </div>
      </div>

      <div class="card">
        <div class="toggle-group">
          <div class="toggle-info">
            <p class="toggle-label">Terms of Service (CGU)</p>
            <p class="toggle-description">
              I have read and accept the General Terms of Use of this application.
            </p>
          </div>
          <label class="toggle-switch" aria-label="Accept terms of service">
            <input type="checkbox" v-model="consents.cgu" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="toggle-group">
          <div class="toggle-info">
            <p class="toggle-label">GDPR — Data Processing</p>
            <p class="toggle-description">
              I consent to the processing of my personal data in accordance with the GDPR regulation.
            </p>
          </div>
          <label class="toggle-switch" aria-label="GDPR consent">
            <input type="checkbox" v-model="consents.gdpr" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="toggle-group">
          <div class="toggle-info">
            <p class="toggle-label">Newsletter & Communications</p>
            <p class="toggle-description">
              I agree to receive newsletters, product updates, and promotional communications.
            </p>
          </div>
          <label class="toggle-switch" aria-label="Newsletter subscription">
            <input type="checkbox" v-model="consents.newsletter" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="brand-list">
          <p class="brand-list-label">Brand subscriptions</p>
          <div class="brand-grid">
            <label v-for="brand in BRANDS" :key="brand" class="brand-item">
              <input type="checkbox" v-model="brands[brand]" :disabled="!consents.newsletter" />
              <span>{{ brand }}</span>
            </label>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-primary btn-sm" disabled title="API integration coming soon">
            Update Consents
          </button>
          <button class="btn btn-ghost btn-sm" @click="loginWithRedirect({ authorizationParams: { custom_param: 'pref_center' }, appState: { returnTo: '/profile' } })">
            Edit in Auth0 ↗
          </button>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════
         Section 3 — MFA Management
    ═════════════════════════════════════════ -->
    <section class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              <circle cx="12" cy="16" r="1" />
            </svg>
            Multi-Factor Authentication
          </h2>
          <p class="section-subtitle">Enroll additional verification methods to secure your account.</p>
        </div>
      </div>

      <div class="mfa-list">

        <!-- OTP Authenticator App -->
        <div class="mfa-card">
          <div class="mfa-icon mfa-icon--otp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="26" height="26">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M9 7h6M9 11h6M9 15h4" />
            </svg>
          </div>
          <div class="mfa-info">
            <h3>Authenticator App (TOTP)</h3>
            <p>Use Google Authenticator, Authy, or any TOTP-compatible app to generate time-based one-time codes.</p>
            <span class="badge badge-warning">Not enrolled</span>
          </div>
          <div class="mfa-actions">
            <button class="btn btn-primary btn-sm" disabled title="API integration coming soon">
              Enroll OTP
            </button>
            <a
              href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-otp-notifications-for-mfa"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-ghost btn-sm"
            >
              Auth0 Docs ↗
            </a>
          </div>
        </div>

        <!-- SMS -->
        <div class="mfa-card">
          <div class="mfa-icon mfa-icon--sms">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="26" height="26">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div class="mfa-info">
            <h3>SMS Authentication</h3>
            <p>Receive a one-time passcode via SMS to your registered phone number whenever you log in.</p>
            <span class="badge badge-warning">Not enrolled</span>
          </div>
          <div class="mfa-actions">
            <button class="btn btn-primary btn-sm" disabled title="API integration coming soon">
              Enroll SMS
            </button>
            <a
              href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-sms-or-voice-notifications-for-mfa"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-ghost btn-sm"
            >
              Auth0 Docs ↗
            </a>
          </div>
        </div>

        <!-- Security Key / WebAuthn -->
        <div class="mfa-card">
          <div class="mfa-icon mfa-icon--key">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="26" height="26">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          </div>
          <div class="mfa-info">
            <h3>Security Key (WebAuthn / FIDO2)</h3>
            <p>Use a hardware security key (YubiKey, Titan) or built-in biometrics for phishing-resistant authentication.</p>
            <span class="badge badge-warning">Not enrolled</span>
          </div>
          <div class="mfa-actions">
            <button class="btn btn-primary btn-sm" disabled title="API integration coming soon">
              Enroll Key
            </button>
            <a
              href="https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-webauthn-with-security-keys-for-mfa"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-ghost btn-sm"
            >
              Auth0 Docs ↗
            </a>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { reactive, ref, computed, nextTick, watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { user, getAccessTokenSilently, loginWithRedirect, idTokenClaims } = useAuth0()

// Normalise to always have a trailing slash so claim keys compose cleanly
const _aud = import.meta.env.VITE_AUTH0_AUDIENCE || ''
const NS = _aud ? (_aud.endsWith('/') ? _aud : `${_aud}/`) : ''

const userInitials = computed(() => {
  const name = user.value?.name || ''
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?'
})

const basicForm = reactive({
  givenName: '', familyName: '', nickname: '', phoneNumber: '',
  locale: 'en-US', street: '', zipcode: '', city: '', country: '',
})

const consents = reactive({ cgu: false, gdpr: false, newsletter: false })

const BRANDS = ['Delpha', 'Hygena', 'Mobalpa', "SoCoo'c", 'Perene']
// Maps display label → lowercase slug used in the token's interests array
const BRAND_SLUG = { 'Delpha': 'delpha', 'Hygena': 'hygena', 'Mobalpa': 'mobalpa', "SoCoo'c": 'socooc', 'Perene': 'perene' }
const brands = reactive(Object.fromEntries(BRANDS.map((b) => [b, false])))

function syncFromToken() {
  const u = user.value

  basicForm.givenName   = u?.given_name                 || ''
  basicForm.familyName  = u?.family_name                || ''
  basicForm.nickname    = u?.nickname                   || ''
  basicForm.phoneNumber = u?.[`${NS}phonenumber`]       || ''
  basicForm.locale      = u?.locale                     || 'en-US'
  basicForm.street      = u?.[`${NS}address/street`]    || ''
  basicForm.zipcode     = u?.[`${NS}address/zipcode`]   || ''
  basicForm.city        = u?.[`${NS}address/city`]      || ''
  basicForm.country     = u?.[`${NS}address/country`]   || ''

  const consList     = u?.[`${NS}consents`]  || []
  consents.cgu        = consList.includes('cgu')
  consents.gdpr       = consList.includes('gdpr')
  consents.newsletter = consList.includes('newsletter')

  const interestList = u?.[`${NS}interests`] || []
  BRANDS.forEach((b) => { brands[b] = interestList.includes(BRAND_SLUG[b]) })
}

watch(user, syncFromToken, { immediate: true })

const refreshing = ref(false)

async function refreshProfile() {
  refreshing.value = true
  try {
    await getAccessTokenSilently({ cacheMode: 'off' })
    await nextTick()
    syncFromToken()
  } finally {
    refreshing.value = false
  }
}
</script>

<style scoped>
.mfa-gate {
  display: flex;
  justify-content: center;
  padding: 6rem 0;
}

.profile {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-bottom: 2rem;
}

/* ── Banner ── */
.profile-banner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  background: linear-gradient(135deg, var(--auth0-accentuate-1), var(--auth0-accentuate-2));
  border-radius: 16px;
  color: #ffffff;
}

.profile-banner-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--auth0-txt-background-3), var(--auth0-accentuate-3));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
}
.profile-banner-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-banner-info h1 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.profile-banner-info p {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.profile-sub-chip {
  background-color: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
}

.banner-refresh {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: auto;
  padding: 0.4rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  flex-shrink: 0;
  align-self: flex-start;
}
.banner-refresh:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.55);
  color: #ffffff;
}
.banner-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.banner-refresh-icon { display: block; }

.spinning {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Section header ── */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

/* ── Form grid ── */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;
}

.form-group--full {
  grid-column: 1 / -1;
}

/* ── Brand checkboxes ── */
.brand-list {
  padding: 0.75rem 1.25rem 0.25rem;
  margin: 0 -1.5rem;
  background: var(--auth0-accentuate-4);
  border-top: 1px solid var(--auth0-accentuate-4);
}

.brand-list-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--auth0-accentuate-2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.6rem;
}

.brand-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  padding-bottom: 0.5rem;
}

.brand-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: var(--auth0-accentuate-1);
  cursor: pointer;
}

.brand-item input[type="checkbox"]:disabled + span {
  opacity: 0.4;
}

/* ── MFA list ── */
.mfa-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mfa-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid var(--auth0-accentuate-4);
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(32, 0, 58, 0.05);
  transition: box-shadow 0.2s ease;
}
.mfa-card:hover {
  box-shadow: 0 4px 14px rgba(32, 0, 58, 0.1);
}

.mfa-icon {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.mfa-icon--otp { background-color: var(--auth0-accentuate-4); color: var(--auth0-accentuate-2); }
.mfa-icon--sms { background-color: #dbeafe; color: #1e40af; }
.mfa-icon--key { background-color: #fef3c7; color: #92400e; }

.mfa-info {
  flex: 1;
}
.mfa-info h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--auth0-accentuate-1);
  margin-bottom: 0.25rem;
}
.mfa-info p {
  font-size: 0.84rem;
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.mfa-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }

  .profile-banner {
    flex-direction: column;
    text-align: center;
  }

  .section-header {
    flex-direction: column;
  }

  .mfa-card {
    flex-wrap: wrap;
  }
  .mfa-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>

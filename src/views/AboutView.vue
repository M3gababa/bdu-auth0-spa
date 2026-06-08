<template>
  <div class="about">

    <!-- ── Hero ── -->
    <section class="about-hero">
      <Auth0Logo :size="72" />
      <h1>About This Application</h1>
      <p class="about-lead">
        A demonstration of modern, secure authentication patterns using Auth0 OIDC&nbsp;+&nbsp;PKCE
        in a Vue.js&nbsp;3 Single Page Application, ready to deploy on Vercel in minutes.
      </p>
    </section>

    <!-- ── Tech Stack ── -->
    <section class="section">
      <h2 class="section-title">Tech Stack</h2>
      <div class="tech-grid">

        <div class="tech-card">
          <div class="tech-logo">
            <!-- Vue.js logo -->
            <svg viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
              <path d="M161.1 0 130.9 52.4 100.6 0H0l130.9 226.7L261.7 0z" fill="#41B883"/>
              <path d="M161.1 0 130.9 52.4 100.6 0H52.3l78.3 135.7L209.4 0z" fill="#34495E"/>
            </svg>
          </div>
          <h3>Vue.js 3</h3>
          <p>Progressive JavaScript framework with Composition API and <code>&lt;script setup&gt;</code> single-file components.</p>
          <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" class="tech-link">vuejs.org ↗</a>
        </div>

        <div class="tech-card">
          <div class="tech-logo">
            <!-- Simplified Vite logo -->
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
              <defs>
                <linearGradient id="vg" x1="6" y1="0" x2="26" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#41D1FF"/>
                  <stop offset="100%" stop-color="#BD34FE"/>
                </linearGradient>
              </defs>
              <polygon points="16,2 30,28 16,23 2,28" fill="url(#vg)"/>
            </svg>
          </div>
          <h3>Vite</h3>
          <p>Next-generation build tool with instant hot-module replacement and highly optimized production bundles.</p>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" class="tech-link">vitejs.dev ↗</a>
        </div>

        <div class="tech-card">
          <div class="tech-logo">
            <Auth0Logo :size="40" />
          </div>
          <h3>@auth0/auth0-vue</h3>
          <p>Official Auth0 SDK for Vue.js. Provides OIDC&nbsp;+&nbsp;PKCE out of the box — no client secret needed.</p>
          <a href="https://github.com/auth0/auth0-vue" target="_blank" rel="noopener noreferrer" class="tech-link">github.com/auth0/auth0-vue ↗</a>
        </div>

        <div class="tech-card">
          <div class="tech-logo">
            <!-- Vue Router -->
            <svg viewBox="0 0 24 24" fill="none" stroke="#42b883" stroke-width="2" width="40" height="40">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <h3>Vue Router 4</h3>
          <p>Official router with lazy-loaded routes and Auth0 navigation guards to protect authenticated pages.</p>
          <a href="https://router.vuejs.org" target="_blank" rel="noopener noreferrer" class="tech-link">router.vuejs.org ↗</a>
        </div>

        <div class="tech-card">
          <div class="tech-logo">
            <!-- Vercel logo -->
            <svg viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
              <path d="M37.5 0L75.1 65H0L37.5 0Z" fill="#000000"/>
            </svg>
          </div>
          <h3>Vercel</h3>
          <p>Deployed with automatic SPA route rewrites via <code>vercel.json</code> — zero-config CI/CD from GitHub.</p>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="tech-link">vercel.com ↗</a>
        </div>

        <div class="tech-card">
          <div class="tech-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--auth0-txt-background-3)" stroke-width="2" width="40" height="40">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              <path d="M2 12h20"/>
            </svg>
          </div>
          <h3>CSS Custom Properties</h3>
          <p>Fully themed via Auth0 brand color tokens defined in <code>colors.css</code> — easy to customize per tenant.</p>
        </div>

      </div>
    </section>

    <!-- ── Features ── -->
    <section class="section">
      <h2 class="section-title">Features</h2>
      <div class="features-grid">
        <div v-for="feat in features" :key="feat.title" class="feature-item">
          <span class="feature-check" aria-hidden="true">✓</span>
          <div>
            <h4>{{ feat.title }}</h4>
            <p>{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PKCE Flow Diagram ── -->
    <section class="section">
      <h2 class="section-title">OIDC + PKCE Authorization Flow</h2>
      <div class="card flow-card">
        <div class="flow-steps">
          <div v-for="(step, i) in pkceSteps" :key="i" class="flow-step">
            <div class="flow-number">{{ i + 1 }}</div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
          <div v-for="i in 3" :key="`arrow-${i}`" class="flow-arrow" aria-hidden="true">→</div>
        </div>
      </div>
    </section>

    <!-- ── Setup / Configuration ── -->
    <section class="section">
      <h2 class="section-title">Configuration</h2>
      <div class="card">
        <p class="section-subtitle">
          Copy <code>.env.example</code> to <code>.env.local</code> and fill in your Auth0 tenant credentials:
        </p>
        <div class="code-block">
          <pre><code>VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
# Optional — include for API access tokens:
# VITE_AUTH0_AUDIENCE=https://your-api-identifier</code></pre>
        </div>
        <div class="alert alert-info" style="margin-top: 1.25rem">
          <strong>Auth0 Dashboard:</strong> Register
          <code>http://localhost:5173</code> (dev) and your Vercel URL as
          <em>Allowed Callback URLs</em>, <em>Logout URLs</em>, and <em>Web Origins</em>.
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import Auth0Logo from '@/components/Auth0Logo.vue'

const features = [
  {
    title: 'OIDC + PKCE Authentication',
    desc: 'Secure authorization code flow with PKCE (RFC 7636) — no client secret stored in the browser.',
  },
  {
    title: 'Auth0 Universal Login',
    desc: 'Delegates login/signup to Auth0\'s hosted UI, supporting social, enterprise, and passwordless providers.',
  },
  {
    title: 'Route Guards',
    desc: 'Protected routes redirect unauthenticated users to login, then return them to the original destination.',
  },
  {
    title: 'Session Persistence',
    desc: 'Tokens cached in localStorage survive page refreshes — no forced re-login on reload.',
  },
  {
    title: 'Profile Management UI',
    desc: 'Complete UX for updating attributes, managing GDPR consents, and enrolling MFA factors.',
  },
  {
    title: 'Vercel Deployment',
    desc: 'SPA route rewrites in vercel.json ensure client-side navigation works on direct URL access.',
  },
  {
    title: 'Live Session Context',
    desc: 'Real-time display of browser, OS, locale, timezone, and screen resolution from the User-Agent.',
  },
  {
    title: 'Auth0 Brand Theming',
    desc: 'All colors driven by CSS custom properties from colors.css — swap a tenant palette with one file.',
  },
]

const pkceSteps = [
  {
    title: 'Generate Verifier',
    desc: 'The SDK creates a cryptographically random code_verifier string client-side.',
  },
  {
    title: 'Derive Challenge',
    desc: 'code_challenge = BASE64URL(SHA-256(code_verifier)) — safe to send publicly.',
  },
  {
    title: 'Authenticate at Auth0',
    desc: 'User logs in at Universal Login. Auth0 stores the challenge and returns an authorization code.',
  },
  {
    title: 'Exchange Code + Verifier',
    desc: 'The app exchanges the code and the original verifier for ID/access tokens. Interception is useless without the verifier.',
  },
]
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  padding-bottom: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

/* ── Hero ── */
.about-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 2.5rem 0 0.5rem;
}

.about-hero h1 {
  font-size: 2.25rem;
  font-weight: 800;
}

.about-lead {
  font-size: 1.05rem;
  color: #555;
  line-height: 1.75;
  max-width: 600px;
}

/* ── Tech grid ── */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.tech-card {
  background: #ffffff;
  border: 1px solid var(--auth0-accentuate-4);
  border-radius: 12px;
  padding: 1.5rem;
  transition: box-shadow 0.2s ease;
}
.tech-card:hover {
  box-shadow: 0 4px 18px rgba(32, 0, 58, 0.1);
}

.tech-logo {
  height: 48px;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.tech-card h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--auth0-accentuate-1);
  margin-bottom: 0.375rem;
}
.tech-card p {
  font-size: 0.84rem;
  color: #666;
  line-height: 1.55;
  margin-bottom: 0.75rem;
}
.tech-link {
  font-size: 0.8rem;
  font-weight: 600;
}

/* ── Features grid ── */
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.feature-item {
  display: flex;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background: #ffffff;
  border: 1px solid var(--auth0-accentuate-4);
  border-radius: 10px;
}

.feature-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: var(--auth0-txt-background-3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

.feature-item h4 {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--auth0-accentuate-1);
  margin-bottom: 0.25rem;
}
.feature-item p {
  font-size: 0.82rem;
  color: #666;
  line-height: 1.5;
}

/* ── PKCE Flow ── */
.flow-card {
  overflow-x: auto;
}

.flow-steps {
  display: grid;
  /* 4 steps + 3 arrows interleaved */
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: start;
  gap: 0.5rem;
  min-width: 600px;
}

/* Place step divs at odd columns, arrows at even */
.flow-steps .flow-step:nth-child(1) { grid-column: 1; }
.flow-steps .flow-arrow:nth-child(5) { grid-column: 2; }
.flow-steps .flow-step:nth-child(2) { grid-column: 3; }
.flow-steps .flow-arrow:nth-child(6) { grid-column: 4; }
.flow-steps .flow-step:nth-child(3) { grid-column: 5; }
.flow-steps .flow-arrow:nth-child(7) { grid-column: 6; }
.flow-steps .flow-step:nth-child(4) { grid-column: 7; }

.flow-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--auth0-txt-background-3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 0.625rem;
}

.flow-step h4 {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--auth0-accentuate-1);
  margin-bottom: 0.3rem;
}
.flow-step p {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.5;
}

.flow-arrow {
  color: var(--auth0-accentuate-3);
  font-size: 1.5rem;
  justify-self: center;
  align-self: center;
  padding-top: 0.25rem;
}

/* ── Code block ── */
.code-block {
  background-color: var(--auth0-accentuate-1);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
}
.code-block pre { margin: 0; }
.code-block code {
  background: none;
  color: var(--auth0-accentuate-3);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875rem;
  line-height: 1.75;
  padding: 0;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .tech-grid { grid-template-columns: 1fr 1fr; }
  .features-grid { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .tech-grid { grid-template-columns: 1fr; }
}
</style>

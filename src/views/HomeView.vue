<template>
  <div class="home">

    <!-- ── Hero ── -->
    <section class="hero">
      <div class="hero-content">
        <Auth0Logo :size="100" />
        <div class="hero-text">
          <h1 class="hero-title">Auth0 SPA PKCE Demo</h1>
          <p class="hero-subtitle">
            A modern, production-ready single-page application demonstrating
            <strong>OIDC + PKCE</strong> authentication with Auth0 and Vue.js&nbsp;3.
          </p>
          <div class="hero-chips">
            <span class="chip">Vue 3</span>
            <span class="chip">OIDC · PKCE</span>
            <span class="chip">@auth0/auth0-vue</span>
            <span class="chip">Vercel Ready</span>
          </div>
          <div class="hero-actions">
            <template v-if="!isAuthenticated">
              <button class="btn btn-primary btn-lg" @click="loginWithRedirect()">
                Get started — Log in
              </button>
              <RouterLink to="/about" class="btn btn-secondary btn-lg">Learn more</RouterLink>
            </template>
            <template v-else>
              <RouterLink to="/profile" class="btn btn-primary btn-lg">View Profile</RouterLink>
              <RouterLink to="/about" class="btn btn-secondary btn-lg">About this app</RouterLink>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Live context cards ── -->
    <section class="context-section">
      <p class="section-eyebrow">Live Context</p>
      <div class="context-grid">
        <SessionCard />
        <UserCard />
      </div>
    </section>

    <!-- ── Feature highlight strip ── -->
    <section class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">🔐</span>
          <h3>OIDC + PKCE</h3>
          <p>
            Proof Key for Code Exchange eliminates the need for a client secret in SPAs,
            preventing authorization-code interception attacks (RFC&nbsp;7636).
          </p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🛡️</span>
          <h3>Auth0 by Okta</h3>
          <p>
            Enterprise-grade identity infrastructure trusted by 18,000&nbsp;+ companies.
            Handles authentication, MFA, and fine-grained authorization at scale.
          </p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">⚡</span>
          <h3>Vue 3 + Vite</h3>
          <p>
            Built with the Vue&nbsp;3 Composition API and Vite for lightning-fast
            development HMR and optimally tree-shaken production bundles.
          </p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import Auth0Logo from '@/components/Auth0Logo.vue'
import SessionCard from '@/components/SessionCard.vue'
import UserCard from '@/components/UserCard.vue'

const { isAuthenticated, loginWithRedirect } = useAuth0()
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 2rem;
}

/* ── Hero ── */
.hero {
  padding: 2.5rem 0 0.5rem;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 3.5rem;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--auth0-accentuate-1);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: #555;
  margin-bottom: 1.25rem;
  line-height: 1.75;
  max-width: 520px;
}

.hero-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ── Context grid ── */
.section-eyebrow {
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--auth0-txt-background-3);
  margin-bottom: 1rem;
}

.context-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

/* ── Feature cards ── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.feature-card {
  background: #ffffff;
  border: 1px solid var(--auth0-accentuate-4);
  border-radius: 12px;
  padding: 1.75rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.feature-card:hover {
  box-shadow: 0 8px 28px rgba(32, 0, 58, 0.1);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.875rem;
}

.feature-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--auth0-accentuate-1);
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.65;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  .hero-title { font-size: 2rem; }
  .hero-subtitle { margin: 0 auto 1.25rem; }
  .hero-chips,
  .hero-actions { justify-content: center; }
  .context-grid,
  .features-grid { grid-template-columns: 1fr; }
}
</style>

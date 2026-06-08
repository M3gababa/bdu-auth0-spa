<template>
  <div class="card">
    <div class="card-header">
      <span class="card-title">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        User Context
      </span>
      <span class="badge" :class="isAuthenticated ? 'badge-success' : 'badge-warning'">
        {{ isAuthenticated ? 'Authenticated' : 'Anonymous' }}
      </span>
    </div>

    <!-- ── Authenticated ── -->
    <template v-if="isAuthenticated && user">
      <div class="user-profile">
        <div class="user-avatar-lg">
          <img v-if="user.picture" :src="user.picture" :alt="user.name" />
          <span v-else>{{ userInitials }}</span>
        </div>
        <div class="user-details">
          <h3 class="user-display-name">{{ user.name }}</h3>
          <p class="user-email">{{ user.email }}</p>
          <div class="user-chips">
            <span v-if="user.email_verified" class="chip">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Email verified
            </span>
          </div>
        </div>
      </div>

      <dl class="info-list">
        <div class="info-item">
          <dt>User ID</dt>
          <dd class="mono">{{ user.sub }}</dd>
        </div>
        <div v-if="user.nickname" class="info-item">
          <dt>Nickname</dt>
          <dd>{{ user.nickname }}</dd>
        </div>
        <div v-if="user.updated_at" class="info-item">
          <dt>Profile updated</dt>
          <dd>{{ new Date(user.updated_at).toLocaleDateString() }}</dd>
        </div>
      </dl>

      <div class="card-actions">
        <RouterLink to="/profile" class="btn btn-primary btn-sm">Manage Profile</RouterLink>
      </div>
    </template>

    <!-- ── Anonymous ── -->
    <template v-else>
      <div class="anonymous">
        <div class="anon-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="44" height="44">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <p>You are browsing anonymously. Log in to see your profile and access all features.</p>
        <button class="btn btn-primary" @click="loginWithRedirect()">Log in with Auth0</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated, user, loginWithRedirect } = useAuth0()

/** Two-letter initials derived from the user's full name */
const userInitials = computed(() => {
  const name = user.value?.name || ''
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?'
})
</script>

<style scoped>
.user-profile {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.user-avatar-lg {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--auth0-txt-background-3), var(--auth0-accentuate-3));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(153, 33, 254, 0.3);
}
.user-avatar-lg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-display-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--auth0-accentuate-1);
  margin-bottom: 0.2rem;
}

.user-email {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.user-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.mono {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.75rem !important;
  word-break: break-all;
  max-width: 225px;
}

/* Anonymous state */
.anonymous {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  padding: 1.25rem 0;
}

.anon-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--auth0-txt-background-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bbb;
}

.anonymous p {
  color: #666;
  font-size: 0.9rem;
  max-width: 280px;
  line-height: 1.6;
}
</style>

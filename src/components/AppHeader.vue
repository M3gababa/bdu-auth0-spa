<template>
  <header class="app-header">
    <div class="header-inner container">

      <!-- Brand -->
      <RouterLink to="/" class="header-logo" aria-label="Go to home">
        <Auth0Logo :size="34" variant="black" show-text />
      </RouterLink>

      <!-- Primary navigation -->
      <nav class="header-nav" role="navigation" aria-label="Main navigation">
        <RouterLink to="/" class="nav-link" :class="{ active: route.name === 'home' }">
          Home
        </RouterLink>
        <RouterLink
          to="/profile"
          class="nav-link"
          :class="{ active: route.name === 'profile', 'nav-link--locked': !isAuthenticated }"
          :title="isAuthenticated ? '' : 'Log in to access your profile'"
        >
          Profile
        </RouterLink>
        <RouterLink to="/about" class="nav-link" :class="{ active: route.name === 'about' }">
          About
        </RouterLink>
      </nav>

      <!-- Auth actions -->
      <div class="header-auth">
        <template v-if="isAuthenticated">
          <div class="user-pill" role="status" :aria-label="`Logged in as ${user?.name}`">
            <div class="user-avatar">
              <img v-if="user?.picture" :src="user.picture" :alt="user.name" />
              <span v-else>{{ userInitials }}</span>
            </div>
            <span class="user-name">{{ user?.given_name || user?.nickname || user?.name }}</span>
          </div>
          <button class="btn btn-sm header-btn-logout" @click="handleLogout">
            Log out
          </button>
        </template>
        <button v-else class="btn btn-accent btn-sm" @click="handleLogin">
          Log in
        </button>
      </div>

      <!-- Mobile menu toggle -->
      <button
        class="mobile-toggle"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <div v-if="mobileOpen" id="mobile-menu" class="mobile-menu">
      <RouterLink to="/" class="nav-link" @click="mobileOpen = false">Home</RouterLink>
      <RouterLink
        v-if="isAuthenticated"
        to="/profile"
        class="nav-link"
        @click="mobileOpen = false"
      >
        Profile
      </RouterLink>
      <RouterLink to="/about" class="nav-link" @click="mobileOpen = false">About</RouterLink>
      <hr class="mobile-divider" />
      <button v-if="isAuthenticated" class="btn btn-sm header-btn-logout" @click="handleLogout">
        Log out
      </button>
      <button v-else class="btn btn-accent btn-sm" @click="handleLogin">Log in</button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import Auth0Logo from '@/components/Auth0Logo.vue'

const route = useRoute()
const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0()

const mobileOpen = ref(false)

/** First two letters of the user's name for the avatar fallback */
const userInitials = computed(() => {
  const name = user.value?.name || ''
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?'
})

/** Start the PKCE authorization code flow via Auth0 Universal Login */
function handleLogin() {
  loginWithRedirect()
}

/** Invalidate the Auth0 session and return to the app root */
function handleLogout() {
  logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>

<style scoped>
.app-header {
  background: linear-gradient(
    120deg,
    var(--auth0-accentuate-6) 0%,
    var(--auth0-accentuate-5) 5%,
    var(--auth0-accentuate-3) 10%,
    var(--auth0-accentuate-2) 15%,
    var(--auth0-accentuate-1) 50%,
    var(--auth0-accentuate-2) 85%,
    var(--auth0-accentuate-3) 90%,
    var(--auth0-accentuate-5) 95%,
    var(--auth0-accentuate-6) 100%
  );
  color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.35);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 64px;
}

.header-logo {
  text-decoration: none;
  flex-shrink: 0;
}

/* Navigation links */
.header-nav {
  display: flex;
  gap: 0.25rem;
  flex: 1;
}

.nav-link {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  padding: 0.45rem 0.875rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.15s ease;
}
.nav-link:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}
.nav-link.active {
  color: #ffffff;
  background-color: var(--auth0-txt-background-3);
}
.nav-link--locked {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* Auth area */
.header-auth {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

.header-btn-logout {
  background-color: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.4rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.header-btn-logout:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: #ffffff;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  padding: 0.2rem 0.875rem 0.2rem 0.2rem;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--auth0-txt-background-3), var(--auth0-accentuate-3));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #ffffff;
  overflow: hidden;
  flex-shrink: 0;
}
.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 0.84rem;
  font-weight: 500;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Mobile toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;
}
.mobile-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background-color: #ffffff;
  border-radius: 2px;
  transition: transform 0.2s ease;
}

/* Mobile drawer */
.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1rem 1rem;
  background-color: var(--auth0-accentuate-2);
}

.mobile-divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .header-nav,
  .header-auth {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }
}
</style>

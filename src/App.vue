<template>
  <!-- Full-page loading screen while Auth0 resolves the initial session -->
  <div v-if="isLoading" class="auth-loading">
    <div class="loading-spinner"></div>
    <p>Initializing…</p>
  </div>

  <template v-else>
    <AppHeader />
    <main class="main-content">
      <div class="container">
        <RouterView />
      </div>
    </main>
    <AppFooter />
  </template>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const { isLoading } = useAuth0()
</script>

<style scoped>
.auth-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
  color: var(--auth0-accentuate-2);
  font-weight: 500;
}
</style>

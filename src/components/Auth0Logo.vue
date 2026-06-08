<template>
  <div class="auth0-logo" :class="`auth0-logo--${variant}`">
    <!-- Hexagonal shield badge inspired by Auth0 brand identity -->
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Auth0 logo"
    >
      <path d="M40 4 L68 20 L68 60 L40 76 L12 60 L12 20 Z" :fill="shieldColor" />
      <rect x="28" y="38" width="24" height="18" rx="3" fill="white" />
      <path
        d="M32 38 V30 Q40 22 48 30 V38"
        stroke="white"
        stroke-width="3.5"
        fill="none"
        stroke-linecap="round"
      />
      <circle cx="40" cy="46" r="3" :fill="shieldColor" />
    </svg>
    <span v-if="showText" class="auth0-logo__text">auth0</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Rendered size in pixels (square) */
  size: { type: Number, default: 48 },
  /**
   * Visual variant:
   *   'default' — purple shield, dark text (for light backgrounds)
   *   'light'   — purple shield, white text (for dark backgrounds)
   *   'black'   — black shield + black wordmark (Lockup black, Auth0 brand)
   *   'dark'    — dark-purple shield, dark text
   */
  variant: { type: String, default: 'default' },
  /** Whether to render the "auth0" wordmark next to the shield (makes it a Lockup) */
  showText: { type: Boolean, default: false },
})

const shieldColor = computed(() => {
  if (props.variant === 'black') return '#000000'
  if (props.variant === 'dark')  return '#20003A'
  return '#9921FE'
})
</script>

<style scoped>
.auth0-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.auth0-logo__text {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--auth0-accentuate-1);
}

.auth0-logo--light .auth0-logo__text {
  color: #ffffff;
}

.auth0-logo--black .auth0-logo__text {
  color: #000000;
}
</style>

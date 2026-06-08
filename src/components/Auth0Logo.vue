<template>
  <div class="auth0-logo" :class="`auth0-logo--${variant}`">
    <img
      :src="showText ? '/logo.svg' : '/icon.svg'"
      :height="size"
      alt="Auth0 logo"
    />
  </div>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 48 },
  variant: { type: String, default: 'default' },
  showText: { type: Boolean, default: false },
})
</script>

<style scoped>
.auth0-logo {
  display: inline-flex;
  align-items: center;
}
</style>
<template>
  <div class="card">
    <div class="card-header">
      <span class="card-title">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
        Session Context
      </span>
      <span class="badge badge-info">Live</span>
    </div>

    <dl class="info-list">
      <div class="info-item">
        <dt>Browser</dt>
        <dd>{{ session.browser }}</dd>
      </div>
      <div class="info-item">
        <dt>Operating System</dt>
        <dd>{{ session.os }}</dd>
      </div>
      <div class="info-item">
        <dt>Language</dt>
        <dd>{{ session.language }}</dd>
      </div>
      <div class="info-item">
        <dt>Timezone</dt>
        <dd>{{ session.timezone }}</dd>
      </div>
      <div class="info-item">
        <dt>Screen</dt>
        <dd>{{ session.screen }}</dd>
      </div>
      <div class="info-item">
        <dt>Local Time</dt>
        <dd>{{ session.clock }}</dd>
      </div>
    </dl>

    <!-- Raw UA string, collapsed by default -->
    <details class="ua-details">
      <summary>Raw User-Agent</summary>
      <code>{{ session.userAgent }}</code>
    </details>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'

/** Extract a human-readable browser name + major version from a UA string */
function parseBrowser(ua) {
  if (ua.includes('Edg/'))     return `Edge ${ua.match(/Edg\/(\d+)/)?.[1] || ''}`
  if (ua.includes('OPR/'))     return `Opera ${ua.match(/OPR\/(\d+)/)?.[1] || ''}`
  if (ua.includes('Chrome/') && !ua.includes('Chromium/'))
    return `Chrome ${ua.match(/Chrome\/(\d+)/)?.[1] || ''}`
  if (ua.includes('Firefox/')) return `Firefox ${ua.match(/Firefox\/(\d+)/)?.[1] || ''}`
  if (ua.includes('Safari/') && !ua.includes('Chrome/'))
    return `Safari ${ua.match(/Version\/(\d+)/)?.[1] || ''}`
  return 'Unknown browser'
}

/** Extract operating system from a UA string */
function parseOS(ua) {
  if (ua.includes('Windows NT 10.0')) return 'Windows 10 / 11'
  if (ua.includes('Windows NT'))      return 'Windows'
  if (ua.includes('Mac OS X'))        return `macOS ${(ua.match(/Mac OS X ([\d_]+)/)?.[1] || '').replace(/_/g, '.')}`
  if (ua.includes('Android'))         return `Android ${ua.match(/Android ([\d.]+)/)?.[1] || ''}`
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
  if (ua.includes('Linux'))           return 'Linux'
  return 'Unknown OS'
}

const ua = navigator.userAgent
let clockTimer

const session = reactive({
  userAgent: ua,
  browser:   parseBrowser(ua),
  os:        parseOS(ua),
  language:  navigator.language || 'Unknown',
  timezone:  Intl.DateTimeFormat().resolvedOptions().timeZone,
  screen:    `${window.screen.width}×${window.screen.height}`,
  clock:     new Date().toLocaleTimeString(),
})

// Tick the live clock every second
onMounted(() => {
  clockTimer = setInterval(() => {
    session.clock = new Date().toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => clearInterval(clockTimer))
</script>

<style scoped>
.ua-details {
  margin-top: 1rem;
  border-top: 1px solid var(--auth0-accentuate-4);
  padding-top: 1rem;
}

.ua-details summary {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--auth0-accentuate-2);
  cursor: pointer;
  margin-bottom: 0.5rem;
  user-select: none;
}

.ua-details code {
  display: block;
  font-size: 0.72rem;
  line-height: 1.6;
  color: #555;
  word-break: break-all;
  background-color: var(--auth0-txt-background-2);
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 0.5rem;
}
</style>

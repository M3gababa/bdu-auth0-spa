<template>
  <footer class="app-footer">
    <div class="footer-body container">

      <!-- Brand column -->
      <div class="footer-brand">
        <Auth0Logo :size="32" variant="black" show-text />
        <p class="footer-tagline">Secure authentication for everyone.</p>
      </div>

      <!-- Link columns -->
      <div class="footer-links">
        <div class="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="https://auth0.com" target="_blank" rel="noopener noreferrer">auth0.com</a></li>
            <li><a href="https://auth0.com/why-auth0" target="_blank" rel="noopener noreferrer">Why Auth0</a></li>
            <li><a href="https://auth0.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Developers</h4>
          <ul>
            <li><a href="https://auth0.com/docs" target="_blank" rel="noopener noreferrer">Documentation</a></li>
            <li><a href="https://auth0.com/docs/quickstarts" target="_blank" rel="noopener noreferrer">Quickstarts</a></li>
            <li><a href="https://community.auth0.com" target="_blank" rel="noopener noreferrer">Community</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="https://auth0.com/blog" target="_blank" rel="noopener noreferrer">Blog</a></li>
            <li><a href="https://status.auth0.com" target="_blank" rel="noopener noreferrer">Status</a></li>
            <li><a href="https://auth0.com/security" target="_blank" rel="noopener noreferrer">Security</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; {{ year }} Okta, Inc. All rights reserved.</p>
        <div class="footer-legal">
          <a href="https://auth0.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="https://auth0.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Auth0Logo from '@/components/Auth0Logo.vue'

const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
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
  color: rgba(255, 255, 255, 0.75);
  margin-top: auto;
}

.footer-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 4rem;
  padding: 3rem 1.5rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-tagline {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.5;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-col h4 {
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-col a {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.15s ease;
}
.footer-col a:hover {
  color: var(--auth0-accentuate-3);
  text-decoration: none;
}

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem 0;
}

.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
}

.footer-legal {
  display: flex;
  gap: 1.5rem;
}
.footer-legal a {
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
  text-decoration: none;
}
.footer-legal a:hover {
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .footer-body {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }
  .footer-links {
    grid-template-columns: 1fr 1fr;
  }
  .footer-bottom-inner {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>

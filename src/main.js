import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

/**
 * Initialize the Auth0 SDK.
 * The SDK automatically uses PKCE (RFC 7636) for all SPAs — no extra config needed.
 * Tokens are cached in localStorage so sessions survive page refreshes.
 */
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      // Include audience only when set — this adds an access token for your API
      ...(import.meta.env.VITE_AUTH0_AUDIENCE && {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }),
    },
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
    onRedirectCallback: (appState) => {
      router.replace(appState?.target ?? window.location.pathname)
    },
  })
)

app.use(router)
app.mount('#app')

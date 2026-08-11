# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server at http://localhost:5173 with HMR
npm run build      # Production build → dist/
npm run preview    # Serve the production build locally
```

No test runner or linter is configured. There are no test or lint scripts to run.

### First-time setup

```bash
cp .env.example .env.local   # fill in VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID
npm install
npm run dev
```

## Architecture

### Auth0 integration

`@auth0/auth0-vue` is registered as a Vue plugin in `src/main.js`. It automatically uses **PKCE** — no extra configuration is required. The plugin exposes the `useAuth0()` composable throughout the app:

```js
const { isAuthenticated, user, isLoading, loginWithRedirect, logout, getAccessTokenSilently, idTokenClaims } = useAuth0()
```

- `isLoading` is `true` while the SDK resolves the initial session from `localStorage`. `App.vue` gates the entire UI on this flag to avoid flashes of unauthenticated content.
- `authGuard` from the SDK is applied as `beforeEnter` on `/profile` and `/tokens`. It redirects to Auth0 Universal Login and returns the user to the intended route after callback.
- Tokens are cached in `localStorage` (`cacheLocation: 'localstorage'`). Switch to `'memory'` in `src/main.js` for stricter XSS isolation at the cost of losing session on page reload.
- `useRefreshTokens: true` is set in `src/main.js` so `getAccessTokenSilently({ cacheMode: 'off' })` can force a fresh token silently (via refresh token) instead of falling back to an iframe/redirect.

### Custom claims via Auth0 Action (tenant-side, not in this repo)

A post-login Auth0 Action injects **namespaced custom claims** into the ID token, sourced from `user_metadata`. `ProfileView.vue` reads these to populate the profile UI:

- `${audience}/phonenumber`
- `${audience}/address/street`, `/zipcode`, `/city`, `/country`
- `${audience}/consents/cgu`, `/gdpr`, `/newsletter` — each a standalone boolean claim (not an array)
- `${audience}/hobbies` — array of sport slugs matching `SPORTS` in `ProfileView.vue` exactly (`football`, `handball`, `judo`, `esports`, `running`, `cycling`, `swimming`) — no separate slug-mapping needed

The namespace prefix (`NS`) is derived from `VITE_AUTH0_AUDIENCE` at build time. This is **intentional, not incidental**: the Action reads the requesting app's audience and namespaces the claims under it (`audience/attribute`), which lets the *same* Action serve different apps with different claim sets depending on which API they're authorizing against. `VITE_AUTH0_AUDIENCE` doing double duty (protecting the API *and* keying the claims namespace) is the design, not a collision to resolve. If `VITE_AUTH0_AUDIENCE` is unset, `NS` is `''` and none of these claims resolve. This Action lives in the Auth0 tenant dashboard, not in this codebase — if claims aren't showing up, check the tenant's Actions first, not this code.

### Profile page: read-from-token, write-is-UX-only

`ProfileView.vue` is **not** a static form anymore — it's reactive against the ID token:

- `syncFromToken()` maps `user.value` (including the namespaced custom claims above) into local `basicForm`, `consents`, and `brands` reactive state. It runs inside a `watchEffect`, so it re-syncs automatically whenever the SDK's `user` ref changes.
- The **Refresh** button (`refreshProfile()`) calls `getAccessTokenSilently({ cacheMode: 'off' })` to force a token re-issue (bypassing the cache) then re-runs `syncFromToken()`. Use this after changing user_metadata elsewhere (e.g. in the Auth0 dashboard or a self-service screen) to pull the update into the UI without a full logout/login.
- **Update buttons remain intentionally `disabled`** — writes are still UX-only. Nothing in this app calls the Management API. The three "Edit in Auth0 ↗" buttons call `loginWithRedirect()` with a distinct `authorizationParams.custom_param` (`profileMgmt`, `pref_center`) — a tenant-side Auth0 Action reads this param on a fresh login and redirects the user into the corresponding self-service management screen. That routing logic also lives outside this repo.

**Known issue:** the template has `v-if="mfaChecking"` (top of `ProfileView.vue`) but `mfaChecking` is never declared in `<script setup>` — it's always `undefined`/falsy, so the loading-gate branch is permanently dead code. This is known leftover from the MFA-protection work and intentionally left as-is; don't "fix" it as a side effect of unrelated changes without flagging it.

### Tokens page (`/tokens`)

`TokensView.vue` (protected by `authGuard`) is a **permanent feature** (not a temporary debug aid) that fetches the current access token (`getAccessTokenSilently()`) and ID token (`idTokenClaims.value?.__raw`), then renders each with Raw/Decoded tabs (base64url JWT segments decoded client-side) and a copy-to-clipboard button. If `VITE_AUTH0_AUDIENCE` is unset, the access token is opaque (not a JWT) and the decoded view shows a notice instead of parsed claims. It's meant to be visible to any authenticated user — no gating needed.

### Theming

All colours come from CSS custom properties defined in `src/assets/colors.css` (the Auth0 brand palette). `main.css` imports it and builds the full design system on top — buttons, cards, forms, toggles, badges — using only those tokens. Never hardcode colours in component `<style>` blocks; reference a `--auth0-*` variable instead.

### Component conventions

- All components use `<script setup>` (Vue 3 Composition API). No Options API.
- No state management library. Auth state comes from `useAuth0()`; everything else is local `reactive()`/`ref()`.
- `Auth0Logo.vue` accepts a `variant` prop (`'default'` | `'light'` | `'black'` | `'dark'`) and an optional `show-text` prop (renders the lockup vs. the logomark alone).
- Global utility classes (`.btn`, `.card`, `.form-input`, `.toggle-switch`, etc.) are defined in `main.css`. Scoped styles in individual components handle layout and component-specific overrides only.

### Routing

`createWebHistory` is used — **not** hash mode. `vercel.json` contains the required `/*` → `/index.html` rewrite that makes direct URL access work in production.

Routes (`src/router/index.js`):

| Path | Component | Guard |
|---|---|---|
| `/` | `HomeView` | None (public) |
| `/profile` | `ProfileView` (lazy) | `authGuard` |
| `/tokens` | `TokensView` (lazy) | `authGuard` |
| `/about` | `AboutView` (lazy) | None (public) |

### Next implementation step (unchanged from original plan)

Wiring the disabled Update buttons to the Auth0 Management API:

1. The Management API (`https://{domain}/api/v2/`) is a *different* audience than the app's own protected API (the one `VITE_AUTH0_AUDIENCE` already points to for the custom-claims namespace — that's by design, see above, and doesn't change). Getting a Management-API-scoped token means requesting a *second* token with that audience explicitly, e.g. `getAccessTokenSilently({ authorizationParams: { audience: 'https://{domain}/api/v2/' } })` — not reusing the existing `VITE_AUTH0_AUDIENCE` token.
2. `PATCH https://{domain}/api/v2/users/{sub}` requests using that second token.
3. A Pinia store would become warranted once profile state needs cross-component reuse — not needed yet.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_AUTH0_DOMAIN` | Yes | Auth0 tenant domain |
| `VITE_AUTH0_CLIENT_ID` | Yes | SPA application client ID |
| `VITE_AUTH0_AUDIENCE` | No | API identifier for this app's protected API — enables JWT access tokens **and**, by design, keys the namespace a tenant-side Action uses to inject custom claims into the ID token (`ProfileView.vue` reads these) |

All variables are build-time (`VITE_` prefix). They must also be added in the Vercel project dashboard for production builds. Auth0 Dashboard must list the app URL under **Allowed Callback URLs**, **Logout URLs**, and **Web Origins**.

`.env.local` (dev) and `.env` are gitignored; `.env.example` is the template checked into the repo.

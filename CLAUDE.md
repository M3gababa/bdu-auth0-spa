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

### Profile page: read-from-token, write-via-IGBC-API

`ProfileView.vue` is reactive against the ID token for reads, and writes through a separate resource server (the IGBC API, `api.igbc.sheev.fr`) for the Basic Attributes and Consent Management sections:

- `syncFromToken()` maps `user.value` (including the namespaced custom claims above) into local `basicForm`, `consents`, `sports`, and `planet` reactive state. It runs inside a `watchEffect`, so it re-syncs automatically whenever the SDK's `user` ref changes.
- The **Refresh** button (`refreshProfile()`) and the internal `pullLatestFromToken()` helper call `getAccessTokenSilently({ cacheMode: 'off' })` to force a token re-issue (bypassing the cache) then re-run `syncFromToken()`. Use this after changing user_metadata elsewhere (e.g. via the API, the Auth0 dashboard, or a self-service screen) to pull the update into the UI without a full logout/login.
- **Sports lives in the Basic Attributes card**, not Consent Management — the IGBC API writes `hobbies` via the same `PUT /api/profile` call as names/address/phone, so the UI groups them the same way.
- **"Update Profile"** (`handleUpdateProfile()`) calls `updateProfile()` from `src/lib/igbcApi.js` with `given_name`/`family_name`/`nickname`/`phonenumber`/`address` (including `planet`, read from `${NS}address/planet` or defaulted to `'Earth'` — no dedicated UI field)/`hobbies` (the full `sports` object — the API replaces it wholesale, so partial updates would silently wipe omitted sports). On success it calls `pullLatestFromToken()` to reflect the save immediately.
- **"Update Consents"** (`handleUpdateConsents()`) calls `updateConsents()` with `{ cgu, gdpr, newsletter }` — this is a partial/merge update server-side, unlike the profile endpoint.
- Both buttons show inline "Saved" / error feedback (`.save-feedback` in `ProfileView.vue`) and disable themselves while in flight.
- The "Edit in Auth0 ↗" buttons (passing `authorizationParams.custom_param`: `profileMgmt` / `pref_center`) are **kept intentionally alongside** the native save buttons as an alternative path — not removed, per explicit decision.
- MFA and account deletion remain UX-only/disabled for now — the IGBC API has endpoints for both (`/api/security/mfa*`, `DELETE /api/profile`) but they're out of scope until asked for. Note if that work starts: the API's MFA factor enum (`email`, `sms`, `security_key`, `guardian_push`) doesn't include a TOTP/authenticator-app factor, which the current MFA cards assume — that mismatch needs resolving first.

**Known issue:** the template has `v-if="mfaChecking"` (top of `ProfileView.vue`) but `mfaChecking` is never declared in `<script setup>` — it's always `undefined`/falsy, so the loading-gate branch is permanently dead code. This is known leftover from the MFA-protection work and intentionally left as-is; don't "fix" it as a side effect of unrelated changes without flagging it.

### IGBC API client (`src/lib/igbcApi.js`)

Thin `fetch` wrapper around `api.igbc.sheev.fr` (base URL from `VITE_IGBC_API_BASE_URL` — same var for prod and local dev; switching it between `https://api.igbc.sheev.fr` and `http://localhost:4000` is a deployment/local-env concern, not something the code branches on). Callers pass an access token explicitly (obtained via `getAccessTokenSilently()` in the calling component) rather than the module reaching into `useAuth0()` itself, keeping it decoupled from Vue. A 400 response body is `{ error: string }` — the client throws `Error(payload.error)`. Note the API returns **400, not 401, for a missing/invalid bearer token** (that's `@auth0/auth0-fastify-api`'s doing, not a bug here). Exports `updateProfile()`, `updateConsents()`, `exchangeToken()`; the same audience already configured via `VITE_AUTH0_AUDIENCE` (`api://sheev/v1`) authorizes all of these calls — no separate token/audience needed.

CORS note: the API had no CORS support at all as of 2026-08-10/11 (`OPTIONS` routes 404 on both prod and local). If a fetch call here fails with a browser CORS error, that's a server-side gap on the API, not a bug in this client — see `api.igbc.sheev.fr/docs` or ask whoever owns that API before changing this code.

### Advanced page (`/advanced`)

Protected by `authGuard` (added when the CTE section was built — the tools here need the caller's own token). Currently has one section:

- **Custom Token Exchange (CTE)** — calls `exchangeToken()` → `POST /api/security/cte` (RFC 8693 token-exchange grant) with the current session's access token as the bearer being exchanged and `{ audience }` as the body. The requested audience is validated server-side against an allowlist, never trusted from the client alone.
  - Field order is **Token Name → Expiration → Description** (first row/group), then **Audience + Permissions/Scopes side by side** (second row/group) — this ordering is a deliberate UX choice, not incidental; don't silently reorder it.
  - **Audience** is a `<select>` with two hardcoded options: `api://sheev-public/v1` and `mcp://sheev/v1` (`AUDIENCES` array in `AdvancedView.vue`) — the only field that actually drives the request.
  - **Token Name**, **Description**, **Expiration**, and the **Permissions/Scopes** checkboxes (shown per-audience via `AUDIENCES[].scopes`) are all **enabled inputs bound to local refs/reactive state, but none of them are sent to the API** — each carries a `title="Not used yet"` tooltip. Don't wire them into `handleExchange()`'s request body without confirming the API accepts them first.
  - **Expiration** options are computed (`expirationOptions`, via `formatExpiryDate()`) to show the actual resulting date next to each duration, e.g. "30 days (Sep 10, 2026)" — computed relative to `new Date()` at render time, not reactive to the passage of time (fine for a dropdown label).
  - Button reads "Generate Token" / "Generating…". On success, shows `token_type`/`expires_in`/`scope`, the raw `access_token` (copy button), and the `decoded` payload the API already returns pre-decoded (no client-side JWT parsing needed here, unlike `TokensView.vue`).

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
| `/advanced` | `AdvancedView` (lazy) | `authGuard` |

### Remaining scope (not wired up yet)

- MFA enrollment/removal and account deletion (GDPR erasure) — the IGBC API supports both, deliberately left disabled/UX-only until asked for. See the factor-enum mismatch note above before starting MFA.
- A Pinia store would become warranted once profile state needs cross-component reuse — not needed yet, since only `ProfileView.vue` reads/writes this state today.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_AUTH0_DOMAIN` | Yes | Auth0 tenant domain |
| `VITE_AUTH0_CLIENT_ID` | Yes | SPA application client ID |
| `VITE_AUTH0_AUDIENCE` | No | API identifier for this app's protected API (`api://sheev/v1`) — enables JWT access tokens **and**, by design, keys the namespace a tenant-side Action uses to inject custom claims into the ID token (`ProfileView.vue` reads these). Also the audience the IGBC API itself authorizes against — no separate token needed for `src/lib/igbcApi.js` calls. |
| `VITE_IGBC_API_BASE_URL` | No (required for profile/consent saves to work) | Base URL of the IGBC resource server (`https://api.igbc.sheev.fr`) that `src/lib/igbcApi.js` calls |

All variables are build-time (`VITE_` prefix). They must also be added in the Vercel project dashboard for production builds. Auth0 Dashboard must list the app URL under **Allowed Callback URLs**, **Logout URLs**, and **Web Origins**.

`.env.local` (dev) and `.env` are gitignored; `.env.example` is the template checked into the repo.

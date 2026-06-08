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
const { isAuthenticated, user, isLoading, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0()
```

- `isLoading` is `true` while the SDK resolves the initial session from `localStorage`. `App.vue` gates the entire UI on this flag to avoid flashes of unauthenticated content.
- `authGuard` from the SDK is applied as `beforeEnter` on `/profile`. It redirects to Auth0 Universal Login and returns the user to the intended route after callback.
- Tokens are cached in `localStorage` (`cacheLocation: 'localstorage'`). Switch to `'memory'` in `src/main.js` for stricter XSS isolation at the cost of losing session on page reload.

### Theming

All colours come from CSS custom properties defined in `src/assets/colors.css` (the Auth0 brand palette). `main.css` imports it and builds the full design system on top — buttons, cards, forms, toggles, badges — using only those tokens. Never hardcode colours in component `<style>` blocks; reference a `--auth0-*` variable instead.

### Component conventions

- All components use `<script setup>` (Vue 3 Composition API). No Options API.
- No state management library. Auth state comes from `useAuth0()`; everything else is local `reactive()`/`ref()`.
- `Auth0Logo.vue` accepts a `variant` prop (`'default'` | `'light'` | `'black'` | `'dark'`) and an optional `show-text` prop (renders the lockup vs. the logomark alone).
- Global utility classes (`.btn`, `.card`, `.form-input`, `.toggle-switch`, etc.) are defined in `main.css`. Scoped styles in individual components handle layout and component-specific overrides only.

### Routing

`createWebHistory` is used — **not** hash mode. `vercel.json` contains the required `/*` → `/index.html` rewrite that makes direct URL access work in production.

### Profile page (UX-only sections)

`ProfileView.vue` has three sections whose **Update** buttons are intentionally `disabled`. The local reactive state (`basicForm`, `consents`) is wired to the form UI but not persisted. The next implementation step is calling the Auth0 Management API:

1. Set `VITE_AUTH0_AUDIENCE=https://{domain}/api/v2/` to receive an access token scoped to the Management API.
2. Call `getAccessTokenSilently()` before making `PATCH https://{domain}/api/v2/users/{sub}` requests.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_AUTH0_DOMAIN` | Yes | Auth0 tenant domain |
| `VITE_AUTH0_CLIENT_ID` | Yes | SPA application client ID |
| `VITE_AUTH0_AUDIENCE` | No | API identifier — enables Management API access tokens |

All variables are build-time (`VITE_` prefix). They must also be added in the Vercel project dashboard for production builds. Auth0 Dashboard must list the app URL under **Allowed Callback URLs**, **Logout URLs**, and **Web Origins**.

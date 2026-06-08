# Architecture

This document describes the design decisions and component architecture of the Auth0 SPA PKCE Demo.

---

## Authentication Flow

The app uses the **Authorization Code Flow with PKCE** as defined in [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636). This is the recommended flow for browser-based SPAs because:

- No client secret is required (SPAs cannot keep secrets)
- The PKCE verifier/challenge pair prevents authorization-code injection even if the redirect is intercepted

```
Browser                     Auth0 Universal Login
   │                                │
   │  1. Generate code_verifier     │
   │  2. code_challenge = SHA256(verifier)
   │                                │
   │──── Authorization Request ────▶│
   │     + code_challenge           │
   │                                │  User authenticates
   │◀─── Redirect + auth_code ─────│
   │                                │
   │──── Token Request ────────────▶│
   │     + auth_code + code_verifier│
   │                                │
   │◀─── id_token + access_token ──│
```

The `@auth0/auth0-vue` SDK handles all of these steps automatically — the app only calls `loginWithRedirect()` and `logout()`.

---

## State Management

There is **no external state management library** (no Pinia, no Vuex). All state is either:

| Source | Usage |
|---|---|
| `useAuth0()` composable | `isAuthenticated`, `user`, `isLoading` — reactive, globally available |
| Local `reactive()` / `ref()` | Component-level form state (profile form, consent toggles) |
| `navigator` / `window` APIs | Session context (UA, timezone, screen) — computed once in `SessionCard` |

This is intentional: the app is currently read-only against Auth0. When the Management API integration is added, a Pinia store for profile state would be appropriate.

---

## Component Tree

```
App.vue
├── AppHeader.vue          ← sticky nav, login/logout, user avatar
├── RouterView
│   ├── HomeView.vue
│   │   ├── Auth0Logo.vue
│   │   ├── SessionCard.vue
│   │   └── UserCard.vue
│   ├── ProfileView.vue    ← protected by authGuard
│   │   └── (inline form sections)
│   └── AboutView.vue
│       └── Auth0Logo.vue
└── AppFooter.vue
```

---

## Routing

Routes are defined in `src/router/index.js`:

| Path | Component | Guard |
|---|---|---|
| `/` | `HomeView` | None (public) |
| `/profile` | `ProfileView` | `authGuard` from `@auth0/auth0-vue` |
| `/about` | `AboutView` | None (public) |

`ProfileView` is lazy-loaded (`() => import(...)`) to reduce the initial bundle. The `authGuard` redirects unauthenticated users to Auth0 Universal Login and preserves the intended destination for the post-login callback.

`createWebHistory` is used (not hash mode) because Vercel serves the `index.html` fallback for all paths via `vercel.json`.

---

## Styling Strategy

All styles use **scoped `<style scoped>`** inside each component to avoid class collisions, plus a small set of **global utility classes** in `src/assets/main.css`:

| Class prefix | Purpose |
|---|---|
| `.btn`, `.btn-*` | Button variants (primary, secondary, accent, ghost) |
| `.card`, `.card-*` | Card layout primitives |
| `.form-group`, `.form-*` | Form field wrappers |
| `.toggle-*` | CSS-only toggle switch |
| `.badge`, `.chip` | Status indicators |
| `.info-list`, `.info-item` | Key-value definition lists |
| `.section`, `.section-*` | Page section spacing |
| `.loading-spinner` | CSS keyframe animation |

**Color tokens** live exclusively in `src/assets/colors.css` as CSS custom properties. Swapping to a different tenant palette means editing a single file.

---

## File Naming Conventions

| Pattern | Meaning |
|---|---|
| `PascalCase.vue` | Vue single-file components |
| `camelCase.js` | JavaScript modules |
| `kebab-case.css` | Stylesheets |
| `UPPER_CASE.md` | Project-level documentation |

---

## Environment Variables

All Auth0 credentials are injected at **build time** via Vite's `import.meta.env`:

```
VITE_AUTH0_DOMAIN      Required — Auth0 tenant domain
VITE_AUTH0_CLIENT_ID   Required — SPA application client ID
VITE_AUTH0_AUDIENCE    Optional — API identifier for access tokens
```

The `VITE_` prefix is mandatory for Vite to expose variables to the browser bundle. Never expose a Management API client secret here.

---

## Extending the App

### Adding Management API calls (profile update)

1. Obtain a Management API access token using the `audience` parameter (set `VITE_AUTH0_AUDIENCE=https://{domain}/api/v2/`)
2. In `ProfileView`, call `getAccessTokenSilently()` from `useAuth0()`
3. `PATCH https://{domain}/api/v2/users/{userId}` with the bearer token
4. A Pinia store for profile state becomes warranted at this point

### Adding a new protected route

```js
// src/router/index.js
{
  path: '/dashboard',
  component: () => import('@/views/DashboardView.vue'),
  beforeEnter: authGuard,
}
```

### Customising the theme

Edit `src/assets/colors.css` — all components inherit the updated tokens automatically.

### Adding role-based access

Auth0 roles can be included in the ID token via an [Action](https://auth0.com/docs/customize/actions). Expose them as a custom claim, then read `user['https://your-app/roles']` in components.

# Auth0 SPA PKCE Demo

A modern, production-ready **Single Page Application** demonstrating **OIDC + PKCE** authentication with [Auth0](https://auth0.com), built with Vue.js 3 and deployable on Vercel in minutes.

---

## Features

- **OIDC + PKCE** — Authorization Code Flow with Proof Key for Code Exchange (RFC 7636)
- **Auth0 Universal Login** — delegates login/signup to Auth0's hosted UI
- **Protected routes** — `authGuard` redirects unauthenticated users and returns them after login
- **Session persistence** — tokens cached in `localStorage` survive page reloads
- **Profile management UI** — basic attributes, GDPR consents, MFA enrollment (UX only)
- **Live session context** — browser, OS, locale, timezone, screen resolution
- **Auth0 brand theming** — all colours driven by CSS custom properties in `src/assets/colors.css`
- **Vercel-ready** — SPA rewrites pre-configured in `vercel.json`
- **Responsive** — mobile-first layout with collapsible navigation

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Create an Auth0 application

1. Log in to [manage.auth0.com](https://manage.auth0.com)
2. Go to **Applications → Create Application**
3. Choose **Single Page Application**
4. In **Settings**, add the following URLs (adjust the domain for production):

| Field | Value (dev) |
|---|---|
| Allowed Callback URLs | `http://localhost:5173` |
| Allowed Logout URLs | `http://localhost:5173` |
| Allowed Web Origins | `http://localhost:5173` |

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```dotenv
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Deployment on Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Set environment variables when prompted (or add them later in the Vercel project dashboard):

```
VITE_AUTH0_DOMAIN   → your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID → your-client-id
```

### Option B — Git Integration

1. Push the repo to GitHub / GitLab / Bitbucket
2. Import the project in [vercel.com/new](https://vercel.com/new)
3. Add `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` as environment variables
4. Deploy — Vercel auto-detects Vite and runs `npm run build`

> The `vercel.json` file already contains the rewrite rule that sends all requests to `index.html`, which is required for client-side routing.

After deploying, remember to add the Vercel URL to your Auth0 app's **Allowed Callback URLs**, **Logout URLs**, and **Web Origins**.

---

## Project Structure

```
auth0-spa-pkce/
├── public/
│   └── favicon.svg           # Auth0-inspired shield icon
├── src/
│   ├── assets/
│   │   ├── colors.css        # Auth0 brand color tokens
│   │   └── main.css          # Global styles (resets, layout, components)
│   ├── components/
│   │   ├── Auth0Logo.vue     # Reusable Auth0 shield logo (SVG)
│   │   ├── AppHeader.vue     # Sticky navigation bar
│   │   ├── AppFooter.vue     # Footer with Auth0 links
│   │   ├── SessionCard.vue   # Live browser / OS / timezone context
│   │   └── UserCard.vue      # Auth0 user identity card
│   ├── router/
│   │   └── index.js          # Vue Router + authGuard on /profile
│   ├── views/
│   │   ├── HomeView.vue      # Landing page
│   │   ├── ProfileView.vue   # Profile, consents, MFA (UX only)
│   │   └── AboutView.vue     # App info, tech stack, PKCE diagram
│   ├── App.vue               # Root component (loading gate)
│   └── main.js               # App bootstrap + Auth0 plugin
├── .env.example              # Environment variable template
├── .gitignore
├── index.html
├── package.json
├── vercel.json               # SPA rewrite rule
├── vite.config.js
├── ARCHITECTURE.md
└── README.md
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server at `http://localhost:5173` |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| [Vue.js](https://vuejs.org) | 3.4 | UI framework (Composition API) |
| [Vue Router](https://router.vuejs.org) | 4.3 | Client-side routing + guards |
| [@auth0/auth0-vue](https://github.com/auth0/auth0-vue) | 2.3 | OIDC + PKCE authentication |
| [Vite](https://vitejs.dev) | 5.2 | Build tool + dev server |

---

## Pages

### `/` — Home
Landing page with the Auth0 logo hero, live **Session Context** card (browser, OS, timezone), and **User Context** card (Auth0 profile or anonymous state).

### `/profile` — Profile *(auth required)*
Three sections with full UX, wired to state — API integration is left as the next step:
- **Basic Attributes** — first name, last name, display name, email, phone, locale
- **Consent Management** — CGU, GDPR, Newsletter toggles
- **MFA Management** — OTP, SMS, Security Key enrollment cards

### `/about` — About
App overview, full tech-stack cards, feature list, PKCE flow diagram, and configuration guide.

---

## Security Notes

- PKCE is enforced by default in `@auth0/auth0-vue` — no `response_type=token` implicit flow
- No client secret is stored or shipped to the browser
- Tokens are stored in `localStorage`; switch `cacheLocation` to `'memory'` in `src/main.js` for stricter XSS mitigation (at the cost of losing session on reload)
- All external links use `rel="noopener noreferrer"`

---

## License

MIT — see [Auth0 SDK license](https://github.com/auth0/auth0-vue/blob/main/LICENSE) for the SDK.

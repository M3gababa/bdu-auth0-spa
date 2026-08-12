import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Serves /oidc-callback.html at the extension-less /oidc-callback path,
// since that's the URL registered as the callback with external OIDC providers.
function oidcCallbackRewrite() {
  const rewrite = (req, _res, next) => {
    if (req.url && req.url.split('?')[0] === '/oidc-callback') {
      req.url = req.url.replace('/oidc-callback', '/oidc-callback.html')
    }
    next()
  }
  return {
    name: 'oidc-callback-rewrite',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  plugins: [vue(), oidcCallbackRewrite()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        oidcCallback: fileURLToPath(new URL('./oidc-callback.html', import.meta.url)),
      },
    },
  },
})

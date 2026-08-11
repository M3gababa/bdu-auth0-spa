import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      // Lazy-loaded; the authGuard redirects unauthenticated users to Auth0 login,
      // then back to /profile after a successful callback.
      component: () => import('@/views/ProfileView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: () => import('@/views/TokensView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/advanced',
      name: 'advanced',
      component: () => import('@/views/AdvancedView.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue'),
    },
    {
      path: '/perfil',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('@/views/user/ProfileView.vue'),
    },
    {
      path: '/resumen',
      name: 'summary',
      meta: { requiresAuth: true },
      component: () => import('@/views/user/ResumenView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router

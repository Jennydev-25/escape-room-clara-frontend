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
      meta: { requiresAuth: true, loading: { title: 'Cargando...', message: 'Recuperando tu expediente' } },
      component: () => import('@/views/user/ProfileView.vue'),
    },
    {
      path: '/resumen',
      name: 'summary',
      meta: { requiresAuth: true, loading: { title: 'Cargando...', message: 'Recuperando tu expediente' } },
      component: () => import('@/views/user/ResumenView.vue'),
    },
    {
      path: '/escritorio',
      name: 'game',
      meta: { requiresAuth: true, loading: { title: 'Entrando...', message: 'Cargando ClaraOS' } },
      component: () => import('@/views/game/GameView.vue'),
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

import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('@/views/user/ProfileView.vue'),
    },
    {
      path: '/resumen',
      name: 'summary',
      component: () => import('@/views/user/ResumenView.vue'),
    },
  ],
})

export default router

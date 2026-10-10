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
  ],
})

export default router

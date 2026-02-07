import { createRouter, createWebHistory } from 'vue-router'
import GameDashboard from '@/views/GameDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: GameDashboard,
    },
  ],
})

export default router

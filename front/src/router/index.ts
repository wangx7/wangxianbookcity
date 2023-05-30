import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('token')) next({ name: 'Login' })
  else next()
})

export default router

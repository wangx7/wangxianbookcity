import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/layout/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexView,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path: 'book',
          name: 'Book',
          component: () => import('@/views/book/BookView.vue')
        },
        {
          path: 'moment',
          name: 'Moment',
          component: () => import('@/views/moment/MomentView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('token')) next({ name: 'Login' })
  else next()
})

export default router

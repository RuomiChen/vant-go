import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

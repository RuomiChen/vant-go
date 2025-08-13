import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import Info from '@/views/Info.vue'
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
  },{
    path: '/info',
    name: 'Info',
    component: Info,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

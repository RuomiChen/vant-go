import Auth from '@/views/Auth.vue'
import Group from '@/views/Group.vue'
import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'
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
    path: '/group',
    name: 'Group',
    component: Group,
  },{
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

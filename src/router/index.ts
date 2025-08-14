import Auth from '@/views/Auth.vue'
import Group from '@/views/Group.vue'
import Home from '@/views/Home.vue'
import NewsDetail from '@/views/NewsDetail.vue'
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
  },{
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail,
    props: true // ✅ 让 id 自动作为 props 传给组件
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

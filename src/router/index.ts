import { useTokenStore } from '@/stores/token'
import Auth from '@/views/Auth.vue'
import Group from '@/views/Group.vue'
import Home from '@/views/Home.vue'
import Info from '@/views/Info.vue'
import NewsDetail from '@/views/NewsDetail.vue'
import Settings from '@/views/Settings.vue'
import Write from '@/views/Write.vue'
import { showToast } from 'vant'
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
  }, {
    path: '/group',
    name: 'Group',
    component: Group,
  }, {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  }, {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail,
    props: true // ✅ 让 id 自动作为 props 传给组件
  }, {
    path: '/write',
    name: 'Write',
    component: Write,
    meta: { requiresAuth: true }, // 👈 需要登录
  }, {
    path: '/info',
    name: 'Info',
    component: Info,
    meta: { requiresAuth: true }, // 👈 需要登录
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


// 全局前置守卫
router.beforeEach((to, _from, next) => {
  const tokenStore = useTokenStore()

  if (to.meta.requiresAuth && !tokenStore.token) {
    // 未登录，跳到登录页
    showToast({ type: 'fail', message: '请先登录' })
    next({ path: "/auth", query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  logPageView({
    from: from.fullPath,
    to: to.fullPath,
    time: Date.now().toString(),
  })
})

/**
 * 埋点
 * @param payload 
 */
function logPageView(payload: { from: string; to: string; time: string }) {
  if(payload.to.startsWith("/news/"))
  console.log("埋点记录：", payload)
  // 可以本地存储 / 上报接口
  // fetch("/api/track", { method: "POST", body: JSON.stringify(payload) })
}

export default router

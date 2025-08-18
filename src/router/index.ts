import { recordApi } from '@/api/tracking'
import { useTokenStore } from '@/stores/token'
import Auth from '@/views/Auth.vue'
import ChangePwd from '@/views/ChangePwd.vue'
import Group from '@/views/Group.vue'
import History from '@/views/History.vue'
import Home from '@/views/Home.vue'
import Info from '@/views/Info.vue'
import NewsDetail from '@/views/NewsDetail.vue'
import Search from '@/views/Search.vue'
import Settings from '@/views/Settings.vue'
import Write from '@/views/Write.vue'
import { showToast } from 'vant'
import { createRouter, createWebHistory, RouteLocationNormalizedLoadedGeneric, RouteRecordRaw } from 'vue-router'

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
    meta: { requiresAuth: true },
  }, {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAuth: true },
  }, {
    path: '/search',
    name: 'Search',
    component: Search,
  }, {
    path: '/changePwd',
    name: 'ChangePwd',
    component: ChangePwd,
    meta: { requiresAuth: true },

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
    from: from,
    to: to,
  })
})

/**
 * 埋点
 * @param payload 
 */
async function logPageView({ from, to }: { from: RouteLocationNormalizedLoadedGeneric, to: RouteLocationNormalizedLoadedGeneric }) {
  let newsId: string | undefined
  const tokenStore = useTokenStore()

  if (tokenStore.token && to.name === 'NewsDetail') {
    newsId = to.params.id as string // ✅ 通过 params 获取 id
    await recordApi({
      from: from.fullPath,
      to: to.fullPath,
      action: 'news view',
      extra: newsId ? JSON.stringify({ id: newsId }) : undefined
    })
  }
  // 可以本地存储 / 上报接口
  // fetch("/api/track", { method: "POST", body: JSON.stringify(payload) })
}

export default router

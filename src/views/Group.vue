<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 头部搜索栏 -->
    <div class="bg-white sticky top-0 z-10 shadow-sm">
      <Navbar :item="navbar" />
      <div class="p-4">
        <van-search v-model="searchValue" placeholder="搜索群组" @search="onSearch" @clear="onClear" />
      </div>
    </div>
    <!-- 群组列表 -->
    <div class="py-4">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="group in filteredGroups" :key="group.id" class="mb-3">
            <van-cell-group inset>
              <van-cell :title="group.name" :label="`${group.memberCount}人 · ${group.description}`" is-link
                @click="enterGroup(group.id)">
                <template #icon>
                  <van-image :src="group.avatar" width="40" height="40" round class="mr-3" fit="cover">
                    <template #error>
                      <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <van-icon name="friends" size="20" color="#999" />
                      </div>
                    </template>
                  </van-image>
                </template>

                <template #right-icon>
                  <div class="flex items-center space-x-2">
                    <van-tag v-if="group.owner_id == user?.id" type="primary" size="medium">
                      群主
                    </van-tag>
                    <van-tag v-else-if="group.isAdmin" type="success" size="medium">
                      管理员
                    </van-tag>
                    <van-icon name="arrow" />
                  </div>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 添加右上角选项菜单 -->
    <van-action-sheet v-model:show="showOptionsMenu" :actions="optionsMenuActions" cancel-text="取消"
      @select="onOptionsSelect" />

    <!-- 创建群组弹窗 -->
    <van-dialog v-model:show="showCreateDialog" title="创建群组" show-cancel-button @confirm="createGroup">
      <div class="p-4 space-y-4">
        <van-field v-model="newGroup.name" label="群组名称" placeholder="请输入群组名称" required />
        <van-field v-model="newGroup.description" label="群组描述" placeholder="请输入群组描述" type="textarea" rows="3" />
        <van-field label="群组类型">
          <template #input>
            <van-radio-group v-model="newGroup.type" direction="horizontal">
              <van-radio name="public">公开</van-radio>
              <van-radio name="private">私密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
    </van-dialog>

    <!-- 添加加入群组弹窗 -->
    <van-dialog v-model:show="showJoinDialog" title="加入群组" show-cancel-button @confirm="joinGroupByCode">
      <div class="p-4 space-y-4">
        <van-field v-model="joinGroupCode" label="群组邀请码" placeholder="请输入群组邀请码或ID" required />
        <div class="text-sm text-gray-500">
          <p>• 输入6位邀请码快速加入</p>
          <p>• 或输入完整的群组ID</p>
        </div>
      </div>
    </van-dialog>

    <!-- 群组操作弹出层 -->
    <van-action-sheet v-model:show="showActionSheet" :actions="actionSheetActions" cancel-text="取消"
      @select="onActionSelect" />


    <!-- 群组操作弹出层 -->
    <van-action-sheet v-model:show="showActionSheet" :actions="actionSheetActions" cancel-text="取消"
      @select="onActionSelect" />


  </div>
</template>

<script setup lang="ts">
import { createGroupApi, getGroupApi } from '@/api/group'
import Navbar from '@/components/Navbar/Navbar.vue'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { CreateGroupRequest, GroupList, IType } from '@/types/group'
import { INavbar } from '@/types/navbar'
import {
  closeToast,
  showConfirmDialog,
  showLoadingToast,
  showToast
} from 'vant'
import { computed, onMounted, ref } from 'vue'

// 类型定义
interface Group {
  id: string
  name: string
  description: string
  avatar: string
  memberCount: number
  isOwner: boolean
  isAdmin: boolean
  isMember: boolean
  type: 'public' | 'private'
  createdAt: string
  lastActivity: string
}

interface NewGroup {
  name: string
  description: string
  type: 'public' | 'private'
}
const navbar = ref<INavbar>({
  title: '群组',
  leftIcon: 'arrow-left',
  rightIcon: 'ellipsis',
  rightAction: () => showOptionsMenu.value = true
})
// 响应式数据
const searchValue = ref('')
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const showCreateDialog = ref(false)
const showActionSheet = ref(false)
const selectedGroup = ref<Group | null>(null)
const showOptionsMenu = ref(false)
const showJoinDialog = ref(false)
const joinGroupCode = ref('')

const userStore = useUserStore()
const user = computed(() => userStore.user)

// 群组数据
const groups = ref<GroupList>([])

// 新建群组表单
const newGroup = ref<CreateGroupRequest>({
  name: '',
  description: '',
  type: IType.PUBLIC
})

// 计算属性
const filteredGroups = computed(() => {
  if (!searchValue.value) return groups.value
  return groups.value.filter(group =>
    group.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
    group.description.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})

const actionSheetActions = computed(() => {
  if (!selectedGroup.value) return []

  const actions = []

  if (selectedGroup.value.isMember) {
    actions.push({ name: '查看群信息', value: 'info' })
    actions.push({ name: '群聊天记录', value: 'history' })

    if (selectedGroup.value.isOwner) {
      actions.push({ name: '群设置', value: 'settings' })
      actions.push({ name: '解散群组', value: 'dissolve', color: '#ee0a24' })
    } else {
      actions.push({ name: '退出群组', value: 'leave', color: '#ee0a24' })
    }
  } else {
    actions.push({ name: '申请加入', value: 'join' })
  }

  return actions
})

const optionsMenuActions = [
  { name: '创建群聊', value: 'create', icon: 'plus' },
  { name: '加入群聊', value: 'join', icon: 'friends-o' }
]

// 方法
const goBack = () => {
  // 返回上一页逻辑
  console.log('返回上一页')
}

const onSearch = (value: string) => {
  console.log('搜索:', value)
}

const onClear = () => {
  searchValue.value = ''
}

const onRefresh = async () => {
  // 模拟刷新数据
  await new Promise(resolve => setTimeout(resolve, 1000))
  refreshing.value = false
  showToast('刷新成功')
}

const onLoad = async () => {
  // 模拟加载更多数据
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  finished.value = true
}

const getGroupStatus = (group: Group) => {
  if (group.isOwner) return '群主'
  if (group.isAdmin) return '管理员'
  if (group.isMember) return '已加入'
  return '未加入'
}

const enterGroup = (id: Number) => {
  // selectedGroup.value = group
  // showActionSheet.value = true
  router.push({ name: 'GroupDetail', params: { id } })
}

const createGroup = async () => {
  if (!newGroup.value.name.trim()) {
    showToast('请输入群组名称')
    return
  }

  showLoadingToast({
    message: '创建中...',
    forbidClick: true,
  })

  try {
    // 模拟创建群组API调用
    const res = await createGroupApi(newGroup.value)

    groups.value.unshift(res)

    // 重置表单
    newGroup.value = {
      name: '',
      description: '',
      type: IType.PUBLIC
    }

    showCreateDialog.value = false
    showToast('群组创建成功')
  } catch (error) {
    showToast('创建失败，请重试')
  } finally {
    closeToast()
  }
}

const onActionSelect = async (action: any) => {
  if (!selectedGroup.value) return

  switch (action.value) {
    case 'info':
      showToast('查看群信息')
      break
    case 'history':
      showToast('查看聊天记录')
      break
    case 'settings':
      showToast('群设置')
      break
    case 'join':
      await joinGroup(selectedGroup.value)
      break
    case 'leave':
      await leaveGroup(selectedGroup.value)
      break
    case 'dissolve':
      await dissolveGroup(selectedGroup.value)
      break
  }

  showActionSheet.value = false
}

const joinGroup = async (group: Group) => {
  try {
    const confirmed = await showConfirmDialog({
      title: '加入群组',
      message: `确定要加入"${group.name}"吗？`,
    })

    if (confirmed) {
      const loadingToast = showLoadingToast({
        message: '加入中...',
        forbidClick: true,
      })

      await new Promise(resolve => setTimeout(resolve, 1500))

      // 更新群组状态
      const index = groups.value.findIndex(g => g.id === group.id)
      if (index !== -1) {
        groups.value[index].isMember = true
        groups.value[index].memberCount++
      }

      closeToast()
      showToast('加入成功')
    }
  } catch (error) {
    // 用户取消
  }
}

const leaveGroup = async (group: Group) => {
  try {
    const confirmed = await showConfirmDialog({
      title: '退出群组',
      message: `确定要退出"${group.name}"吗？`,
    })

    if (confirmed) {
      const loadingToast = showLoadingToast({
        message: '退出中...',
        forbidClick: true,
      })

      await new Promise(resolve => setTimeout(resolve, 1500))

      // 更新群组状态
      const index = groups.value.findIndex(g => g.id === group.id)
      if (index !== -1) {
        groups.value[index].isMember = false
        groups.value[index].isAdmin = false
        groups.value[index].memberCount--
      }

      closeToast()
      showToast('已退出群组')
    }
  } catch (error) {
    // 用户取消
  }
}

const dissolveGroup = async (group: Group) => {
  try {
    const confirmed = await showConfirmDialog({
      title: '解散群组',
      message: `确定要解散"${group.name}"吗？此操作不可恢复！`,
    })

    if (confirmed) {
      const loadingToast = showLoadingToast({
        message: '解散中...',
        forbidClick: true,
      })

      await new Promise(resolve => setTimeout(resolve, 2000))

      // 从列表中移除群组
      const index = groups.value.findIndex(g => g.id === group.id)
      if (index !== -1) {
        groups.value.splice(index, 1)
      }

      closeToast()
      showToast('群组已解散')
    }
  } catch (error) {
    // 用户取消
  }
}

const onOptionsSelect = (action: any) => {
  showOptionsMenu.value = false

  switch (action.value) {
    case 'create':
      showCreateDialog.value = true
      break
    case 'join':
      showJoinDialog.value = true
      break
  }
}

const joinGroupByCode = async () => {
  if (!joinGroupCode.value.trim()) {
    showToast('请输入群组邀请码')
    return
  }

  const loadingToast = showLoadingToast({
    message: '查找群组中...',
    forbidClick: true,
  })

  try {
    // 模拟通过邀请码查找群组API调用
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 模拟找到群组并加入
    // const foundGroup = groups.value.find(g => !g.isMember)
    if (foundGroup) {
      // foundGroup.isMember = true
      // foundGroup.memberCount++
      showToast('加入群组成功')
    } else {
      // 模拟创建一个新的群组（通过邀请码找到的）
      const newGroup: Group = {
        id: Date.now().toString(),
        name: '新加入的群组',
        description: '通过邀请码加入的群组',
        avatar: '/placeholder.svg?height=80&width=80',
        memberCount: 25,
        isOwner: false,
        isAdmin: false,
        isMember: true,
        type: 'public',
        createdAt: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toLocaleString()
      }
      groups.value.unshift(newGroup)
      showToast('加入群组成功')
    }

    // 重置表单
    joinGroupCode.value = ''
    showJoinDialog.value = false
  } catch (error) {
    showToast('邀请码无效或群组不存在')
  } finally {
    closeToast()
  }
}
const getGroupList = async () => {
  const res = await getGroupApi()
  groups.value = res

}
onMounted(() => {
  // 组件挂载时的初始化逻辑
  console.log('群组页面已加载')
  getGroupList()
})
</script>

<style scoped>
/* 自定义样式 */
.van-cell__title {
  font-weight: 500;
}

.van-cell__label {
  color: #969799;
  font-size: 12px;
  margin-top: 4px;
}

/* 搜索框样式优化 */
:deep(.van-search__content) {
  background-color: #f7f8fa;
  border-radius: 20px;
}

/* 浮动按钮阴影 */
.shadow-lg {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 群组卡片悬停效果 */
.van-cell-group {
  transition: transform 0.2s ease;
}

.van-cell-group:active {
  transform: scale(0.98);
}
</style>
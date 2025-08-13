<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 用户信息头部 -->
    <div class="bg-white px-4 py-6">
      <div class="flex items-center space-x-4">
        <van-image
          round
          width="60"
          height="60"
          :src="userInfo.avatar"
          fit="cover"
          class="border-2 border-gray-200"
        />
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-gray-900">{{ userInfo.nickname }}</h2>
          <p class="text-sm text-gray-500 mt-1">ID: {{ userInfo.userId }}</p>
          <div class="flex items-center space-x-4 mt-2">
            <span class="text-xs text-gray-600">关注 {{ userInfo.following }}</span>
            <span class="text-xs text-gray-600">粉丝 {{ userInfo.followers }}</span>
            <span class="text-xs text-gray-600">获赞 {{ userInfo.likes }}</span>
          </div>
        </div>
        <van-icon name="arrow" class="text-gray-400" />
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="mt-2 bg-white">
      <van-cell-group>
        <van-cell
          title="我的收藏"
          icon="star-o"
          is-link
          @click="handleMenuClick('favorites')"
        />
        <van-cell
          title="浏览历史"
          icon="clock-o"
          is-link
          @click="handleMenuClick('history')"
        />
        <van-cell
          title="我的评论"
          icon="chat-o"
          is-link
          @click="handleMenuClick('comments')"
        />
        <van-cell
          title="消息通知"
          icon="bell"
          is-link
          @click="handleMenuClick('notifications')"
        >
          <template #right-icon>
            <van-badge :content="notificationCount" max="99">
              <van-icon name="arrow" class="text-gray-400" />
            </van-badge>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 账户设置 -->
    <div class="mt-2 bg-white">
      <van-cell-group>
        <van-cell
          title="修改密码"
          icon="lock"
          is-link
          @click="showPasswordDialog = true"
        />
        <van-cell
          title="个人资料"
          icon="contact"
          is-link
          @click="handleMenuClick('profile')"
        />
        <van-cell
          title="隐私设置"
          icon="shield-o"
          is-link
          @click="handleMenuClick('privacy')"
        />
        <van-cell
          title="账号安全"
          icon="warning-o"
          is-link
          @click="handleMenuClick('security')"
        />
      </van-cell-group>
    </div>

    <!-- 其他设置 -->
    <div class="mt-2 bg-white">
      <van-cell-group>
        <van-cell
          title="夜间模式"
          icon="moon-o"
        >
          <template #right-icon>
            <van-switch v-model="darkMode" @change="handleDarkModeChange" />
          </template>
        </van-cell>
        <van-cell
          title="推送通知"
          icon="volume-o"
        >
          <template #right-icon>
            <van-switch v-model="pushNotification" @change="handlePushChange" />
          </template>
        </van-cell>
        <van-cell
          title="清除缓存"
          icon="delete-o"
          is-link
          @click="handleClearCache"
        />
        <van-cell
          title="关于我们"
          icon="info-o"
          is-link
          @click="handleMenuClick('about')"
        />
      </van-cell-group>
    </div>

    <!-- 退出登录 -->
    <div class="mt-6 px-4 pb-6">
      <van-button
        type="danger"
        block
        round
        @click="handleLogout"
        class="bg-red-500 border-red-500"
      >
        退出登录
      </van-button>
    </div>

    <!-- 修改密码弹窗 -->
    <van-dialog
      v-model:show="showPasswordDialog"
      title="修改密码"
      show-cancel-button
      @confirm="handlePasswordChange"
      @cancel="resetPasswordForm"
    >
      <div class="px-4 py-6">
        <van-field
          v-model="passwordForm.oldPassword"
          type="password"
          label="原密码"
          placeholder="请输入原密码"
          required
          class="mb-4"
        />
        <van-field
          v-model="passwordForm.newPassword"
          type="password"
          label="新密码"
          placeholder="请输入新密码"
          required
          class="mb-4"
        />
        <van-field
          v-model="passwordForm.confirmPassword"
          type="password"
          label="确认密码"
          placeholder="请再次输入新密码"
          required
        />
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {
    showConfirmDialog,
    showFailToast,
    showSuccessToast,
    showToast
} from 'vant'
import { reactive, ref } from 'vue'

// 用户信息类型定义
interface UserInfo {
  userId: string
  nickname: string
  avatar: string
  following: number
  followers: number
  likes: number
}

// 密码表单类型定义
interface PasswordForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

// 用户信息
const userInfo = reactive<UserInfo>({
  userId: '123456789',
  nickname: '今日头条用户',
  avatar: '/placeholder.svg?height=60&width=60',
  following: 128,
  followers: 1024,
  likes: 5678
})

// 设置状态
const darkMode = ref(false)
const pushNotification = ref(true)
const notificationCount = ref(5)

// 密码修改相关
const showPasswordDialog = ref(false)
const passwordForm = reactive<PasswordForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 处理菜单点击
const handleMenuClick = (type: string) => {
  showToast(`点击了${type}`)
}

// 处理夜间模式切换
const handleDarkModeChange = (value: boolean) => {
  showToast(value ? '已开启夜间模式' : '已关闭夜间模式')
}

// 处理推送通知切换
const handlePushChange = (value: boolean) => {
  showToast(value ? '已开启推送通知' : '已关闭推送通知')
}

// 清除缓存
const handleClearCache = async () => {
  try {
    await showConfirmDialog({
      title: '清除缓存',
      message: '确定要清除所有缓存数据吗？',
    })
    
    // 模拟清除缓存
    setTimeout(() => {
      showSuccessToast('缓存清除成功')
    }, 1000)
  } catch {
    // 用户取消
  }
}

// 修改密码
const handlePasswordChange = async () => {
  if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    showFailToast('请填写完整信息')
    return
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    showFailToast('两次输入的密码不一致')
    return
  }

  if (passwordForm.newPassword.length < 6) {
    showFailToast('新密码长度不能少于6位')
    return
  }

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showSuccessToast('密码修改成功')
    showPasswordDialog.value = false
    resetPasswordForm()
  } catch (error) {
    showFailToast('密码修改失败，请重试')
  }
}

// 重置密码表单
const resetPasswordForm = () => {
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

// 退出登录
const handleLogout = async () => {
  try {
    await showConfirmDialog({
      title: '退出登录',
      message: '确定要退出当前账号吗？',
    })
    
    // 模拟退出登录
    showSuccessToast('已退出登录')
    // 这里可以跳转到登录页面
  } catch {
    // 用户取消
  }
}
</script>
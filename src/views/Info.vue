<template>
    <div v-if="!userInfo" class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <!-- 未登录状态 -->
        <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div class="mb-8">
                <div
                    class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <h1 class="text-2xl font-bold text-gray-900 mb-2">欢迎使用</h1>
                <p class="text-gray-600">登录后查看个人中心</p>
            </div>

            <div class="space-y-4">
                <van-button type="danger" class="w-full" url="/auth">
                    登录
                </van-button>
            </div>
        </div>

        <!-- 登录弹窗 -->
        <div v-if="showLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-2xl p-6 w-full max-w-sm">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold">登录</h2>
                    <button @click="showLogin = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div>
                        <input v-model="loginForm.username" type="text" placeholder="用户名/邮箱"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required>
                    </div>
                    <div>
                        <input v-model="loginForm.password" type="password" placeholder="密码"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required>
                    </div>
                    <button type="submit"
                        class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        登录
                    </button>
                </form>
            </div>
        </div>

        <!-- 注册弹窗 -->
        <div v-if="showRegister" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-2xl p-6 w-full max-w-sm">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold">注册</h2>
                    <button @click="showRegister = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-4">
                    <div>
                        <input v-model="registerForm.username" type="text" placeholder="用户名"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required>
                    </div>
                    <div>
                        <input v-model="registerForm.email" type="email" placeholder="邮箱"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required>
                    </div>
                    <div>
                        <input v-model="registerForm.password" type="password" placeholder="密码"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required>
                    </div>
                    <button type="submit"
                        class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        注册
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div v-else class="min-h-screen bg-gray-50">
        <!-- 用户信息头部 -->
        <div class="bg-white px-4 py-6">
            <div class="flex items-center space-x-4">
                <van-image round width="60" height="60" :src="userInfo.avatar" fit="cover"
                    class="border-2 border-gray-200" />
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
                <van-cell title="我的收藏" icon="star-o" is-link @click="handleMenuClick('favorites')" />
                <van-cell title="浏览历史" icon="clock-o" is-link @click="handleMenuClick('history')" />
                <van-cell title="我的评论" icon="chat-o" is-link @click="handleMenuClick('comments')" />
                <van-cell title="消息通知" icon="bell" is-link @click="handleMenuClick('notifications')">
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
                <van-cell title="修改密码" icon="lock" is-link @click="showPasswordDialog = true" />
                <van-cell title="个人资料" icon="contact" is-link @click="handleMenuClick('profile')" />
                <van-cell title="隐私设置" icon="shield-o" is-link @click="handleMenuClick('privacy')" />
                <van-cell title="账号安全" icon="warning-o" is-link @click="handleMenuClick('security')" />
            </van-cell-group>
        </div>

        <!-- 其他设置 -->
        <div class="mt-2 bg-white">
            <van-cell-group>
                <van-cell title="夜间模式" icon="moon-o">
                    <template #right-icon>
                        <van-switch v-model="darkMode" @change="handleDarkModeChange" />
                    </template>
                </van-cell>
                <van-cell title="推送通知" icon="volume-o">
                    <template #right-icon>
                        <van-switch v-model="pushNotification" @change="handlePushChange" />
                    </template>
                </van-cell>
                <van-cell title="清除缓存" icon="delete-o" is-link @click="handleClearCache" />
                <van-cell title="关于我们" icon="info-o" is-link @click="handleMenuClick('about')" />
            </van-cell-group>
        </div>

        <!-- 退出登录 -->
        <div class="mt-6 px-4 pb-6">
            <van-button type="danger" block round @click="handleLogout" class="bg-red-500 border-red-500">
                退出登录
            </van-button>
        </div>

        <!-- 修改密码弹窗 -->
        <van-dialog v-model:show="showPasswordDialog" title="修改密码" show-cancel-button @confirm="handlePasswordChange"
            @cancel="resetPasswordForm">
            <div class="px-4 py-6">
                <van-field v-model="passwordForm.oldPassword" type="password" label="原密码" placeholder="请输入原密码" required
                    class="mb-4" />
                <van-field v-model="passwordForm.newPassword" type="password" label="新密码" placeholder="请输入新密码" required
                    class="mb-4" />
                <van-field v-model="passwordForm.confirmPassword" type="password" label="确认密码" placeholder="请再次输入新密码"
                    required />
            </div>
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { UserInfo } from '@/types/user'
import {
    showConfirmDialog,
    showFailToast,
    showSuccessToast,
    showToast
} from 'vant'
import { reactive, ref } from 'vue'



// 密码表单类型定义
interface PasswordForm {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}
const userStore = useUserStore();

// 用户信息
const userInfo = reactive<UserInfo>(userStore.user!)

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
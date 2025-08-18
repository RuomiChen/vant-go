<template>
    <NoAuth v-if="!userStore.user" />
    <div v-else class="min-h-screen bg-gray-50">
        <div class="flex flex-col gap-2">

        <!-- 用户信息头部 -->
        <router-link :to="{ name: 'Info'}" class="bg-white px-4 py-6" >
            <div class="flex items-center space-x-4">
                <van-image round width="60" height="60" :src="userStore.user.avatar" fit="cover"
                    class="border-2 border-gray-200" />
                <div class="flex-1">
                    <h2 class="text-lg font-semibold text-gray-900">{{ userStore.user.name }}</h2>
                    <p class="text-sm text-gray-500 mt-1">ID: {{ userStore.user.id }}</p>
                    <div class="flex items-center space-x-4 mt-2">
                        <span class="text-xs text-gray-600">关注 {{ userStore.user.following || 0 }}</span>
                        <span class="text-xs text-gray-600">粉丝 {{ userStore.user.followers || 0 }}</span>
                        <span class="text-xs text-gray-600">获赞 {{ userStore.user.likes || 0 }}</span>
                    </div>
                </div>
                <van-icon name="arrow" class="text-gray-400" />
            </div>
        </router-link>

        <!-- 功能菜单 -->
        <SettingList :data="settingsList"  />
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
import SettingList from '@/components/Settings/SettingList.vue'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { SettingsList } from '@/types/settings'
import { clearTemp } from '@/utils/function'
import {
    showConfirmDialog,
    showSuccessToast
} from 'vant'
import { reactive } from 'vue'
import NoAuth from './NoAuth.vue'


const settingsList = reactive<SettingsList>([
    {
        children: [
            {
                left: {
                    label: '我的收藏',
                    icon: 'star-o'
                }
            }, {
                left: {
                    label: '浏览历史',
                    icon: 'clock-o',
                },
                action:()=>router.push('/history')
            }, {
                left: {
                    label: '我的评论',
                    icon: 'chat-o'

                }
            }
        ]
    },
    {
        children: [
            {
                left: {
                    label: "修改密码",
                    icon: "lock"
                },
                action: () => router.push({name:'ChangePwd'})
            },
            {
                left: {
                    label: "隐私设置",
                    icon: "shield-o"
                },
                action: () => handleMenuClick("privacy")
            },
            {
                left: {
                    label: "账号安全",
                    icon: "warning-o"
                },
                action: () => handleMenuClick("security")
            }
        ]
    },
    {
        children: [
            {
                left: { label: "夜间模式", icon: "moon-o" },
                right: {
                    type: "switch",
                    model: "darkMode",
                    onChange: (val: boolean) => handleDarkModeChange(val)
                }
            },
            {
                left: { label: "清除缓存", icon: "delete-o" },
                action: () => clearTemp()
            },
            {
                left: { label: "关于我们", icon: "info-o" },
                action: () => handleMenuClick("about")
            }
        ]
    }
])



const userStore = useUserStore();




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
        userStore.logout()
    } catch {
        // 用户取消
    }
}
</script>
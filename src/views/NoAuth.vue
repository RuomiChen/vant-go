<template>
    <!-- 未登录状态 -->
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">

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
    </div>
</template>
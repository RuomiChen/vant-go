<template>
  <div class="h-full flex flex-col items-center pt-20">
    <!-- 标题 -->
    <h2 class="text-2xl">{{ isLogin ? '用户登录' : '用户注册' }}</h2>

    <!-- 表单 -->
    <van-form @submit="onSubmit" class="mt-10">
      <van-cell-group inset>
        <van-field v-model="form.username" name="username" label="用户名" placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="form.password" type="password" name="password" label="密码" placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <!-- 注册时多一个确认密码 -->
        <van-field v-if="!isLogin" v-model="form.confirmPassword" type="password" name="confirmPassword" label="确认密码"
          placeholder="请再次输入密码" :rules="[{ required: true, message: '请确认密码' }]" />
      </van-cell-group>

      <div style="margin: 16px;">
        <van-button round block type="danger" native-type="submit">
          {{ isLogin ? '登录' : '注册' }}
        </van-button>
      </div>
    </van-form>

    <!-- 切换 -->
    <div class="flex gap-2 items-center">
      <span>{{ isLogin ? '没有账号？' : '已有账号？' }}</span>
      <div @click="isLogin = !isLogin">
        {{ isLogin ? '注册' : '登录' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { registerApi } from '@/api/auth'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { showToast } from 'vant'
import { reactive, ref } from 'vue'

const userStore = useUserStore()


const isLogin = ref(true)
const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const onSubmit = async () => {
  try {
    if (!isLogin.value && form.password !== form.confirmPassword) {
      showToast('两次密码输入不一致')
      return
    }

    if (isLogin.value) {
      try {
        await userStore.login(form.username, form.password);
        // 登录成功后可路由跳转
      } catch (err) {
        console.error('登录失败', err);
        return
      }
      showToast('登录成功')
      router.push('/')
    } else {
      await registerApi({
        username: form.username,
        password: form.password
      })
      showToast('注册成功，请登录')
      isLogin.value = true
    }
  } catch {
    // 错误提示已在 axios 封装中处理
  }
}
</script>


<style scoped>
.auth-page {
  padding: 20px;
}

.auth-title {
  text-align: center;
  margin-bottom: 20px;
}


</style>

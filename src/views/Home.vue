<template>
  <van-button type="primary" @click="goLogin">去登录</van-button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goLogin = () => {
  router.push('/auth')
}
</script>

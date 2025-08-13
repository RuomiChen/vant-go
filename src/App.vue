<template>
  <RouterView />
  <van-tabbar v-model="active" active-color="#ee0a24">
    <van-tabbar-item icon="home-o"><RouterLink to="/"/>Home</van-tabbar-item>
    <van-tabbar-item icon="search">Tab</van-tabbar-item>
    <van-tabbar-item icon="friends-o">Tab</van-tabbar-item>
    <van-tabbar-item icon="setting-o"><RouterLink to="/settings"/>Settings</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
 const active = ref(0)
</script>
<style></style>
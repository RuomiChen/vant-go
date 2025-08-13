<template>
  <RouterView />
  <van-tabbar v-model="active" active-color="#ee0a24" route>
    <van-tabbar-item v-for="item in tabbar" :icon="item.icon" :to="item.link">{{ item.title }}</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue';
 const active = ref(0)
 const tabbar = ref([
  {
    title:'首页',
    icon:'home-o',
    link:'/'
  },{
    title:'计划',
    icon:'search'
  },{
    title:'群组',
    icon:'friends-o'
  },{
    title:'个人信息',
    icon:'setting-o',
    link:'/info'
  },
 ])
</script>
<style></style>
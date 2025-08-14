<template>

  <RouterView />

  <!-- 如果不是 auth 路由才显示 TabBar -->
  <van-tabbar v-if="!isAuthRoute" v-model="active" active-color="#ee0a24" route>
    <van-tabbar-item v-for="(item, index) in tabbar" :key="index" :icon="item.icon" :to="item.link">
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const active = ref(0);
const tabbar = ref([
  { title: '首页', icon: 'home-o', link: '/' },
  { title: '计划', icon: 'fire-o' },
  { title: '群组', icon: 'friends-o', link: '/group' },
  { title: '设置', icon: 'setting-o', link: '/settings' },
]);

// 判断当前路由是否为 auth 页面
const isAuthRoute = computed(() => route.path.startsWith('/auth') || !tabbar.value.map(item => item.link).includes(route.path));
</script>

<style></style>

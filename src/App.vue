<template>

  <RouterView />
  <van-back-top right="8vw" bottom="8vh" :offset="20" />
  <!-- 如果不是 auth 路由才显示 TabBar -->
  <van-tabbar v-if="!isAuthRoute" v-model="active" active-color="#ee0a24" route>
    <van-tabbar-item @click="handle(item?.class)" v-for="(item, index) in tabbar" :class="item.class" :key="index"
      :icon="item.icon" :to="item.link">
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from './router';

const route = useRoute();

const active = ref(0);
const tabbar = ref([
  { title: '首页', icon: 'home-o', link: '/' },
  { title: '计划', icon: 'fire-o' },
  { icon: 'plus', class: 'bg-red-600 !text-white !flex-none px-4 mx-4 my-1 rounded-md' },
  { title: '群组', icon: 'friends-o', link: '/group' },
  { title: '设置', icon: 'setting-o', link: '/settings' },
]);

const actions = [
  { name: '写文章', link: '/write' },
];


// 判断当前路由是否为 auth 页面
const isAuthRoute = computed(() => route.path.startsWith('/auth') || !tabbar.value.map(item => item.link).includes(route.path));
const show = ref(false);
const handle = (val?: string) => {
  if (!val) return
  show.value = true
}

const onSelect = (item: any, index: Number) => {
  show.value = false;
  router.push(item.link)
};

</script>

<style>
.van-back-top {
  --van-back-top-background: red;
}
</style>

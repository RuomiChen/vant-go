<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="item in data" :key="item.id">
      <div class="flex flex-col items-center w-full h-full py-8">
        <img :src="item.cover" class="object-contain w-full h-40" />
        <div class="text-black">{{ item.title }}</div>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>
<script setup lang="ts">
import type { NewsList } from '@/types/news';
import { defineProps, PropType } from 'vue';

const props = defineProps({
  data: {
    type: Array as PropType<NewsList>,
    default: () => []  // 注意这里必须用函数返回
  }
})
</script>
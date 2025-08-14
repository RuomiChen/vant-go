<template>
  <van-swipe indicator-color="#fff" :autoplay="3000" lazy-render>
    <van-swipe-item v-for="item in data" :key="item.id">
      <div class="relative flex flex-col items-center w-full h-50">
          <van-image :src="getServerUrl(item.cover)" class="object-cover w-full h-full" />
        <div class="absolute bottom-[2rem] left-[0.7rem]  text-white font-bold line-clamp-1">{{ item.title }}</div>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>
<script setup lang="ts">
import type { NewsList } from '@/types/news';
import { getServerUrl } from '@/utils/function';
import { defineProps, PropType } from 'vue';

const props = defineProps({
  data: {
    type: Array as PropType<NewsList>,
    default: () => []  // 注意这里必须用函数返回
  }
})
</script>
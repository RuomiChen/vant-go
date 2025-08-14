<template>
    <div class="flex items-center gap-2">
        <van-icon name="label" color="red" size="18"/>
        <div class="line-clamp-1">{{item.title}}</div>
    </div>
</template>

<script lang="ts" setup>
import type { News } from '@/types/news';
import { PropType } from 'vue';

defineProps({
  item: {
    type: Object as PropType<News>,
    default: () => ({})   // 返回一个空对象
  }
})
</script>
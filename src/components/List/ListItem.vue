<template>
    <div class="bg-white p-4 flex justify-between">
        <div class="flex flex-col justify-between">
            <div class=" font-semibold">{{ item.title }}</div>
            <div class="text-grey">423423</div>
        </div>
        <van-image width="8rem" height="6rem" fit="cover"
            :src="item.cover" />
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
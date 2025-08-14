<template>
    <router-link :to="{ name: 'NewsDetail', params: { id: item.id } }" class="bg-white p-4 flex justify-between">
        <div class="flex-1 flex flex-col justify-between">
            <div class=" font-semibold line-clamp-2">{{ item.title }}</div>
            <div class="text-grey">423423</div>
        </div>
        <van-image radius="10" width="8rem" height="6rem" fit="cover" :src="getServerUrl(item.cover)" />
    </router-link>
</template>
<script lang="ts" setup>
import type { News } from '@/types/news';
import { getServerUrl } from '@/utils/function';
import { PropType } from 'vue';

defineProps({
    item: {
        type: Object as PropType<News>,
        default: () => ({})   // 返回一个空对象
    }
})
</script>
<template>
    <van-swipe-cell>
        <router-link :to="`/news/${item.id}`" class="flex flex-col gap-2 p-4" >
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <van-image width="38" height="38" round :src="getServerUrl(user!.avatar)" />
                    <div>cfyyds</div>
                </div>
                <div class="tip-text">{{ formatUTCToHHMM(item.created_at) }} 浏览</div>
            </div>
            <div class="flex justify-between gap-8">
                <div class="flex-1 text-[15px] line-clamp-2 font-thin">{{ item.title }}</div>
                <van-image width="120" height="80" :src="getServerUrl(item.cover!)" />
            </div>
            <div class="flex items-center gap-2 tip-text" >
                <div>{{ item.views }} 浏览</div>
                <div>2 评论</div>
                <div>2 赞</div>
            </div>
        </router-link>
        <template #right>
            <van-button square type="warning" text="收藏" />
            <van-button square type="danger" text="删除" />
        </template>
    </van-swipe-cell>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { INews } from '@/types/news';
import { formatUTCToHHMM, getServerUrl } from '@/utils/function';
import { PropType } from 'vue';

defineProps({
    item: {
        type: Object as PropType<INews>,
        default: () => ({})   // 返回一个空对象
    }
})

const userStore = useUserStore()
const user = userStore.user
</script>
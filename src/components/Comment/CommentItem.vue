<template>
    <div class="flex gap-2">
       <van-image round width="40" height="40" :src="item.user.avatar" fit="cover"
                    class="border-2 border-gray-200" />
        <div class="flex flex-col flex-1">
            <div>123 6小时前 上海</div>
            <div>{{item.user.name}}</div>
            <div class="flex items-center justify-between">
                <div class=" bg-gray-100 p-1 text-[12px] rounded-md">1回复
                    <van-icon name="arrow" />
                </div>
                <div>aqwed</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { IComment } from '@/types/comment';
import { PropType } from 'vue';

defineProps({
    item: {
        type: Object as PropType<IComment>,
        default: () => ({})   // 返回一个空对象
    }
})
</script>
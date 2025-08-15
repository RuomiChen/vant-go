<template>
    <van-divider>
        分享至
    </van-divider>
    <div class="flex items-center justify-between">
        <template v-for="(item,index) in data" :key="item.name">
            <van-divider v-if="index!=0" vertical />
            <ShareItem :item="item"/>
        </template>
    </div>
    <van-divider />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { ShareList } from './ShareItem.vue';
import ShareItem from './ShareItem.vue';
const data = ref<ShareList>([
    {
        name:'微信',
        icon:'wechat',
    },
    {
        name:'朋友圈',
        icon:'wechat-moments',
    }
])
</script>
<template>
    <div class="p-4 flex items-center justify-between gap-4">
        <van-image height="30" :src="logo" />
        <van-search class="flex-1" v-model="keyword" shape="round" :placeholder="placeholder" />
    </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo.svg';
import { ref } from 'vue';

const placeholder = ref('输入搜索关键字')
const keyword = ref('')
</script>

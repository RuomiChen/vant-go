<template>
    <div class="search-page">
        <van-search v-model="keyword" clearable shape="round" background="red" show-action :placeholder="placeholder"
            @search="onSearch" @cancel="onCancel" />
    </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { showToast } from 'vant';
import { ref } from 'vue';

const placeholder = ref('请输入相关的文章或作者')
const keyword = ref('')

const onSearch = (val: string) => showToast(val);
const onCancel = () => router.back();

</script>

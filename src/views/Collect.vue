<template>
    <van-sticky>
        <Navbar :item="navbar" />
        <van-list v-model:loading="loading" :finished="finished" finished-text="Finished" @load="getRecordData">
            <CollectItem :item="item" v-for="item in list" :key="item.id" />
        </van-list>
    </van-sticky>
</template>
<script lang="ts" setup>
import { collectListApi } from '@/api/collect';
import CollectItem from '@/components/Collect/CollectItem.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import router from '@/router';
import { INavbar } from '@/types/navbar';
import { NewsList } from '@/types/news';
import { ref } from 'vue';

const list = ref<NewsList>([])
const loading = ref(false);
const finished = ref(false);
const navbar = ref<INavbar>({
    title: '我的收藏',
    leftIcon: 'arrow-left',
    rightIcon: 'search',
    rightAction: () => router.push('search')
})

const getRecordData = async () => {
    const res = await collectListApi()
    list.value = res
    finished.value = true;
    loading.value = false;
}
</script>
<style>
.van-swipe-cell__right .van-button {
    height: 100% !important;
}
</style>
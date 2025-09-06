<template>
    <van-sticky>
        <Navbar :item="navbar" />
        <van-list v-model:loading="loading" :finished="finished" finished-text="Finished" @load="getRecordData">
            <HistoryItem :item="item" v-for="item in list" :key="item.to" />
        </van-list>
    </van-sticky>
</template>
<script lang="ts" setup>
import { getRecordListApi } from '@/api/tracking';
import HistoryItem from '@/components/History/HistoryItem.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import router from '@/router';
import { INavbar } from '@/types/navbar';
import { TrackingList } from '@/types/tracking';
import { ref } from 'vue';

const list = ref<TrackingList>([])
const loading = ref(false);
const finished = ref(false);
const navbar = ref<INavbar>({
    title: '浏览历史',
    leftIcon: 'arrow-left',
    rightIcon: 'search',
    rightAction: () => router.push('search')
})

const getRecordData = async () => {
    const res = await getRecordListApi({
        action: 'news view'
    })
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
<template>
    <div>
        <van-sticky>
            <Navbar :item="navbar" />
            <div class="flex flex-col gap-2">
                <HistoryItem :item="item" v-for="item in list" :key="item.to" />
            </div>
        </van-sticky>
    </div>
</template>
<script lang="ts" setup>
import { getRecordListApi } from '@/api/tracking';
import HistoryItem from '@/components/History/HistoryItem.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import router from '@/router';
import { INavbar } from '@/types/navbar';
import { TrackingList } from '@/types/tracking';
import { showLoading } from '@/utils/useLoading';
import { onMounted, ref } from 'vue';

const list = ref<TrackingList>([])

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
}
onMounted(() => {
    const loading = showLoading('数据加载中...');
    getRecordData()
    loading.close();
})
</script>
<style >
.van-swipe-cell__right .van-button {
    height: 100% !important;
}
</style>
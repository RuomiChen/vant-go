<script setup lang="ts">
import { getNewsById } from '@/api/news';
import Navbar from '@/components/Navbar/Navbar.vue';
import ShareSection from '@/components/ShareSection/ShareSection.vue';
import { INavbar } from '@/types/navbar';
import { News } from '@/types/news';
import DOMPurify from 'dompurify';
import { showToast } from 'vant';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{ id: string }>() // 通过 props 接收路由参数

const showShare = ref(false);


const navbar = ref<INavbar>({
    title: '详情',
    leftIcon: 'arrow-left',
    rightIcon: 'share',
    rightAction: () => showShare.value = true
})

const data = ref<News | null>(null)

const getData = async () => {
    data.value = await getNewsById(Number(props.id))
}

const options = [
    { name: 'WeChat', icon: 'wechat' },
    { name: 'Weibo', icon: 'weibo' },
    { name: 'Link', icon: 'link' },
    { name: 'Poster', icon: 'poster' },
    { name: 'Qrcode', icon: 'qrcode' },
];

const onSelect = (option:any) => {
    showToast(option.name);
    showShare.value = false;
};

const safeContent = computed(() => DOMPurify.sanitize(data.value?.content!))

onMounted(() => {
    getData()
})

</script>

<template>
    <van-sticky>
        <Navbar :item="navbar" />
    </van-sticky>
    <div class="flex flex-col gap-4 p-4">
        <div class="text-2xl font-bold"> {{ data?.title }}</div>
        <div class="flex items-center gap-2 text-[13px] text-gray-400">
            <div class="flex items-center">
                <span>来源：</span>
                <span>RuomiChen</span>
            </div>
            <div class="flex items-center">
                <span>2022-00-12 12:23</span>
            </div>
        </div>
        <div class="flex flex-col gap-5 indent-4" v-html="safeContent"></div>
        <div class=" text-[13px] text-gray-400 self-end">阅读量：{{ data?.views }}</div>
        <ShareSection />
    </div>
    <van-share-sheet v-model:show="showShare" title="Share" :options="options" @select="onSelect" />

</template>

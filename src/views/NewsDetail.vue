<script setup lang="ts">
import { getNewsById } from '@/api/news';
import Navbar from '@/components/Navbar/Navbar.vue';
import ShareSection from '@/components/ShareSection/ShareSection.vue';
import { INavbar } from '@/types/navbar';
import { News } from '@/types/news';
import DOMPurify from 'dompurify';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{ id: string }>() // 通过 props 接收路由参数

const navbar = ref<INavbar>({
    title: '详情',
    rightIcon: 'share'
})

const data = ref<News | null>(null)

const getData = async () => {
    data.value = await getNewsById(Number(props.id))
}

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
</template>

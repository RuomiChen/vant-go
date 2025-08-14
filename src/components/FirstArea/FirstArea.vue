<script setup lang="ts">
import { topNewsListApi } from '@/api/news';
import { NewsList } from '@/types/news';
import { onMounted, ref } from 'vue';
import Swiper from '../Swiper.vue';
import ToTop from '../ToTop/ToTop.vue';

const swiperData = ref<NewsList>([])

const getSwiper = async () =>{
    swiperData.value = await topNewsListApi()
}

onMounted(()=>{
    getSwiper()
})

</script>

<template>
    <div class="pt-3 px-2 pb-1 bg-white flex flex-col gap-2">
        <ToTop />
        <Swiper :data="swiperData" />
    </div>
</template>
<script setup lang="ts">
import { topNewsListApi } from '@/api/news';
import { NewsList } from '@/types/news';
import { onMounted, ref } from 'vue';
import TopPosItem from './TopPosItem.vue';

const topSticky = ref<NewsList>([])
const getTopNews = async () =>{
  topSticky.value = await topNewsListApi()
}

onMounted(()=>{
    getTopNews()
    
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="text-red-600 font-thin text-[17px]">置顶</div>
        <TopPosItem v-for="item in topSticky" :item="item" :key="item.id"/>
    </div>
</template>

<script setup lang="ts">
import { getNewsById } from '@/api/news';
import Navbar from '@/components/Navbar/Navbar.vue';
import { INavbar } from '@/types/navbar';
import { News } from '@/types/news';
import { onMounted, ref } from 'vue';

const props = defineProps<{ id: string }>() // 通过 props 接收路由参数

const navbar = ref<INavbar>({
    title:'详情',
    rightIcon:'share'
})

const data = ref<News | null>(null)

const getData = async () =>{
    data.value = await getNewsById(Number(props.id))
}

onMounted(()=>{
    getData()
})

</script>

<template>
    <Navbar :item="navbar"/>
    <div class="flex flex-col gap-4 p-4">
        <div class="text-2xl font-bold"> {{ data?.title }}</div>
    </div>
</template>
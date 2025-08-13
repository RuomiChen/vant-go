<template>
    <van-tabs class="px-8" v-model:active="active" swipeable color="red">
        <van-tab v-for="item in data" :title="item.name">
            <List :data="data" />
        </van-tab>
    </van-tabs>
</template>
<script setup lang="ts">
import { TagList } from '@/types/tag';
import { defineProps, PropType, ref } from 'vue';

const active = ref(0)

const props = defineProps({
  data: {
    type: Array as PropType<TagList>,
    default: () => []  // 注意这里必须用函数返回
  }
})
</script>
<template>
      <van-list v-model:loading="loading" :finished="finished" finished-text="Finished" @load="onLoad">
      <template v-for="item in data" :key="item.id">
        <van-cell :title="item.title" />
        <van-image width="100%" height="100" :src="item.cover" />
      </template>
    </van-list>
</template>
<script setup lang="ts">
import { NewsList } from '@/types/news';
import { PropType, ref } from 'vue';

defineProps({
  data: {
    type: Array as PropType<NewsList>,
    default: () => []  // 注意这里必须用函数返回
  }
})

const list = ref<NewsList>([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      // list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};
</script>
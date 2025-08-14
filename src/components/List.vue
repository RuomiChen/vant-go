<template>
  <van-list class=" bg-gray-100 flex flex-col gap-2 pt-2" v-model:loading="loading" :finished="finished"
    finished-text="Finished" @load="onLoad">
    <template v-if="!index">
      <FirstArea />
    </template>
    <ListItem :item="item" v-for="item in data" :key="item.id" />
  </van-list>
</template>
<script setup lang="ts">
import { NewsList } from '@/types/news';
import { PropType, ref } from 'vue';
import FirstArea from './FirstArea/FirstArea.vue';
import ListItem from './List/ListItem.vue';

defineProps({
  index: {
    type: Number,
    default: () => 0  // 注意这里必须用函数返回
  },
  data: {
    type: Array as PropType<NewsList>,
    default: () => []  // 注意这里必须用函数返回
  }
})

const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  //   setTimeout(() => {
  //     for (let i = 0; i < 10; i++) {
  //       // list.value.push(list.value.length + 1);
  //     }
  //     loading.value = false;

  //     if (list.value.length >= 40) {
  //       finished.value = true;
  //     }
  //   }, 1000);
};
</script>
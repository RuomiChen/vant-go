<template>
  <van-tabs sticky v-model:active="active" swipeable color="red">
    <van-tab v-for="(item, index) in data" :title="item.name" :key="item.id">
      <List :data="newsMap[item.id] || []" :index="index" />
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { getNewsByTag } from '@/api/news';
import { NewsList } from '@/types/news';
import { TagList } from '@/types/tag';
import { defineProps, PropType, ref, watch } from 'vue';
import List from './List/List.vue';

const active = ref(0);

const props = defineProps({
  data: {
    type: Array as PropType<TagList>,
    default: () => []
  }
});

// 缓存每个标签的新闻
const newsMap = ref<Record<number, NewsList>>({});

// 监听 active 和 props.data，一起变化时触发
watch(
  [() => active.value, () => props.data],
  async ([val, data]) => {
    const tag = data[val];
    if (tag && !newsMap.value[tag.id]) {
      newsMap.value[tag.id] = await getNewsByTag(tag.id);
    }
  },
  { immediate: true }
);
</script>

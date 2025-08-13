<template>
  <van-tabs class="px-8" v-model:active="active" swipeable color="red">
    <van-tab v-for="(item, index) in data" :title="item.name" :key="item.id">
      <List :data="newsMap[item.id] || []" />
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { getNewsByTag } from '@/api/news';
import { NewsList } from '@/types/news';
import { TagList } from '@/types/tag';
import { defineProps, PropType, ref, watch } from 'vue';
import List from './List.vue';

const active = ref(0);

const props = defineProps({
  data: {
    type: Array as PropType<TagList>,
    default: () => []
  }
});

// 缓存每个标签的新闻
const newsMap = ref<Record<number, NewsList>>({});

// 监听 active 改变，懒加载新闻
watch(active, async (val) => {
  const tag = props.data[val];
  if (tag && !newsMap.value[tag.id]) {
    newsMap.value[tag.id] = await getNewsByTag(tag.id);
  }
}, { immediate: true }); // 初始也加载第一个 Tab
</script>

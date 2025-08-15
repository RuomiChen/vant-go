<template>
  <div class="flex-1 flex items-center justify-center gap-2">
    <van-icon size="36" :name="item.icon" />
    <div>{{ item.name }}</div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

export type ShareList = IShareItem[]

interface IShareItem {
  name: string,
  icon: string
}

defineProps({
  item: {
    type: Object as PropType<IShareItem>,
    default: () => { }
  }
});
</script>

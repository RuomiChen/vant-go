<template>
    <div class="flex-1 flex items-center justify-center gap-6">
        <van-image :src="item.image" />
        <div>{{item.name}}</div>
    </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

export type ShareList = IShareItem []

interface IShareItem{
    name: string,
    image:any
}

const props = defineProps({
  item: {
    type: Object as PropType<IShareItem>,
    default: () => {}
  }
});
</script>

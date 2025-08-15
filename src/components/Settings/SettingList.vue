<template>
  <van-cell-group v-for="item in data">
    <van-cell v-for="child in item.children" :title="child.left.label" :icon="child.left.icon" is-link
      @click="child.action">
      <template #right-icon v-if="child.right">
        <van-switch v-if="child.right.type=='switch'"  v-model="state[child.right.model]" @change="child.action" />
      </template>
    </van-cell>
  </van-cell-group>

</template>
<script lang="ts" setup>
import { SettingsList } from '@/types/settings';
import { PropType, reactive } from 'vue';

const props = defineProps({
  data: {
    type: Array as PropType<SettingsList>,
    default: () => []
  }
});


const state = reactive<Record<string, any>>({
  darkMode: false, // 配置里用到的 key 在这里初始化
})
</script>
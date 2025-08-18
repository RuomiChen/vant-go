<template>
  <van-dialog
    v-model:show="model"
    :title="title"
    show-cancel-button
    :show-confirm-button="false"
    teleport="body"
  >
    <slot />
  </van-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ default: false }) // 直接声明 v-model
const props = defineProps<{ title?: string }>()
</script>

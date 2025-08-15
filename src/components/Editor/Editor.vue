<template>
  <div>
    <QuillEditor
      v-model:content="content"
      content-type="html"
      theme="snow"
    />
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";

// 使用 defineModel 替代 props + emits
const content = defineModel<string>("content", { default: "" })

</script>

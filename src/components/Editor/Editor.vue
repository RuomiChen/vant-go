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
import { ref } from "vue";

// 富文本内容
const content = ref<string>("");


</script>

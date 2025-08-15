<script setup lang="ts">
import Editor from '@/components/Editor/Editor.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import { INavbar } from '@/types/navbar';
import { reactive, ref } from 'vue';

const formRef = ref<{ validate: () => Promise<void> } | null>(null)

const navbar = ref<INavbar>({
  leftIcon: "cross",
  rightText: "发布",
  rightAction: async () => {
    await formRef.value?.validate() 
    console.log(writeForm)
  },
})

const writeForm = reactive({
    title: '',
    content: ''
});
</script>

<template>
    <div>
        <Navbar :item="navbar" />
        <van-form ref="formRef" >
            <van-field v-model="writeForm.title" name="title" label="标题" placeholder="请填写标题"
                :rules="[{ required: true, message: 'Title is required' }]" />
            <Editor v-model:content="writeForm.content" />
        </van-form>
    </div>
</template>
<style>
.van-nav-bar__right {}

.van-nav-bar__text {
    padding: 0.3rem 01rem;
    background-color: red;
    font-size: 12px;
    font-weight: bold;
    border-radius: 1rem;
    --van-nav-bar-text-color: #fff;
}
</style>
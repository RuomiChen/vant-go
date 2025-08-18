<script setup lang="ts">
import { CommentList } from '@/types/comment';
import { ref } from 'vue';
import CommentItem from './CommentItem.vue';


const commentData = ref<CommentList>([
    {
        user:{
            avatar:'https://avatars.githubusercontent.com/u/222743971?v=4&size=64',
            name:'cf'
        },
        id:1,
        created_at:'1',
        updated_at:'1',
        deleted_at:'1',
        content:'123'

    }
])
</script>

<template>
    <div id="comment-area" class="flex flex-col gap-4">

        <div class="flex items-center justify-between">
            <div class="font-bold">评论 118</div>
            <div class="text-[13px] text-gray-400 flex items-center gap-2">
                <div>148 赞</div>
                <van-divider vertical :style="{ borderColor: '#001' }" />
                <div>4 转发</div>
            </div>
        </div>
        <div class="flex flex-col gap-2 ">
           <CommentItem v-for="item in commentData" :item="item" :key="item.id"/>
        </div>
    </div>
</template>
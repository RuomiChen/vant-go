<template>
    <van-nav-bar class="py-2" @click-left="onClickLeft" @click-right="item.rightAction" :title="item.title"
        :left-text="item.leftText" :right-text="item.rightText">
        <template #left v-if="item.leftIcon">
            <van-icon :name="item.leftIcon" />
        </template>
        <template #right v-if="item.rightIcon">
            <van-icon :name="item.rightIcon" />
        </template>
    </van-nav-bar>
</template>
<script lang="ts" setup>
import { INavbar } from '@/types/navbar';
import { PropType } from 'vue';

defineProps({
    item: {
        type: Object as PropType<INavbar>,
        default: () => ({})   // 返回一个空对象
    }
})
const onClickLeft = () => history.back();



</script>

<style>
.van-nav-bar__left {
    font-size: 22px;
}

.van-nav-bar__right {
    font-size: 22px;
}
</style>
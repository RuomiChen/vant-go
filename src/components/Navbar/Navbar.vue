<template>
    <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight" :title="item.title" left-arrow>
        <template #right>
            <van-icon :name="item.rightIcon" />
        </template>
    </van-nav-bar>
    <van-share-sheet v-model:show="showShare" title="Share" :options="options" @select="onSelect" />
</template>
<script lang="ts" setup>
import { INavbar } from '@/types/navbar';
import { showToast } from 'vant';
import { PropType, ref } from 'vue';

defineProps({
    item: {
        type: Object as PropType<INavbar>,
        default: () => ({})   // 返回一个空对象
    }
})
const showShare = ref(false);
const onClickLeft = () => history.back();
const onClickRight = () => showShare.value = true;

const options = [
    { name: 'WeChat', icon: 'wechat' },
    { name: 'Weibo', icon: 'weibo' },
    { name: 'Link', icon: 'link' },
    { name: 'Poster', icon: 'poster' },
    { name: 'Qrcode', icon: 'qrcode' },
];

const onSelect = (option:any) => {
    showToast(option.name);
    showShare.value = false;
};

</script>

<style>
.van-nav-bar__right {
    font-size: 22px;
}
</style>
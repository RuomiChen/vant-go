<script setup lang="ts">
import { collectNewsApi, getNewsById, likeNewsApi } from '@/api/news';
import CommentArea from '@/components/Comment/CommentArea.vue';
import AuthDialog from '@/components/Dialog/AuthDialog.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import ShareSection from '@/components/ShareSection/ShareSection.vue';
import { useUserStore } from '@/stores/user';
import { INavbar } from '@/types/navbar';
import { News } from '@/types/news';
import { copyPath } from '@/utils/function';
import DOMPurify from 'dompurify';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{ id: string }>() // 通过 props 接收路由参数

const userStore = useUserStore()

const showShare = ref(false);


const navbar = ref<INavbar>({
  title: '详情',
  leftIcon: 'arrow-left',
})

const data = ref<News | null>(null)

const getData = async () => {
  data.value = await getNewsById(Number(props.id))
}

const options = [
  { name: '链接', key: 'link', icon: 'link' },
];

const onSelect = (option: any) => {
  switch (option.key) {
    case 'link': {
      copyPath(location.href)
    }
  }
  showShare.value = false;
};


const showLogin = ref(false)
const bottomBar = computed(() => [
  {
    name: '分享',
    icon: 'share-o',
    action: () => showShare.value = true
  },
  {
    count: 2,
    icon: 'chat-o',
    action: () => {
      const el = document.getElementById('comment-area')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
  {
    count: data.value?.like_count,
    icon: userStore.user && data.value?.is_like ? 'like' : 'like-o',
    action: async () => {
      if (!userStore.user) {
        showLogin.value = true
        return
      }
      // 收藏
      const res = await likeNewsApi(props.id)
      if (data.value) {
        if (data.value.is_like) {
          data.value.like_count = (data.value.like_count || 0) - 1
        } else {
          data.value.like_count = (data.value.like_count || 0) + 1
        }
        data.value.is_like = !data.value.is_like
      }
    }
  },
  {
    count: data.value?.collect_count,
    icon: userStore.user && data.value?.is_collect ? 'star' : 'star-o',
    action: async () => {
      if (!userStore.user) {
        showLogin.value = true
        return
      }
      // 喜欢
      const res = await collectNewsApi(props.id)
      if (data.value) {
        if (data.value.is_collect) {
          data.value.collect_count = (data.value.collect_count || 0) - 1
        } else {
          data.value.collect_count = (data.value.collect_count || 0) + 1
        }
        data.value.is_collect = !data.value.is_collect
      }
    }
  }
])
const safeContent = computed(() => DOMPurify.sanitize(data.value?.content!))

onMounted(() => {
  getData()
})

</script>

<template>
  <van-sticky>
    <Navbar :item="navbar" />
  </van-sticky>
  <div class="flex flex-col gap-4 p-4">
    <div class="text-2xl font-bold"> {{ data?.title }}</div>
    <div class="flex items-center gap-2 text-[13px] text-gray-400">
      <div class="flex items-center">
        <span>来源：</span>
        <span>RuomiChen</span>
      </div>
      <div class="flex items-center">
        <span>2022-00-12 12:23</span>
      </div>
    </div>
    <div class="flex flex-col gap-5 indent-4" v-html="safeContent"></div>
    <div class=" text-[13px] text-gray-400 self-end">阅读量：{{ data?.views }}</div>
    <ShareSection />
    <CommentArea />
  </div>
  <van-sticky :offset-bottom="0" position="bottom">
    <div class="px-6  py-3 box-border shadow-xl bg-white flex items-center w-full justify-between">
      <div v-for="item in bottomBar" @click="item?.action"
        class="cursor-pointer flex gap-2 items-center justify-center">
        <van-icon size="20" :name="item.icon" />
        <div class="">{{ item.count ?? item.name }}</div>
      </div>
    </div>
  </van-sticky>
  <van-share-sheet title="分享" v-model:show="showShare" :options="options" @select="onSelect" />
  <AuthDialog v-model="showLogin" @success="()=>getData()" />
</template>

<template>
  <div class="flex flex-col gap-8">
    <Swiper  :data="data" />
    <van-tabs class="px-8" v-model:active="active" swipeable color="red">
      <van-tab v-for="item in tabs" :title="item.title">
        <List :data="data" />
      </van-tab>
    </van-tabs>

  </div>
</template>

<script lang="ts" setup>
import { topNewsListApi } from '@/api/news'
import Swiper from '@/components/Swiper.vue'
import { NewsList } from '@/types/news'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goLogin = () => {
  router.push('/auth')
}
const active = ref(0)

const data = ref<NewsList>([])
const tabs = ref([
  {
    title: '今日谈'
  },
  {
    title: '申论素材'
  },
  {
    title: '基层治理'
  }, {
    title: '谈语文'
  }, {
    title: '谈语文'
  }, {
    title: '谈语文'
  }
])
const init = async () => {
  data.value = await topNewsListApi()
}
onMounted(() => {
  init()
})
</script>
<style>
.home {
  padding: 20px;
}
</style>

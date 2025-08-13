<template>
  <div class="flex flex-col gap-8">
    <Swiper :data="topNewsData" />
    <Tabs :data="tabsData" />
    <!-- <van-tabs class="px-8" v-model:active="active" swipeable color="red">
      <van-tab v-for="item in tabs" :title="item.title">
        <List :data="data" />
      </van-tab>
    </van-tabs> -->

  </div>
</template>

<script lang="ts" setup>
import { topNewsListApi } from '@/api/news'
import { tagListApi } from '@/api/tag'
import Tabs from '@/components/Tabs.vue'
import { NewsList } from '@/types/news'
import { TagList } from '@/types/tag'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const tabsData = ref<TagList>([])

const router = useRouter()
const goLogin = () => {
  router.push('/auth')
}
const active = ref(0)

const topNewsData = ref<NewsList>([])

const getTabsData = async () => {
  const { list } = await tagListApi()
  tabsData.value = list
}

const init = async () => {
  getTabsData()
}
const getTopNews = async () =>{
  topNewsData.value = await topNewsListApi()

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

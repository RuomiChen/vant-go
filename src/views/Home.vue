<template>
    <Header />
  <Tabs :data="tabsData" />
</template>

<script lang="ts" setup>
import { topNewsListApi } from '@/api/news'
import { tagListApi } from '@/api/tag'
import Header from '@/components/Header/Header.vue'
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
  console.log('tavs', tabsData.value);

}

const init = async () => {
  getTabsData()
}
const getTopNews = async () => {
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

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <van-nav-bar
      title="关于我们"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="!bg-white shadow-sm"
    />

    <!-- 主要内容 -->
    <div class="pb-20">
      <!-- 公司简介 -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 m-4 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-bold mb-4">我们的使命</h2>
        <p class="text-blue-100 leading-relaxed">
          致力于通过创新技术为用户提供卓越的数字化体验，让科技更好地服务于生活。
        </p>
      </div>

      <!-- 公司信息卡片 -->
      <div class="mx-4 mb-6">
        <van-card
          title="公司概况"
          class="!bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <template #footer>
            <div class="space-y-3 p-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">成立时间</span>
                <span class="font-semibold">2020年</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">团队规模</span>
                <span class="font-semibold">50+ 人</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">服务客户</span>
                <span class="font-semibold">1000+ 家</span>
              </div>
            </div>
          </template>
        </van-card>
      </div>

      <!-- 核心价值 -->
      <div class="mx-4 mb-6">
        <h3 class="text-lg font-bold mb-4 px-2">核心价值</h3>
        <van-grid :column-num="2" :gutter="12">
          <van-grid-item
            v-for="value in coreValues"
            :key="value.title"
            class="!bg-white rounded-xl shadow-sm"
          >
            <div class="p-4 text-center">
              <div class="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                   :class="value.bgColor">
                <van-icon :name="value.icon" :color="value.iconColor" size="24" />
              </div>
              <h4 class="font-semibold mb-2">{{ value.title }}</h4>
              <p class="text-sm text-gray-600 leading-relaxed">{{ value.desc }}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 团队介绍 -->
      <div class="mx-4 mb-6">
        <h3 class="text-lg font-bold mb-4 px-2">核心团队</h3>
        <van-swipe :autoplay="3000" indicator-color="#3b82f6" class="rounded-xl overflow-hidden shadow-sm">
          <van-swipe-item v-for="member in teamMembers" :key="member.name">
            <div class="bg-white p-6 text-center">
              <van-image
                :src="member.avatar"
                width="80"
                height="80"
                round
                class="mx-auto mb-4"
              />
              <h4 class="font-bold text-lg mb-1">{{ member.name }}</h4>
              <p class="text-blue-600 mb-3">{{ member.position }}</p>
              <p class="text-sm text-gray-600 leading-relaxed">{{ member.intro }}</p>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 发展历程 -->
      <div class="mx-4 mb-6">
        <h3 class="text-lg font-bold mb-4 px-2">发展历程</h3>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <van-steps direction="vertical" :active="milestones.length - 1">
            <van-step v-for="milestone in milestones" :key="milestone.year">
              <div class="pb-4">
                <div class="flex items-center mb-2">
                  <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-semibold mr-3">
                    {{ milestone.year }}
                  </span>
                  <h4 class="font-semibold">{{ milestone.title }}</h4>
                </div>
                <p class="text-sm text-gray-600 ml-16">{{ milestone.desc }}</p>
              </div>
            </van-step>
          </van-steps>
        </div>
      </div>

      <!-- 联系信息 -->
      <div class="mx-4 mb-6">
        <h3 class="text-lg font-bold mb-4 px-2">联系我们</h3>
        <van-cell-group inset class="rounded-xl shadow-sm">
          <van-cell
            v-for="contact in contactInfo"
            :key="contact.label"
            :title="contact.label"
            :value="contact.value"
            :icon="contact.icon"
            is-link
            @click="handleContact(contact)"
            class="!py-4"
          />
        </van-cell-group>
      </div>
    </div>

    <!-- 底部固定按钮 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
      <div class="flex space-x-3">
        <van-button
          type="primary"
          size="large"
          class="flex-1 !bg-gradient-to-r !from-blue-500 !to-purple-600 !border-none"
          @click="showContact = true"
        >
          联系我们
        </van-button>
        <van-button
          size="large"
          class="flex-1 !border-blue-500 !text-blue-500"
          @click="handleShare"
        >
          分享
        </van-button>
      </div>
    </div>

    <!-- 联系弹窗 -->
    <van-popup v-model:show="showContact" position="bottom" class="rounded-t-2xl">
      <div class="p-6">
        <h3 class="text-lg font-bold mb-4 text-center">选择联系方式</h3>
        <div class="space-y-3">
          <van-button
            v-for="contact in contactInfo"
            :key="contact.label"
            block
            size="large"
            class="!justify-start !text-left"
            @click="handleContact(contact)"
          >
            <van-icon :name="contact.icon" class="mr-3" />
            {{ contact.label }}: {{ contact.value }}
          </van-button>
        </div>
        <van-button
          block
          size="large"
          class="mt-4 !text-gray-500"
          @click="showContact = false"
        >
          取消
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const showContact = ref(false)

// 核心价值数据
const coreValues = [
  {
    title: '创新驱动',
    desc: '持续技术创新，引领行业发展',
    icon: 'fire',
    bgColor: 'bg-red-100',
    iconColor: '#ef4444'
  },
  {
    title: '用户至上',
    desc: '以用户需求为中心，提供优质服务',
    icon: 'friends',
    bgColor: 'bg-blue-100',
    iconColor: '#3b82f6'
  },
  {
    title: '品质保证',
    desc: '严格质量控制，确保产品卓越',
    icon: 'medal',
    bgColor: 'bg-yellow-100',
    iconColor: '#f59e0b'
  },
  {
    title: '团队协作',
    desc: '高效团队合作，共创美好未来',
    icon: 'cluster',
    bgColor: 'bg-green-100',
    iconColor: '#10b981'
  }
]

// 团队成员数据
const teamMembers = [
  {
    name: '张三',
    position: '创始人 & CEO',
    avatar: '/placeholder.svg?height=80&width=80',
    intro: '10年互联网行业经验，致力于用技术改变世界'
  },
  {
    name: '李四',
    position: '技术总监',
    avatar: '/placeholder.svg?height=80&width=80',
    intro: '资深全栈工程师，专注于前沿技术研发'
  },
  {
    name: '王五',
    position: '产品总监',
    avatar: '/placeholder.svg?height=80&width=80',
    intro: '用户体验专家，擅长产品策略与设计'
  }
]

// 发展历程数据
const milestones = [
  {
    year: '2020',
    title: '公司成立',
    desc: '在深圳成立，开始创业征程'
  },
  {
    year: '2021',
    title: '产品上线',
    desc: '首款产品正式发布，获得用户好评'
  },
  {
    year: '2022',
    title: '快速发展',
    desc: '用户突破10万，团队扩展至30人'
  },
  {
    year: '2023',
    title: '融资成功',
    desc: '完成A轮融资，加速业务拓展'
  },
  {
    year: '2024',
    title: '行业领先',
    desc: '成为行业标杆，服务客户超1000家'
  }
]

// 联系信息数据
const contactInfo = [
  {
    label: '客服电话',
    value: '400-123-4567',
    icon: 'phone',
    type: 'phone'
  },
  {
    label: '邮箱地址',
    value: 'contact@company.com',
    icon: 'envelop',
    type: 'email'
  },
  {
    label: '公司地址',
    value: '深圳市南山区科技园',
    icon: 'location',
    type: 'address'
  },
  {
    label: '官方网站',
    value: 'www.company.com',
    icon: 'globe',
    type: 'website'
  }
]

// 方法
const onClickLeft = () => {
  console.log('返回上一页')
}

const handleContact = (contact) => {
  showContact.value = false
  console.log('联系方式:', contact)
  // 这里可以添加具体的联系逻辑
}

const handleShare = () => {
  console.log('分享页面')
  // 这里可以添加分享逻辑
}
</script>

<style scoped>
/* 自定义样式 */
.van-nav-bar {
  --van-nav-bar-background: #ffffff;
}

.van-card {
  --van-card-background: #ffffff;
}

.van-grid-item {
  --van-grid-item-content-background: #ffffff;
}
</style>
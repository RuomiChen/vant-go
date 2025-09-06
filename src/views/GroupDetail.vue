<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- 群组头部 -->
    <div class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <van-icon name="arrow-left" size="20" @click="router.back()" class="text-gray-600" />
        <div class="flex items-center space-x-2">
          <van-image
            width="40"
            height="40"
            round
            :src="groupInfo.avatar"
            class="border border-gray-200"
          />
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{{ groupInfo.name }}</h2>
            <p class="text-sm text-gray-500">{{ groupInfo.memberCount }}人</p>
          </div>
        </div>
      </div>
      <van-icon name="ellipsis" size="20" @click="showGroupMenu" class="text-gray-600" />
    </div>

    <!-- 聊天消息区域 -->
    <div class="flex-1 overflow-y-auto px-4 py-2" ref="messagesContainer">
      <div v-for="message in messages" :key="message.id" class="mb-4">
        <!-- 系统消息 -->
        <div v-if="message.type === 'system'" class="text-center">
          <span class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {{ message.content }}
          </span>
        </div>
        
        <!-- 普通消息 -->
        <div v-else :class="['flex', message.isSelf ? 'justify-end' : 'justify-start']">
          <div :class="['flex', 'max-w-xs', 'lg:max-w-md', message.isSelf ? 'flex-row-reverse' : 'flex-row']">
            <!-- 头像 -->
            <van-image
              width="36"
              height="36"
              round
              :src="message.avatar"
              :class="['flex-shrink-0', message.isSelf ? 'ml-2' : 'mr-2']"
            />
            
            <!-- 消息内容 -->
            <div :class="['flex', 'flex-col', message.isSelf ? 'items-end' : 'items-start']">
              <!-- 用户名 -->
              <span v-if="!message.isSelf" class="text-xs text-gray-500 mb-1 px-1">
                {{ message.username }}
              </span>
              
              <!-- 消息气泡 -->
              <div :class="[
                'px-3 py-2 rounded-lg max-w-full break-words',
                message.isSelf 
                  ? 'bg-blue-500 text-white rounded-br-sm' 
                  : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
              ]">
                <!-- 文本消息 -->
                <p v-if="message.type === 'text'" class="text-sm leading-relaxed">
                  {{ message.content }}
                </p>
                
                <!-- 图片消息 -->
                <van-image
                  v-else-if="message.type === 'image'"
                  :src="message.content"
                  width="200"
                  height="150"
                  fit="cover"
                  round="8"
                  @click="previewImage(message.content)"
                />
              </div>
              
              <!-- 时间戳 -->
              <span class="text-xs text-gray-400 mt-1 px-1">
                {{ formatTime(message.timestamp) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="bg-white border-t border-gray-200 px-4 py-3">
      <div class="flex items-end space-x-2">
        <!-- 更多功能按钮 -->
        <van-icon 
          name="plus" 
          size="24" 
          @click="showMoreOptions" 
          class="text-gray-500 mb-2"
        />
        
        <!-- 输入框 -->
        <div class="flex-1">
          <van-field
            v-model="inputMessage"
            type="textarea"
            placeholder="输入消息..."
            autosize
            :maxlength="500"
            show-word-limit
            @keyup.enter="sendMessage"
            class="bg-gray-50 rounded-lg"
          />
        </div>
        
        <!-- 发送按钮 -->
        <van-button
          type="primary"
          size="small"
          :disabled="!inputMessage.trim()"
          @click="sendMessage"
          class="mb-2"
        >
          发送
        </van-button>
      </div>
    </div>

    <!-- 更多选项弹出层 -->
    <van-action-sheet
      v-model:show="showMoreSheet"
      :actions="moreActions"
      @select="onMoreActionSelect"
      cancel-text="取消"
    />

    <!-- 群组菜单弹出层 -->
    <van-action-sheet
      v-model:show="showGroupSheet"
      :actions="groupActions"
      @select="onGroupActionSelect"
      cancel-text="取消"
    />
  </div>
</template>

<script setup>
import router from '@/router'
import { nextTick, onMounted, reactive, ref } from 'vue'

// 群组信息
const groupInfo = reactive({
  name: '前端开发交流群',
  avatar: '/placeholder.svg?height=40&width=40',
  memberCount: 128
})

// 消息列表
const messages = ref([
  {
    id: 1,
    type: 'system',
    content: '欢迎加入前端开发交流群',
    timestamp: Date.now() - 3600000
  },
  {
    id: 2,
    type: 'text',
    content: '大家好，我是新来的，请多多指教！',
    username: '小明',
    avatar: '/placeholder.svg?height=36&width=36',
    isSelf: false,
    timestamp: Date.now() - 1800000
  },
  {
    id: 3,
    type: 'text',
    content: '欢迎欢迎！有什么问题可以随时问',
    username: '我',
    avatar: '/placeholder.svg?height=36&width=36',
    isSelf: true,
    timestamp: Date.now() - 1700000
  },
  {
    id: 4,
    type: 'text',
    content: '最近在学Vue3，有没有好的学习资源推荐？',
    username: '小红',
    avatar: '/placeholder.svg?height=36&width=36',
    isSelf: false,
    timestamp: Date.now() - 900000
  },
  {
    id: 5,
    type: 'image',
    content: '/placeholder.svg?height=200&width=300',
    username: '小李',
    avatar: '/placeholder.svg?height=36&width=36',
    isSelf: false,
    timestamp: Date.now() - 600000
  }
])

// 输入消息
const inputMessage = ref('')

// 弹出层控制
const showMoreSheet = ref(false)
const showGroupSheet = ref(false)

// 消息容器引用
const messagesContainer = ref(null)

// 更多选项
const moreActions = [
  { name: '相册', icon: 'photo-o' },
  { name: '拍摄', icon: 'camera-o' },
  { name: '文件', icon: 'description' },
  { name: '位置', icon: 'location-o' }
]

// 群组菜单选项
const groupActions = [
  { name: '群聊信息', icon: 'info-o' },
  { name: '查找聊天记录', icon: 'search' },
  { name: '消息免打扰', icon: 'volume-o' },
  { name: '置顶聊天', icon: 'star-o' }
]

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  const newMessage = {
    id: Date.now(),
    type: 'text',
    content: inputMessage.value.trim(),
    username: '我',
    avatar: '/placeholder.svg?height=36&width=36',
    isSelf: true,
    timestamp: Date.now()
  }
  
  messages.value.push(newMessage)
  inputMessage.value = ''
  
  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })
}

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) { // 1分钟内
    return '刚刚'
  } else if (diff < 3600000) { // 1小时内
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (date.toDateString() === now.toDateString()) { // 今天
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else {
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  }
}


// 显示更多选项
const showMoreOptions = () => {
  showMoreSheet.value = true
}

// 显示群组菜单
const showGroupMenu = () => {
  showGroupSheet.value = true
}

// 处理更多选项选择
const onMoreActionSelect = (action) => {
  console.log('选择了:', action.name)
  showMoreSheet.value = false
}

// 处理群组菜单选择
const onGroupActionSelect = (action) => {
  console.log('选择了:', action.name)
  showGroupSheet.value = false
}

// 预览图片
const previewImage = (imageUrl) => {
  console.log('预览图片:', imageUrl)
}

// 组件挂载后滚动到底部
onMounted(() => {
  nextTick(() => {
    scrollToBottom()
  })
})
</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
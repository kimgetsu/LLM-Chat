import { createRouter, createWebHistory } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'

const routes = [
  {
    path: '/',
    component: () => import('@/views/ChatView.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/chat/HomeChat.vue'),
      },
      {
        path: 'chat/:chatId',
        name: 'chat',
        component: () => import('@/views/chat/Chat.vue'),
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(to => {
  const chatStore = useChatStore()

  if (!chatStore.initialized) {
    chatStore.loadFromStorage()
  }

  if (to.name === 'chat') {
    const chatId = to.params.chatId as string

    if (!chatId) {
      return { name: 'home' }
    }

    const exists = chatStore.chats.some(c => c.id === chatId)

    if (!exists) {
      return { name: 'home' }
    }
  }
})

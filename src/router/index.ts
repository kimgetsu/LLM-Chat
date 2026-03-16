import { createRouter, createWebHistory } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'

export enum RouteNames {
  HomePage = 'home',
  ChatPage = 'chat',
}

const routes = [
  {
    path: '/',
    component: () => import('@/views/ChatView.vue'),
    children: [
      {
        path: '/',
        name: RouteNames.HomePage,
        component: () => import('@/views/chat/HomeChat.vue'),
      },
      {
        path: 'chat/:chatId',
        name: RouteNames.ChatPage,
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

  if (to.name === RouteNames.ChatPage) {
    const chatId = to.params.chatId as string

    if (!chatId) {
      return { name: RouteNames.HomePage }
    }

    const exists = chatStore.chats.some(c => c.id === chatId)

    if (!exists) {
      return { name: RouteNames.HomePage }
    }
  }
})

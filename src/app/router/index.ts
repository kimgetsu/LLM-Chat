import { createRouter, createWebHistory } from 'vue-router'
import { useChatStore } from '@/features/chat/model/chatStore'

export enum RouteNames {
  HomePage = 'home',
  ChatPage = 'chat',
  LoginPage = 'login',
}

const routes = [
  {
    path: '/',
    component: () => import('@/pages/chat/ChatPage.vue'),
    children: [
      {
        path: '/',
        name: RouteNames.HomePage,
        component: () => import('@/pages/chat/routes/HomeChat.vue'),
      },
      {
        path: 'chat/:chatId',
        name: RouteNames.ChatPage,
        component: () => import('@/pages/chat/routes/Chat.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: RouteNames.LoginPage,
    component: () => import('@/pages/auth'),
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

import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { useChatStore } from '@/features/chat/model/chatStore'
import { useAuthStore } from '@/shared/stores/authStore'

export enum RouteNames {
  HomePage = 'home',
  ChatPage = 'chat',
  LoginPage = 'login',
  AuthCallback = 'auth-callback',
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
        beforeEnter: (to: RouteLocationNormalized) => {
          const chatStore = useChatStore()

          const chatId = to.params.chatId as string

          if (!chatId) {
            return { name: RouteNames.HomePage }
          }

          const exists = chatStore.chats.some(c => c.id === chatId)

          if (!exists) {
            return { name: RouteNames.HomePage }
          }
        },
      },
    ],
  },
  {
    path: '/login',
    name: RouteNames.LoginPage,
    component: () => import('@/pages/login'),
  },
  {
    path: '/auth-callback',
    name: RouteNames.AuthCallback,
    component: () => import('@/pages/auth-callback'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(to => {
  const authStore = useAuthStore()

  if (to.name === RouteNames.AuthCallback) {
    return
  }

  if (!authStore.isAuthenticated && to.name !== RouteNames.LoginPage) {
    return { name: RouteNames.LoginPage }
  }

  if (authStore.isAuthenticated && to.name === RouteNames.LoginPage) {
    return { name: RouteNames.HomePage }
  }

  const chatStore = useChatStore()

  if (!chatStore.initialized) {
    chatStore.loadFromStorage()
  }
})

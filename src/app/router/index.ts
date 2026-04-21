import { createRouter, createWebHistory } from 'vue-router'
import { validateChatRoute } from '@/app/router/guards'

export enum RouteNames {
  HomePage = 'home',
  ChatPage = 'chat',
  LoginPage = 'login',
}

const routes = [
  {
    path: '/',
    component: () => import('@/pages/chat/ChatPage.vue'),
    meta: { requiresAuth: true },
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
        beforeEnter: validateChatRoute,
      },
    ],
  },
  {
    path: '/login',
    name: RouteNames.LoginPage,
    meta: { isAuthRoute: true },
    component: () => import('@/pages/login'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

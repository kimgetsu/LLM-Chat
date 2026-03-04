import { createRouter, createWebHistory } from 'vue-router'

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
        path: 'chat',
        name: 'chat',
        component: () => import('@/views/chat/Chat.vue'),
        props: true,
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

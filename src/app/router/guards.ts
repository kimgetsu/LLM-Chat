import { useRouter, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/shared/stores/authStore'
import { useChatStore } from '@/features/chat/model/chatStore'
import { RouteNames } from '@/app/router'

export function globalAuthGuard() {
  const authStore = useAuthStore()
  const router = useRouter()

  router.beforeEach(to => {
    if (to.name === RouteNames.AuthCallback) return

    if (to.meta?.requiresAuth && !authStore.isAuthenticated) {
      return { name: RouteNames.LoginPage }
    }

    if (to.meta?.isAuthRoute && authStore.isAuthenticated) {
      return { name: RouteNames.HomePage }
    }

    const chatStore = useChatStore()

    if (!chatStore.initialized) {
      chatStore.loadFromStorage()
    }
  })
}

export function validateChatRoute(to: RouteLocationNormalized) {
  const chatStore = useChatStore()

  const chatId = to.params.chatId as string

  if (!chatId) return { name: RouteNames.HomePage }

  const exists = chatStore.chats.some(c => c.id === chatId)

  if (!exists) return { name: RouteNames.HomePage }
}

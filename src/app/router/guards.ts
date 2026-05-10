import { useRouter, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/shared/stores/authStore'
import { RouteNames } from '@/app/router'

export function globalAuthGuard() {
  const router = useRouter()

  router.beforeEach(async to => {
    const authStore = useAuthStore()

    if (!authStore.isLoaded) {
      await authStore.fetchMe()
    }

    if (to.meta?.requiresAuth && !authStore.isAuthenticated) {
      return { name: RouteNames.LoginPage }
    }

    if (to.meta?.isAuthRoute && authStore.isAuthenticated) {
      return { name: RouteNames.HomePage }
    }
  })
}

export function validateChatRoute(to: RouteLocationNormalized) {
  const chatId = to.params.chatId as string

  if (!chatId) return { name: RouteNames.HomePage }
}

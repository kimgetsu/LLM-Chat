import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const userKey = useStorage<string | null>('auth_user_key', null)

  const isAuthenticated = computed(() => !!userKey.value)

  function setUserKey(key: string) {
    userKey.value = key
  }

  function logout() {
    userKey.value = null
  }

  return {
    isAuthenticated,
    setUserKey,
    logout,
  }
})

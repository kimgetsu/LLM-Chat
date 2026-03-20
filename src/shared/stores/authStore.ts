import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const userKey = ref<string | null>(null)

  const isAuthenticated = computed(() => {
    return !!userKey.value
  })

  function setUserKey(key: string) {
    userKey.value = key
    localStorage.setItem('auth_user_key', key)
  }

  function logout() {
    userKey.value = null
    localStorage.removeItem('auth_user_key')
  }

  function loadFromStorage() {
    const key = localStorage.getItem('auth_user_key')
    userKey.value = key
  }

  return {
    isAuthenticated,
    setUserKey,
    logout,
    loadFromStorage,
  }
})

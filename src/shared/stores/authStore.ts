import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/shared/api/http'
import type { User } from '@/entities/user/model/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoaded = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  const fetchMe = async () => {
    try {
      const res = await api.get('/auth/me')
      user.value = res.data.data
    } catch {
      user.value = null
    } finally {
      isLoaded.value = true
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      user.value = null
    }
  }

  return { user, isAuthenticated, fetchMe, logout, isLoaded }
})

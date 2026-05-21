import { describe, it, expect, vi } from 'vitest'
import { useAuthStore } from '@/shared/stores/authStore'
import { api } from '@/shared/api/http'

vi.mock('@/shared/api/http', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

describe('authStore', () => {
  describe('Начальное состояние', () => {
    it('user = null', () => {
      const store = useAuthStore()
      expect(store.user).toBeNull()
    })

    it('isAuthenticated = false', () => {
      const store = useAuthStore()
      expect(store.isAuthenticated).toBe(false)
    })

    it('isLoaded = false', () => {
      const store = useAuthStore()
      expect(store.isLoaded).toBe(false)
    })
  })

  describe('fetchMe', () => {
    it('При успехе устанавливает user', async () => {
      const mockUser = { id: 1, name: 'Denis' }
      ;(api.get as any).mockResolvedValue({ data: { data: mockUser } })

      const store = useAuthStore()
      await store.fetchMe()

      expect(store.user).toEqual(mockUser)
      expect(store.isAuthenticated).toBe(true)
      expect(store.isLoaded).toBe(true)
    })

    it('При ошибке user остаётся null', async () => {
      ;(api.get as any).mockRejectedValue(new Error('401'))

      const store = useAuthStore()
      await store.fetchMe()

      expect(store.user).toBeNull()
      expect(store.isAuthenticated).toBe(false)
      expect(store.isLoaded).toBe(true)
    })

    it('isLoaded становится true в любом случае', async () => {
      ;(api.get as any).mockRejectedValue(new Error('Network error'))

      const store = useAuthStore()
      await store.fetchMe()

      expect(store.isLoaded).toBe(true)
    })

    it('Вызывает api.get с /auth/me', async () => {
      ;(api.get as any).mockResolvedValue({ data: { data: null } })

      const store = useAuthStore()
      await store.fetchMe()

      expect(api.get).toHaveBeenCalledWith('/auth/me')
    })
  })

  describe('Logout', () => {
    it('Сбрасываем user в null', async () => {
      const mockUser = { id: '1', name: 'Denis' }
      ;(api.get as any).mockResolvedValue({ data: { data: mockUser } })

      const store = useAuthStore()
      await store.fetchMe()
      expect(store.user).not.toBeNull()
      ;(api.post as any).mockResolvedValue({})
      await store.logout()

      expect(store.user).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })

    it('Вызывает api.post с /auth/logout', async () => {
      ;(api.post as any).mockResolvedValue({})

      const store = useAuthStore()
      await store.logout()

      expect(api.post).toHaveBeenCalledWith('/auth/logout')
    })

    it('Сбрасывает user даже при ошибке (finally)', async () => {
      const mockUser = { id: '1', name: 'Denis' }
      ;(api.get as any).mockResolvedValue({ data: { data: mockUser } })

      const store = useAuthStore()
      await store.fetchMe()
      expect(store.user).not.toBeNull()
      ;(api.post as any).mockRejectedValue(new Error('Network error'))

      try {
        await store.logout()
      } catch {}

      expect(store.user).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })
  })
})

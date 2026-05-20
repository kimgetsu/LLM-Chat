import { createPinia, setActivePinia } from 'pinia'
import { setupBrowserMocks } from './mocks/browser'
import { vi } from 'vitest'

setupBrowserMocks()

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})

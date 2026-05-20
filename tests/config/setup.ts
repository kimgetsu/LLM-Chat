import { createPinia, setActivePinia } from 'pinia'
import { setupBrowserMocks } from './mocks/browser'
import { vi } from 'vitest'

setupBrowserMocks()

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
  }
})

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})
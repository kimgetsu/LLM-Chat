import { vi } from 'vitest'

export class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

export function setupBrowserMocks() {
  globalThis.IntersectionObserver = MockIntersectionObserver as any
}

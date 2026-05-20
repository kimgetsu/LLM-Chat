import { vi } from 'vitest'

export function setupBrowserMocks() {
  const mockObserve = vi.fn()
  const mockUnobserve = vi.fn()
  const mockDisconnect = vi.fn()

  class MockIntersectionObserver {
    observe = mockObserve
    unobserve = mockUnobserve
    disconnect = mockDisconnect
    options: IntersectionObserverInit
    callback: IntersectionObserverCallback

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      this.callback = callback
      this.options = options || {}
    }

    triggerIntersect(isIntersecting: boolean) {
      this.callback(
        [{ isIntersecting } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver
      )
    }
  }

  globalThis.IntersectionObserver = MockIntersectionObserver as any

  return { mockObserve, mockUnobserve, mockDisconnect }
}

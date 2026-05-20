import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useInfiniteScroll } from '@/shared/composables'

function createMockElements() {
  const targetRef = ref<HTMLElement | null>(document.createElement('div'))
  const rootRef = ref<HTMLElement | null>(document.createElement('div'))
  return { targetRef, rootRef }
}

function getObserver(index = 0): any {
  const Observer = globalThis.IntersectionObserver as any
  return Observer.mock.instances[index]
}

describe('useInfiniteScroll', () => {
  it('Вызывает observe с targetRef при создании', () => {
    const { targetRef, rootRef } = createMockElements()

    useInfiniteScroll({ targetRef, rootRef, onIntersect: vi.fn() })

    const observer = getObserver()
    expect(observer.observe).toHaveBeenCalledWith(targetRef.value)
  })

  it('Передаёт rootRef, rootMargin и threshold в опции', () => {
    const { targetRef, rootRef } = createMockElements()

    useInfiniteScroll({ targetRef, rootRef, onIntersect: vi.fn() })

    const observer = getObserver()
    expect(observer.options.root).toBe(rootRef.value)
    expect(observer.options.rootMargin).toBe('50px')
    expect(observer.options.threshold).toBe(0.1)
  })

  it('Вызывает onIntersect при пересечении', () => {
    const { targetRef, rootRef } = createMockElements()
    const onIntersect = vi.fn()

    useInfiniteScroll({ targetRef, rootRef, onIntersect })

    const observer = getObserver()
    observer.triggerIntersect(true)

    expect(onIntersect).toHaveBeenCalledOnce()
  })

  it('Не вызывает onIntersect повторно, пока isLoading=true', () => {
    const { targetRef, rootRef } = createMockElements()
    const onIntersect = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100))) as any

    useInfiniteScroll({ targetRef, rootRef, onIntersect })

    const observer = getObserver()
    observer.triggerIntersect(true)
    observer.triggerIntersect(true)

    expect(onIntersect).toHaveBeenCalledTimes(1)
  })

  it('Reset делает unobserve и observe заново', () => {
    const { targetRef, rootRef } = createMockElements()

    const { reset } = useInfiniteScroll({ targetRef, rootRef, onIntersect: vi.fn() })

    const observer = getObserver()
    reset()

    expect(observer.unobserve).toHaveBeenCalledWith(targetRef.value)
    expect(observer.observe).toHaveBeenCalledTimes(2)
  })

  it('Не падает если targetRef пустой', () => {
    const targetRef = ref<HTMLElement | null>(null)
    const rootRef = ref(document.createElement('div'))

    expect(() => useInfiniteScroll({ targetRef, rootRef, onIntersect: vi.fn() })).not.toThrow()
  })
})

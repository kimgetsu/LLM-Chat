import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useInfiniteScroll } from '@/shared/composables'

describe('useInfiniteScroll', () => {
  it('Возвращает reset', () => {
    const targetRef = ref(document.createElement('div'))
    const rootRef = ref(document.createElement('div'))
    const result = useInfiniteScroll({ targetRef, rootRef, onIntersect: vi.fn() })
    expect(result).toHaveProperty('reset')
    expect(typeof result.reset).toBe('function')
  })

  it('Не падает при вызове reset', () => {
    const targetRef = ref(document.createElement('div'))
    const rootRef = ref(document.createElement('div'))
    const { reset } = useInfiniteScroll({ targetRef, rootRef, onIntersect: vi.fn() })
    expect(() => reset()).not.toThrow()
  })

  it('Не падает если targetRef пустой', () => {
    const targetRef = ref<HTMLElement | null>(null)
    const rootRef = ref(document.createElement('div'))
    expect(() => useInfiniteScroll({ targetRef, rootRef, onIntersect: vi.fn() })).not.toThrow()
  })
})

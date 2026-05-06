import { onMounted, onUnmounted } from 'vue'
import { ref, type Ref } from 'vue'

interface UseInfiniteScrollOptions {
  targetRef: Ref<HTMLElement | null>
  rootRef: Ref<HTMLElement | null>
  onIntersect: () => void | Promise<void>
}

export function useInfiniteScroll({ targetRef, rootRef, onIntersect }: UseInfiniteScrollOptions) {
  let observer: IntersectionObserver | null = null
  const isLoading = ref(false)

  const setupInfiniteScroll = () => {
    if (observer || !targetRef.value) return
    observer = new IntersectionObserver(
      async entries => {
        const entry = entries[0]
        if (entry?.isIntersecting && !isLoading.value) {
          isLoading.value = true
          try {
            await onIntersect()
          } finally {
            isLoading.value = false
          }
        }
      },
      {
        root: rootRef.value,
        rootMargin: '50px',
        threshold: 0.1,
      }
    )
    observer.observe(targetRef.value)
  }

  onMounted(() => {
    setupInfiniteScroll()
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  const reset = () => {
    if (!observer) {
      setupInfiniteScroll()
    }

    if (targetRef.value) {
      observer?.unobserve(targetRef.value)
      observer?.observe(targetRef.value)
    }
  }

  return { reset }
}

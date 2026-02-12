import { ref, watch } from 'vue'
import { useAppBreakpoints } from '../../../composables/useAppBreakpoints'

const isCollapsed = ref(false)

export function useSidebarState() {
  const breakpoints = useAppBreakpoints()
  const isMobile = breakpoints.smaller('md')

  const open = () => (isCollapsed.value = false)

  const close = () => (isCollapsed.value = true)

  const toggle = () => (isCollapsed.value = !isCollapsed.value)

  watch(
    isMobile,
    val => {
      if (val) {
        isCollapsed.value = true
      }
    },
    { immediate: true }
  )

  return { isCollapsed, isMobile, open, close, toggle }
}

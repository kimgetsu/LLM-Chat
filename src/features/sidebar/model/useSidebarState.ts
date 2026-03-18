import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useSidebarState = createGlobalState(() => {
  const isCollapsed = ref(false)

  const open = () => (isCollapsed.value = false)

  const close = () => (isCollapsed.value = true)

  const toggle = () => (isCollapsed.value = !isCollapsed.value)

  return { isCollapsed, open, close, toggle }
})

import { useBreakpoints } from '@vueuse/core'

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
} as const

export function useAppBreakpoints() {
  return useBreakpoints(BREAKPOINTS)
}

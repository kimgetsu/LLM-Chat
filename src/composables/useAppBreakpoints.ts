import { useBreakpoints } from '@vueuse/core'

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
} as const

export function useAppBreakpoints() {
  const breakpoints = useBreakpoints(BREAKPOINTS)

  return {
    sm: breakpoints.smaller('sm'),
    md: breakpoints.smaller('md'),
    lg: breakpoints.greater('lg'),
    xl: breakpoints.greater('xl'),
    xxl: breakpoints.greater('xxl'),

    isMobile: breakpoints.smaller('md'),
    isDesktop: breakpoints.greater('lg'),
    isTablet: breakpoints.between('md', 'lg'),
  }
}

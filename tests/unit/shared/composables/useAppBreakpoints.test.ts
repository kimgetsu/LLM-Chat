import { describe, it, expect } from 'vitest'
import { useAppBreakpoints } from '@/shared/composables'

describe('useAppBreakpoints', () => {
  it('Возвращает все ожидаемые ключи', () => {
    const bp = useAppBreakpoints()
    expect(bp).toHaveProperty('sm')
    expect(bp).toHaveProperty('md')
    expect(bp).toHaveProperty('lg')
    expect(bp).toHaveProperty('xl')
    expect(bp).toHaveProperty('xxl')
    expect(bp).toHaveProperty('isMobile')
    expect(bp).toHaveProperty('isDesktop')
    expect(bp).toHaveProperty('isTablet')
  })
})

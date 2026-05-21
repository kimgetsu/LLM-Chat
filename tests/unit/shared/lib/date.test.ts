import { describe, it, expect } from 'vitest'
import { formatDate, formatTime } from '@/shared/lib/date'

describe('formatTime', () => {
  it('Форматирует timestamp во время (Часы:Минуты AM/PM)', () => {
    const timestamp = new Date(2025, 0, 1, 10, 30).getTime()
    expect(formatTime(timestamp)).toBe('10:30 AM')
  })

  it('Форматирует полночь как 12:00 AM', () => {
    const timestamp = new Date(2025, 0, 1, 0, 0).getTime()
    expect(formatTime(timestamp)).toBe('12:00 AM')
  })

  it('Форматирует полдень как 12:00 PM', () => {
    const timestamp = new Date(2025, 0, 1, 12, 0).getTime()
    expect(formatTime(timestamp)).toBe('12:00 PM')
  })

  it('Корректно форматирует вечернее время', () => {
    const timestamp = new Date(2025, 0, 1, 23, 59).getTime()
    expect(formatTime(timestamp)).toBe('11:59 PM')
  })
})

describe('formatDate', () => {
  it('Форматирует timestamp в дату (MMM D) в верхнем регистре', () => {
    const timestamp = new Date(2025, 0, 1).getTime()
    expect(formatDate(timestamp)).toBe('JAN 1')
  })

  it('Форматирует дату в середине месяца', () => {
    const timestamp = new Date(2025, 5, 15).getTime()
    expect(formatDate(timestamp)).toBe('JUN 15')
  })

  it('Форматирует дату в конце года', () => {
    const timestamp = new Date(2025, 11, 31).getTime()
    expect(formatDate(timestamp)).toBe('DEC 31')
  })
})

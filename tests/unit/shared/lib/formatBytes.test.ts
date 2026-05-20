import { describe, it, expect } from 'vitest'
import { formatBytes } from '@/shared/lib/formatBytes'

describe('formatBytes', () => {
    it('Возвращает "0 B" для нуля', () => {
        expect(formatBytes(0)).toBe('0 B')
    })

    it('Возвращает "0 B" для null, undefined и NaN', () => {
        expect(formatBytes(null)).toBe('0 B')
        expect(formatBytes(undefined)).toBe('0 B')
        expect(formatBytes(NaN)).toBe('0 B')
    })

    it('Корректно обрабатывает отрицательные значения', () => {
        expect(formatBytes(-1024)).toBe('1 KB')
    })

    it ('Форматирует байты в килобайты и мегабайты (base=1000)', () => {
        expect(formatBytes(1000)).toBe('1 KB')
        expect(formatBytes(1000000)).toBe('1 MB')
        expect(formatBytes(1500)).toBe('1.5 KB')
    })

    it ('форматирует с base=1024 (KiB, MiB)', () => {
    expect(formatBytes(1024, { base: 1024 })).toBe('1 KiB')
    expect(formatBytes(1048576, { base: 1024 })).toBe('1 MiB')
    })

    it ('С опцией integer округляет до целого', () => {
        expect(formatBytes(1500, { integer: true })).toBe('2 KB')
        expect(formatBytes(1499, { integer: true })).toBe('1 KB')
    })

    it ('Опция decimals влияет на вывод', () => {
        expect(formatBytes(1550, { decimals: 2 })).toBe('1.55 KB')
        expect(formatBytes(1550, { decimals: 0 })).toBe('2 KB')
    })
})
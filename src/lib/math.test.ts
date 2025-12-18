import { describe, it, expect } from 'vitest'
import { divide } from './math'

describe('divide', () => {
  it('divides numbers', () => {
    expect(divide(6, 2)).toBe(3)
  })

  it('throws on divide by zero', () => {
    expect(() => divide(1, 0)).toThrow('Cannot divide by zero')
  })
})

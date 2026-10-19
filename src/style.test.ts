import '@screenly/edge-apps/test'
import { describe, test, expect } from 'bun:test'
import { resolveStyle } from './style'

describe('resolveStyle', () => {
  test('should accept every style the manifest offers', () => {
    expect(resolveStyle('traditional')).toBe('traditional')
    expect(resolveStyle('modern')).toBe('modern')
    expect(resolveStyle('minimal')).toBe('minimal')
  })

  test('should tolerate casing and whitespace from the dashboard', () => {
    expect(resolveStyle('  Modern ')).toBe('modern')
    expect(resolveStyle('MINIMAL')).toBe('minimal')
  })

  test('should fall back to traditional for unknown values', () => {
    expect(resolveStyle('brutalist')).toBe('traditional')
    expect(resolveStyle('')).toBe('traditional')
    expect(resolveStyle(undefined)).toBe('traditional')
    expect(resolveStyle(null)).toBe('traditional')
  })
})

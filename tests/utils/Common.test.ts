import { describe, expect, test } from 'vitest'
import { judgeStatusForClass } from '@/utils/Common'

describe('test judgeStatusForClass', () => {
  test('judgeStatusForClass S', () => {
    expect(judgeStatusForClass('S')).toBe('noUsed')
  })

  test('judgeStatusForClass Y', () => {
    expect(judgeStatusForClass('Y')).toBe('connected')
  })
})

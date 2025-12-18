import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  createCycleState,
  setRunning,
  endCycle,
  endCycleWithError,
  resetCycle,
  isRunning,
  getCycleDuration,
  type CycleState,
} from './cycle'

describe('cycle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('createCycleState', () => {
    it('creates an idle cycle state', () => {
      const state = createCycleState()
      expect(state).toEqual({
        status: 'idle',
        startedAt: null,
        endedAt: null,
        error: null,
      })
    })
  })

  describe('setRunning', () => {
    it('sets state to running with timestamp', () => {
      const state = createCycleState()
      const running = setRunning(state)
      expect(running.status).toBe('running')
      expect(running.startedAt).toBe(Date.now())
      expect(running.endedAt).toBeNull()
      expect(running.error).toBeNull()
    })

    it('clears previous error when starting', () => {
      const state: CycleState = {
        status: 'error',
        startedAt: 1000,
        endedAt: 2000,
        error: 'Previous error',
      }
      const running = setRunning(state)
      expect(running.error).toBeNull()
      expect(running.endedAt).toBeNull()
    })
  })

  describe('endCycle', () => {
    it('sets state to completed with end timestamp', () => {
      const startTime = Date.now()
      const state = setRunning(createCycleState())

      vi.advanceTimersByTime(1000)
      const completed = endCycle(state)

      expect(completed.status).toBe('completed')
      expect(completed.startedAt).toBe(startTime)
      expect(completed.endedAt).toBe(startTime + 1000)
    })
  })

  describe('endCycleWithError', () => {
    it('sets state to error with message and timestamp', () => {
      const state = setRunning(createCycleState())

      vi.advanceTimersByTime(500)
      const errored = endCycleWithError(state, 'Something went wrong')

      expect(errored.status).toBe('error')
      expect(errored.error).toBe('Something went wrong')
      expect(errored.endedAt).toBeDefined()
    })
  })

  describe('resetCycle', () => {
    it('resets to initial idle state', () => {
      const state: CycleState = {
        status: 'completed',
        startedAt: 1000,
        endedAt: 2000,
        error: null,
      }
      const reset = resetCycle(state)
      expect(reset).toEqual(createCycleState())
    })
  })

  describe('isRunning', () => {
    it('returns true when running', () => {
      const state = setRunning(createCycleState())
      expect(isRunning(state)).toBe(true)
    })

    it('returns false when idle', () => {
      const state = createCycleState()
      expect(isRunning(state)).toBe(false)
    })

    it('returns false when completed', () => {
      const state = endCycle(setRunning(createCycleState()))
      expect(isRunning(state)).toBe(false)
    })
  })

  describe('getCycleDuration', () => {
    it('returns null when cycle not started', () => {
      const state = createCycleState()
      expect(getCycleDuration(state)).toBeNull()
    })

    it('returns null when cycle not ended', () => {
      const state = setRunning(createCycleState())
      expect(getCycleDuration(state)).toBeNull()
    })

    it('returns duration when cycle completed', () => {
      const state = setRunning(createCycleState())
      vi.advanceTimersByTime(2500)
      const completed = endCycle(state)
      expect(getCycleDuration(completed)).toBe(2500)
    })
  })
})

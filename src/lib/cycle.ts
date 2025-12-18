/**
 * Lifecycle cycle management utilities.
 * Provides functions to track running state and end cycles.
 */

export type CycleStatus = 'idle' | 'running' | 'completed' | 'error'

export interface CycleState {
  status: CycleStatus
  startedAt: number | null
  endedAt: number | null
  error: string | null
}

/** Creates an initial cycle state */
export function createCycleState(): CycleState {
  return {
    status: 'idle',
    startedAt: null,
    endedAt: null,
    error: null,
  }
}

/**
 * Sets the cycle to running state.
 * @param state - The current cycle state
 * @returns A new cycle state with status set to 'running'
 */
export function setRunning(state: CycleState): CycleState {
  return {
    ...state,
    status: 'running',
    startedAt: Date.now(),
    endedAt: null,
    error: null,
  }
}

/**
 * Ends the cycle and sets status to completed.
 * @param state - The current cycle state
 * @returns A new cycle state with status set to 'completed'
 */
export function endCycle(state: CycleState): CycleState {
  return {
    ...state,
    status: 'completed',
    endedAt: Date.now(),
  }
}

/**
 * Ends the cycle with an error.
 * @param state - The current cycle state
 * @param error - The error message
 * @returns A new cycle state with status set to 'error'
 */
export function endCycleWithError(state: CycleState, error: string): CycleState {
  return {
    ...state,
    status: 'error',
    endedAt: Date.now(),
    error,
  }
}

/**
 * Resets the cycle state back to idle.
 * @param state - The current cycle state
 * @returns A new idle cycle state
 */
export function resetCycle(state: CycleState): CycleState {
  return createCycleState()
}

/**
 * Checks if the cycle is currently running.
 * @param state - The cycle state to check
 * @returns True if the cycle is running
 */
export function isRunning(state: CycleState): boolean {
  return state.status === 'running'
}

/**
 * Calculates the duration of a completed cycle in milliseconds.
 * @param state - The cycle state
 * @returns Duration in milliseconds, or null if not applicable
 */
export function getCycleDuration(state: CycleState): number | null {
  if (state.startedAt === null || state.endedAt === null) {
    return null
  }
  return state.endedAt - state.startedAt
}

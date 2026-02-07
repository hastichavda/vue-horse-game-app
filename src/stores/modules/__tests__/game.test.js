import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStore } from 'vuex'
import game from '../game'

describe('Game Store Module', () => {
  let store

  beforeEach(() => {
    store = createStore({
      modules: {
        game,
      },
    })
  })

  it('need to initialize with null animationFrameId', () => {
    expect(store.state.game.animationFrameId).toBe(null)
  })

  it('need to set animation frame id', () => {
    const setAnimationFrameId = 123
    store.dispatch('game/setAnimationFrameId', setAnimationFrameId)

    expect(store.state.game.animationFrameId).toBe(setAnimationFrameId)
  })

  it('need to clear animation frame', () => {
    const clearAnimationFrameId = 123
    store.dispatch('game/setAnimationFrameId', clearAnimationFrameId)

    // Mock cancelAnimationFrame
    global.cancelAnimationFrame = vi.fn()

    store.dispatch('game/clearAnimationFrameId')

    expect(global.cancelAnimationFrame).toHaveBeenCalledWith(
      clearAnimationFrameId,
    )
    expect(store.state.game.animationFrameId).toBe(null)
  })

  it('need to not throw when clearing null animation frame', () => {
    expect(() => {
      store.dispatch('game/clearAnimationFrameId')
    }).not.toThrow()
  })
})

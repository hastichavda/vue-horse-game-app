import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import race from '../race'
import horse from '../horse'

describe('Race Store Module', () => {
  let store

  beforeEach(() => {
    store = createStore({
      modules: {
        race,
        horse,
      },
    })
    // Generate horses for testing
    store.dispatch('horse/generateHorses')
  })

  it('need to initialize with empty state', () => {
    expect(store.state.race.program).toEqual([])
    expect(store.state.race.currentRoundIndex).toBe(null)
    expect(store.state.race.isRacing).toBe(false)
    expect(store.state.race.isPaused).toBe(false)
    expect(store.state.race.roundResults).toEqual([])
    expect(store.state.race.activeRound).toBe(null)
  })

  it('need to generate program with 6 rounds', () => {
    const generateHorsesProgram = store.state.horse.horses
    store.dispatch('race/generateProgram', generateHorsesProgram)

    expect(store.state.race.program).toHaveLength(6)
    expect(store.getters['race/hasProgram']).toBe(true)
  })

  it('need to throw error if less than 10 horses provided', () => {
    expect(() => {
      store.dispatch('race/generateProgram', [])
    }).toThrow('Need at least 10 horses to generate program')
  })

  it('need to have correct round distances', () => {
    const horsesDistance = store.state.horse.horses
    store.dispatch('race/generateProgram', horsesDistance)

    const distances = [1200, 1400, 1600, 1800, 2000, 2200]
    store.state.race.program.forEach((round, index) => {
      expect(round.distance).toBe(distances[index])
      expect(round.roundNumber).toBe(index + 1)
    })
  })

  it('need to have 10 participants per round', () => {
    const horsesPerRound = store.state.horse.horses
    store.dispatch('race/generateProgram', horsesPerRound)

    store.state.race.program.forEach((round) => {
      expect(round.participants).toHaveLength(10)
    })
  })

  it('need to start race', () => {
    const horsesRace = store.state.horse.horses
    store.dispatch('race/generateProgram', horsesRace)
    store.dispatch('race/startRace')

    expect(store.state.race.isRacing).toBe(true)
    expect(store.state.race.isPaused).toBe(false)
    expect(store.state.race.currentRoundIndex).toBe(0)
  })

  it('need to throw error when starting race without program', () => {
    expect(() => {
      store.dispatch('race/startRace')
    }).toThrow('No program generated')
  })

  it('need to pause race', () => {
    const horsesPauseRace = store.state.horse.horses
    store.dispatch('race/generateProgram', horsesPauseRace)
    store.dispatch('race/startRace')
    store.dispatch('race/pauseRace')

    expect(store.state.race.isPaused).toBe(true)
  })

  it('need to resume race', () => {
    const horsesResumeRace = store.state.horse.horses
    store.dispatch('race/generateProgram', horsesResumeRace)
    store.dispatch('race/startRace')
    store.dispatch('race/pauseRace')
    store.dispatch('race/resumeRace')

    expect(store.state.race.isPaused).toBe(false)
  })

  it('need to set active round', () => {
    const activeRoundData = {
      roundNumber: 1,
      distance: 1200,
      participants: [],
    }

    store.dispatch('race/setActiveRound', activeRoundData)
    expect(store.state.race.activeRound).toEqual(activeRoundData)
    expect(store.getters['race/isRoundActive']).toBe(true)
  })

  it('need to get current round', () => {
    const currentHorsesRound = store.state.horse.horses
    store.dispatch('race/generateProgram', currentHorsesRound)
    store.dispatch('race/startRace')

    const currentRound = store.getters['race/currentRound']
    expect(currentRound).toBeDefined()
    expect(currentRound.roundNumber).toBe(1)
  })

  it('need to finish round and move to next', () => {
    const finishHorsesRound = store.state.horse.horses
    store.dispatch('race/generateProgram', finishHorsesRound)
    store.dispatch('race/startRace')

    const results = [
      { horse: { id: 1 }, position: 95 },
      { horse: { id: 2 }, position: 94 },
    ]

    store.dispatch('race/finishRound', results)

    expect(store.state.race.roundResults).toHaveLength(1)
    expect(store.state.race.currentRoundIndex).toBe(1)
    expect(store.state.race.activeRound).toBe(null)
  })

  it('need to reset race', () => {
    const resetHorsesRace = store.state.horse.horses
    store.dispatch('race/generateProgram', resetHorsesRace)
    store.dispatch('race/startRace')
    store.dispatch('race/resetRace')

    expect(store.state.race.currentRoundIndex).toBe(null)
    expect(store.state.race.isRacing).toBe(false)
    expect(store.state.race.isPaused).toBe(false)
    expect(store.state.race.roundResults).toEqual([])
    expect(store.state.race.activeRound).toBe(null)
  })

  it('need to detect all rounds complete', () => {
    const completeHorsesRound = store.state.horse.horses
    store.dispatch('race/generateProgram', completeHorsesRound)
    store.dispatch('race/startRace')

    // Complete all rounds - finishRound automatically increments the index
    for (let i = 0; i < 6; i++) {
      store.dispatch('race/finishRound', [])
    }

    // Verify final state
    expect(store.state.race.roundResults).toHaveLength(6)
    expect(store.state.race.currentRoundIndex).toBe(5)
    expect(store.getters['race/allRoundsComplete']).toBe(true)
  })
})

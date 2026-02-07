import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import horse from '../horse'

describe('Horse Store Module', () => {
  let store

  beforeEach(() => {
    store = createStore({
      modules: {
        horse,
      },
    })
  })

  it('need to initialize with empty horses array and isInitialized false', () => {
    expect(store.state.horse.horses).toEqual([])
    expect(store.state.horse.isInitialized).toBe(false)
  })

  it('need to generate 20 horses', () => {
    store.dispatch('horse/generateHorses')

    expect(store.state.horse.horses).toHaveLength(20)
    expect(store.state.horse.isInitialized).toBe(true)
  })

  it('need to not generate horses twice', () => {
    store.dispatch('horse/generateHorses')
    const generateFirstHorses = [...store.state.horse.horses]

    store.dispatch('horse/generateHorses')

    expect(store.state.horse.horses).toEqual(generateFirstHorses)
  })

  it('need to get horse by id', () => {
    store.dispatch('horse/generateHorses')

    const horse = store.getters['horse/getHorseById'](1)
    expect(horse).toBeDefined()
    expect(horse.id).toBe(1)
  })

  it('need to get horses by ids', () => {
    store.dispatch('horse/generateHorses')

    const horsesByIds = store.getters['horse/getHorsesByIds']([1, 2, 3])
    expect(horsesByIds).toHaveLength(3)
    expect(horsesByIds[0].id).toBe(1)
    expect(horsesByIds[1].id).toBe(2)
    expect(horsesByIds[2].id).toBe(3)
  })

  it('need to have horses with required properties', () => {
    store.dispatch('horse/generateHorses')

    const generateFirstHorse = store.state.horse.horses[0]
    expect(generateFirstHorse).toHaveProperty('id')
    expect(generateFirstHorse).toHaveProperty('name')
    expect(generateFirstHorse).toHaveProperty('color')
    expect(generateFirstHorse).toHaveProperty('condition')
    expect(typeof generateFirstHorse.condition).toBe('number')
    expect(generateFirstHorse.condition).toBeGreaterThanOrEqual(1)
    expect(generateFirstHorse.condition).toBeLessThanOrEqual(100)
  })
})

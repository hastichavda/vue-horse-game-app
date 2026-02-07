import { getHorseName } from '@/utils/horseNames'
import { getHorseColor } from '@/utils/colors'
import { randomInt, setSeed } from '@/utils/random'

export default {
  namespaced: true,
  state: {
    horses: [],
    isInitialized: false,
  },
  getters: {
    getHorseById: (state) => (id) => {
      return state.horses.find((horse) => horse.id === id)
    },
    getHorsesByIds: (state) => (ids) => {
      return ids
        .map((id) => state.horses.find((horse) => horse.id === id))
        .filter(Boolean)
    },
  },
  mutations: {
    SET_HORSES(state, horses) {
      state.horses = horses
    },
    SET_INITIALIZED(state, value) {
      state.isInitialized = value
    },
  },
  actions: {
    generateHorses({ commit, state }) {
      if (state.isInitialized) {
        return
      }

      setSeed(Date.now())
      const horses = []

      for (let i = 0; i < 20; i++) {
        horses.push({
          id: i + 1,
          name: getHorseName(i),
          color: getHorseColor(i),
          condition: randomInt(1, 100),
        })
      }

      commit('SET_HORSES', horses)
      commit('SET_INITIALIZED', true)
    },
  },
}

import { pickRandom } from '@/utils/random'

const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

export default {
  namespaced: true,
  state: {
    program: [],
    currentRoundIndex: null,
    isRacing: false,
    isPaused: false,
    roundResults: [],
    activeRound: null,
  },
  getters: {
    hasProgram: (state) => state.program.length > 0,
    currentRound: (state) => {
      if (state.currentRoundIndex === null) return null
      return state.program[state.currentRoundIndex] || null
    },
    isRoundActive: (state) => state.activeRound !== null,
    allRoundsComplete: (state) => {
      return (
        state.program.length > 0 &&
        state.currentRoundIndex !== null &&
        state.currentRoundIndex >= state.program.length - 1 &&
        state.roundResults.length === state.program.length
      )
    },
  },
  mutations: {
    SET_RACE_PROGRAM(state, program) {
      state.program = program
    },
    SET_CURRENT_RACE_ROUND_INDEX(state, index) {
      state.currentRoundIndex = index
    },
    SET_IS_RACING(state, value) {
      state.isRacing = value
    },
    SET_IS_PAUSED(state, value) {
      state.isPaused = value
    },
    ADD_ROUND_RESULT(state, result) {
      state.roundResults.push(result)
    },
    CLEAR_ROUND_RESULTS(state) {
      state.roundResults = []
    },
    SET_ACTIVE_ROUND(state, roundData) {
      state.activeRound = roundData
    },
    UPDATE_PARTICIPANT_POSITIONS(state, participants) {
      if (state.activeRound) {
        state.activeRound.participants = participants
      }
    },
    RESET_RACE(state) {
      state.currentRoundIndex = null
      state.isRacing = false
      state.isPaused = false
      state.roundResults = []
      state.activeRound = null
    },
  },
  actions: {
    generateProgram({ commit, getters }, allHorses) {
      if (allHorses.length < 10) {
        throw new Error('Need at least 10 horses to generate program')
      }

      const program = ROUND_DISTANCES.map((distance, index) => ({
        roundNumber: index + 1,
        distance,
        participants: pickRandom(allHorses, 10).map((h) => h.id),
      }))

      commit('SET_RACE_PROGRAM', program)
      commit('SET_CURRENT_RACE_ROUND_INDEX', null)
      commit('SET_IS_RACING', false)
      commit('SET_IS_PAUSED', false)
      commit('SET_ACTIVE_ROUND', null)
      commit('CLEAR_ROUND_RESULTS')
    },

    startRace({ commit, getters, state }) {
      if (!getters.hasProgram) {
        throw new Error('No program generated')
      }

      if (state.isRacing && !state.isPaused) {
        return
      }

      commit('SET_IS_RACING', true)
      commit('SET_IS_PAUSED', false)

      if (state.currentRoundIndex === null) {
        commit('SET_CURRENT_RACE_ROUND_INDEX', 0)
      }
    },

    pauseRace({ commit }) {
      commit('SET_IS_PAUSED', true)
    },

    resumeRace({ commit }) {
      commit('SET_IS_PAUSED', false)
    },

    setActiveRound({ commit }, roundData) {
      commit('SET_ACTIVE_ROUND', roundData)
    },

    finishRound({ commit, getters, state }, results) {
      const currentRound = getters.currentRound
      if (!currentRound) return

      commit('ADD_ROUND_RESULT', {
        roundNumber: currentRound.roundNumber,
        distance: currentRound.distance,
        results: [...results],
      })

      commit('SET_ACTIVE_ROUND', null)

      if (state.currentRoundIndex < state.program.length - 1) {
        commit('SET_CURRENT_RACE_ROUND_INDEX', state.currentRoundIndex + 1)
      } else {
        commit('SET_IS_RACING', false)
      }
    },

    resetRace({ commit }) {
      commit('RESET_RACE')
    },
  },
}

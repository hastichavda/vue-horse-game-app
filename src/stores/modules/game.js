export default {
  namespaced: true,
  state: {
    animationFrameId: null,
  },
  mutations: {
    SET_ANIMATION_FRAME_ID(state, id) {
      state.animationFrameId = id
    },
  },
  actions: {
    setAnimationFrameId({ commit }, id) {
      commit('SET_ANIMATION_FRAME_ID', id)
    },

    clearAnimationFrameId({ commit, state }) {
      if (state.animationFrameId !== null) {
        cancelAnimationFrame(state.animationFrameId)
        commit('SET_ANIMATION_FRAME_ID', null)
      }
    },
  },
}

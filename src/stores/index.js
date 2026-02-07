import { createStore } from 'vuex'
import horse from './modules/horse'
import race from './modules/race'
import game from './modules/game'

export default createStore({
  modules: {
    horse,
    race,
    game,
  },
})


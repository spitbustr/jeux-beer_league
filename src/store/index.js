import Vue from 'vue'
import Vuex from 'vuex'
import PlayerService from '@/services/PlayerService'
Vue.use(Vuex)

const SET_PLAYERS_LIST = "SET_PLAYERS_LIST"
export default new Vuex.Store({
  state: {
    players: [],
    eventsCards: [],
    playCards: [],
    strategyCards: [],
  },
  getters: {
    players: (state) => {
      return state.players
    },
    getPlayersByPosition: (state) => (position) => {
      return state.players.filter(p => p.info.position === position)
    },
    totalPlayers: (state) => state.players.length
  },
  mutations: {
    [SET_PLAYERS_LIST]: (state,players) => {state.players = players}
  },
  actions: {
    initialize({state,commit}){
      commit(SET_PLAYERS_LIST,PlayerService.generatePlayersList())
      console.log(state.players)
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import PlayerGenerationService from '@/services/PlayerGenerationService'
import TeamGenerationService from '@/services/TeamGenerationService'

Vue.use(Vuex)

const SET_PLAYERS_LIST = "SET_PLAYERS_LIST"
const SET_TEAMS_LIST = "SET_TEAMS_LIST"
const SET_LOGOS_LIST = "SET_LOGOS_LIST"
const SET_JERSEYS_LIST = "SET_JERSEYS_LIST"
const SET_USER = "SET_USER"
const SET_MANAGERS_LIST = "SET_MANAGERS_LIST"

export default new Vuex.Store({
  actions: {
    initialize({state,commit,dispatch}){
      dispatch("initializeLogoList")
      dispatch("initializeJerseysList")
      dispatch("initializeManagersList")
    },
    initializeLogoList({commit}) {
      const getImages = require.context("@/assets/images/logos", true, /\.png$/)
      const list = getImages.keys().map(key => key.split("./")[1].split(".png")[0])
      commit(SET_LOGOS_LIST,list)
    },
    initializeJerseysList({commit}) {
      const getImages = require.context("@/assets/images/jerseys", true, /\.png$/)
      const list = getImages.keys().map(key => key.split("./")[1].split(".png")[0])
      commit(SET_JERSEYS_LIST,list)
    },
    initializeManagersList({commit}) {
      const getImages = require.context("@/assets/images/managers", true, /\.png$/)
      const list = getImages.keys().map(key => key.split("./")[1].split(".png")[0])
      commit(SET_MANAGERS_LIST,list)
    },
    setUser({commit},user) {
      commit(SET_USER,user)
      commit(SET_TEAMS_LIST,TeamGenerationService.generateTeamsList())
      commit(SET_PLAYERS_LIST,PlayerGenerationService.generatePlayersList())
    }
  },

  getters: {
    players: (state) => {
      return state.players
    },
    teams: (state) => {
      return state.teams
    },
    images: (state) => {
      return {
        jerseys: state.jerseysImages,
        logos: state.logosImages,
        managers: state.managersImages,
      }
    },
    getPlayersByPosition: (state) => (position) => {
      return state.players.filter(p => p.info.position === position)
    },
    totalPlayers: (state) => state.players.length
  },
  mutations: {
    [SET_PLAYERS_LIST]: (state,players) => {state.players = players},
    [SET_TEAMS_LIST]: (state,teams) => {state.teams = teams},
    [SET_LOGOS_LIST]: (state,logos) => {state.logosImages = logos},
    [SET_JERSEYS_LIST]: (state,jerseys) => {state.jerseysImages = jerseys},
    [SET_USER]: (state,user) => {state.user = user},
    [SET_MANAGERS_LIST]: (state,managersImages) => {state.managersImages = managersImages},
  },
  state: {
    user: {},
    players: [],
    teams: [],
    jerseysImages: [],
    managersImages: [],
    logosImages: [],
    eventsCards: [],
    playCards: [],
    strategyCards: [],
  },
  modules: {
  }
})

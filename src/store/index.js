import Vue from 'vue'
import Vuex from 'vuex'
import PlayerGenerationService from '@/services/PlayerGenerationService'
import TeamGenerationService from '@/services/TeamGenerationService'
import EventGenerationService from '@/services/EventGenerationService'

Vue.use(Vuex)

const SET_PLAYERS_LIST = "SET_PLAYERS_LIST"
const SET_TEAMS_LIST = "SET_TEAMS_LIST"
const SET_LOGOS_LIST = "SET_LOGOS_LIST"
const SET_JERSEYS_LIST = "SET_JERSEYS_LIST"
const SET_USER = "SET_USER"
const SET_MANAGERS_LIST = "SET_MANAGERS_LIST"
const SET_EVENTS_LIST = "SET_EVENTS_LIST"
const SET_SAVED_GAMES_LIST = "SET_SAVED_GAMES_LIST"
const SET_ID = "SET_ID"
const STORAGE_KEY = "bl-game-"

export default new Vuex.Store({
  actions: {
    initializeFindSavedGames({commit}) {
      const prefix = STORAGE_KEY;
      const matchingKeys = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          matchingKeys.push(key);
        }
      }
      const games = []
      matchingKeys.forEach(game => {
        games.push(JSON.parse(localStorage.getItem(game)))
      })
      commit(SET_SAVED_GAMES_LIST,games)
    },
    loadGame({state,commit,dispatch},{savedState, store}) {
      // Restore basic state properties
      commit(SET_ID, savedState.id)
      commit(SET_USER, savedState.user)
      commit(SET_LOGOS_LIST, savedState.logosImages || [])
      commit(SET_JERSEYS_LIST, savedState.jerseysImages || [])
      commit(SET_MANAGERS_LIST, savedState.managersImages || [])
      commit(SET_EVENTS_LIST, savedState.eventsCards || [])

      // Rebuild players/teams from services if needed
      const rebuiltPlayers = savedState.players.map(p =>
        PlayerGenerationService.rebuildPlayer(p)
      )

      const rebuiltTeams = savedState.teams.map(t =>
        TeamGenerationService.rebuildTeam(t)
      )

      commit(SET_PLAYERS_LIST, rebuiltPlayers)
      commit(SET_TEAMS_LIST, rebuiltTeams)

      // Re-index saved games list if needed
      dispatch("initializeFindSavedGames")
    },
    initialize({state,commit,dispatch}){
      const id = `${Math.floor(Math.random() * 9000) + 1000}-${Date.now()}`
      commit(SET_ID,id)
      dispatch("initializeFindSavedGames")
      dispatch("initializeLogoList")
      dispatch("initializeJerseysList")
      dispatch("initializeManagersList")
      commit(SET_TEAMS_LIST,TeamGenerationService.generateTeamsList())
      commit(SET_EVENTS_LIST,EventGenerationService.generateEventsList())
      commit(SET_PLAYERS_LIST,PlayerGenerationService.generatePlayersList())
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
    },
    saveGame({state}) {
      const date = new Date();

      const parts = date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).split(', ')
      const formattedDate = `${parts[0]}, ${parts[1]} - ${parts[2]}`
      const currentGame = {
        ...state,
        date: formattedDate,
      }
      console.log('Storage size:', JSON.stringify(currentGame).length);
      localStorage.setItem(`${STORAGE_KEY}${state.id}`, JSON.stringify(currentGame))
    },
    removeGame({state, dispatch}, gameId) {
      console.log()
      localStorage.removeItem(`${STORAGE_KEY}${gameId}`)
      dispatch("initializeFindSavedGames")
    },
  },

  getters: {
    events: (state) => {
      return state.eventsCards
    },
    players: (state) => {
      return state.players
    },
    games: (state) => {
      return state.games
    },
    teams: (state) => {
      return state.teams
    },
    jerseys: (state) => {
      return state.jerseysImages
    },
    user: (state) => {
      return state.user
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
    [SET_EVENTS_LIST]: (state,events) => {state.eventsCards = events},
    [SET_SAVED_GAMES_LIST]: (state,games) => {state.games = games},
    [SET_ID]: (state,id) => {state.id = id},
  },
  state: {
    id: null,
    date: null,
    user: {},
    players: [],
    teams: [],
    games: [],
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

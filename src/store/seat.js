import { SEAT_ARRAY_KEY } from '@/config'
const state = {
  selectedArray: [],
}

const getters = {}

const actions = {
  setSeat({ commit }, payload) {
    localStorage.setItem(SEAT_ARRAY_KEY, JSON.stringify(payload))
    commit('SET_SEAT', payload)
  },

  clearSeat({ commit }) {
    localStorage.setItem(SEAT_ARRAY_KEY, '[]')
    commit('CLEAR_SEAT')
  },
}

const mutations = {
  SET_SEAT(state, payload) {
    state.selectedArray = payload
  },

  CLEAR_SEAT(state) {
    state.selectedArray = []
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
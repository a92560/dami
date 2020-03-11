const state = {
  city: "北京"
}
const mutations = {
  SET_CITY(state, payload) {
    state.city = payload
  }
}
const actions = {
  setCity({ commit }, payload) {
    commit("SET_CITY", payload)
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
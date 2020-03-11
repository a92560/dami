const state = {
  order: {
    orderId: '',
    itemName: '',
    totalAmount: 0,
  },
}

const getters = {}

const actions = {
  setOrder({ commit }, payload) {
    commit('SET_ORDER', payload)
  },
  clearOrder({ commit }) {
    commit('CLEAT_ORDER')
  },
}

const mutations = {
  SET_ORDER(state, payload) {
    state.order = payload
  },
  CLEAT_ORDER(state) {
    state.order = {}
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
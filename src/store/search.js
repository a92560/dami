const state = {
  searchList: [],
  keyword: "",
  loading: false
}

const getters = {

}

const actions = {

}

const mutations = {
  SET_SEARCH_LIST(state, payload) {
    state.searchList = payload
  },
  RESET_SEARCH_LIST(state) {
    state.searchList = []
  },
  SET_KEYWORD(state, payload) {
    state.keyword = payload
  },
  RESET_KEYWORD(state) {
    state.keyword = ""
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  RESET_LOADING(state) {
    state.loading = false
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
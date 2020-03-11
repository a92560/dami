/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 09:49:50
 * @LastEditors: Darren
 * @LastEditTime: 2020-02-11 09:50:50
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { TOKEN_KEY } from '@/config'
const state = {
  email: "",
  userId: "",
  avatarUrl: "",
  token: localStorage.getItem(TOKEN_KEY) || "",
}

const getters = {

}

const actions = {
  async login({ commit }, payload) {
    const ret = await axios.post("/api/user/login", payload)
    if (ret) {
      commit("login_success", ret.data)
      return true
    } else {
      return false
    }
  },

  async getUserInfo({ commit }) {
    const ret = await axios.get("/api/user")
    if (ret && ret.code !== 666) {
      commit("login_success", ret.data)
      return true
    } else {
      return false
    }
  }

}

const mutations = {
  login_success(state, { email, _id: userId, token, id: userID }) {
    state.email = email
    state.userId = userId ? userId : userID
    state.token = token ? token : window.localStorage.getItem(TOKEN_KEY)
      // console.log({ email, _id: userId, token })
  },
  GET_USER_INFO(state, { email, _id: userId, avatarUrl }) {
    state.email = email
    state.userId = userId ? userId : ""
    state.avatarUrl = avatarUrl ? avatarUrl : ""
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
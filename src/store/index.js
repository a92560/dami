/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-13 14:46:01
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 15:43:45
 */
import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'
import Seat from './seat'
import Order from './order'
import City from './city'
import Search from './search'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: User,
    seat: Seat,
    order: Order,
    city: City,
    search: Search,
  }
})
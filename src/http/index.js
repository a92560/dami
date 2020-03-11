/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-13 14:18:25
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-13 15:17:24
 */
import * as http from './http'
export const $http = http
export default {
  install(Vue, options) {
    Vue.prototype.$http = http
  }
}
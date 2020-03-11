/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 22:49:10
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-15 13:45:20
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/reset.less"
import "@/assets/css/iconfont.css"
import './plugins/element.js'
import http from './http'
import VueSocketIO from 'vue-socket.io'
// import "../mock/index.js"
// import '../socket-io-test'
Vue.config.productionTip = false
Vue.use(http)
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'ws://127.0.0.1:7001',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))
const app = new Vue({
  render: h => h(App),
  router,
  store,
  sockets: {
    //查看socket是否渲染成功
    connect() {
      console.log("链接成功");
    },
    disconnect() {
      console.log("断开链接");
    }, //检测socket断开链接 
    reconnect() {
      console.log("重新链接");
    },
    res1(id) {
      console.log("id", id)
    }
  }
}).$mount('#app')
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 22:49:10
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 16:49:06
 -->
<template>
  <div id="app">
    <!-- 登录和注册是不需要展示header和footer -->
    <m-header v-if="!($route.meta.isShowHeader === false) "></m-header>
    <router-view></router-view>
    <m-footer v-if="$route.meta.isShowFooterSimple !== true && !($route.meta.isShowFooter === false)"></m-footer>
    <footer-simple v-if="$route.meta.isShowFooterSimple === true"></footer-simple>
  </div>
</template>

<script>
import MFooter from "@/components/footer/index.vue"
import MHeader from "@/components/header/index.vue"
import FooterSimple from '@/components/footer-simple'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    MFooter,
    MHeader,
    FooterSimple
  },
  async mounted(){
    if(this.token){
      await this.getUserInfo()
    }
  },
  methods: {
    ...mapActions(['getUserInfo'])
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
}
</script>

<style>

</style>

<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-07 09:46:41
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-08 16:46:23
 -->
<template>
  <div>
    <div class="line"></div>
    <div class="container">
      <div class="left">
        <m-menu :navMenus="navMenus" v-if="navMenus && navMenus.length > 0"></m-menu>
        <div class="right">
          <m-bread-crumb></m-bread-crumb>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import MMenu from './menu'
import MBreadCrumb from '@/components/m-bread-crumb'
import { navMenus } from '@/config'
export default {
  name: "Mine",
  components: {
    MMenu,
    MBreadCrumb,
  },
  data () {
    return {
      navMenus: navMenus
    };
  }
}
</script>
<style lang="less" scoped>
.left{
  display: flex;
  padding-top: 20px;
  background: #FFF;
  .right{
    flex: 1;
    margin-left: 20px;
  }
}
.line{
  border-top: 2px solid @HoverC;
}
</style>
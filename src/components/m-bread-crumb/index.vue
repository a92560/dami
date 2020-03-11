<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-07 14:02:07
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-09 14:10:57
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item 
        v-for="(item, i) in levelList"
        :key="item.path"
        >
        <!-- 不能跳转：路由没有配置重定向或者当前项已经是最后一项 -->
        <span
          v-if="item.redirect === 'noredirect' || i === levelList.length - 1"
          class="no-redirect"
        >{{item.meta.title}}</span>
        <a v-else @click.prevent="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import pathToRegexp from "path-to-regexp"
export default {
  name: "MBreadCrumb",
  data () {
    return {
      levelList: []
    };
  },
  watch: {
    // 观察$route变化
    $route: {
      handler(route){
        this.getBreadcrumb()
      },
      immediate: true
    }
  },
  methods: {
    
    getBreadcrumb() {

      // /mine/orderlist
      // ['/', '/mine', '/mine/orderlist']
      // 面包屑仅显示包含meta.title 和 item.meta.breadcrumb 不为false的路由
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb === true)
      // 不是以/mine开头的
      if(!this.isHome(matched[0])){
        matched = [{path: "/mine", redirect: "/mine", meta: {title: "我的大觅"}}].concat(matched)
      }
      /* // 以/mine/orderlist
      if(matched[1].path === '/mine/orderlist'){
        matched.splice(1, 0, {path: "/mine/trade/orderlist", redirect: "/mine/trade/orderlist", meta: {title: "交易中心"}})
      }

      // 以/mine/personal || /mine/ticketbuyer
      if(matched[1].path === '/mine/personal' || matched[1].path === '/mine/ticketbuyer'){
        matched.splice(1, 0, {path: "/mine/account/personal", redirect: "/mine/account/personal", meta: {title: "账户中心"}})
      } */

      this.levelList = matched
    },
    isHome(route){
      const name = route && route.name
      if(!name){
        return false
      }
      return name.trim().toLocaleLowerCase() === 'mine'.toLocaleLowerCase()
    },
    pathCompile(path){
      const {params} = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },

    handleLink(item){
      const {redirect, path} = item
      // 相同路径
      if(path === this.$route.path || redirect === this.$route.path){
        return 
      }
      if(redirect){
        this.$router.push(redirect)
        return 
      }

      // 编译path 避免存在路径参数
      this.$router.push(this.pathCompile(path))
    }


  },
}
</script>
<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
}
.app-breadcrumb{
  width: 100%;
  border: 1px solid #efefef;
  height: 38px;
  padding: 0 15px;
  box-sizing: border-box;
  padding-right: 0;
  line-height: 38px;
  color: #333;
  margin-bottom: 15px;
  background: linear-gradient(top, #efefef, #fff);
}
.app-breadcrumb.el-breadcrumb .no-redirect {
  color: #97a8be;
  cursor: text;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
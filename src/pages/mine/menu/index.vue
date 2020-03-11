<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-07 10:50:50
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-07 14:24:59
 -->
<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
    background-color="#fff"
    text-color="#495060"
    router
    :default-openeds="['/mine/trade', '/mine/account']"
    >
    <template 
      v-for="(item, i) in navMenus"
      >
      <el-menu-item v-if="!item.children" :index="item.key" :key="item.key" :class="{'active': item.title === '我的大觅'}">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
      </el-menu-item>
      <el-submenu v-else :index="item.key" :key="item.key">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="child.key" v-for="child in item.children" :key="child.key">
            <i :class="child.icon"></i>
            {{child.title}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
export default {
  name: "Menu",
  props: {
    navMenus: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
    };
  },
  methods: {
    handleOpen() {
      
    },
    handleClose() {
      
    }
  },
}
</script>
<style lang="less">
.el-menu-vertical{
  width: 25%;
}
.el-menu-item:hover{
  color: @HoverC!important;
}
.el-menu-item.active{
  background: #ff5c41!important;
  color: white!important;
  font-weight: bold;
}
.el-menu-item.active:hover{
  color: white!important; 
}
.el-menu-item.is-active{
  color: @HoverC!important;
}
</style>
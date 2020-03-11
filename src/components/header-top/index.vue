<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-12 13:20:10
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-07 09:45:38
 -->
<template>
  <div style="border: 1px solid #ccc">
    <div class="header-wrapper container">
    <!-- 左边部分 -->
      <div class="left-header">
        <span class="tip">HI！欢迎来到大觅网</span>
        <span v-if="!$store.state.user.token">
          [
            <router-link to="/reg" class="reg">注册</router-link>
            <router-link to="/login" class="login">登录</router-link>
          ]
        </span>
        <span v-else>
          [
          {{ email }}
          ]
        </span>
        <span class="mine" @click="showMineList = !showMineList">
          我的大觅<i class="iconfont icon-xiajiantou"></i>
          <ul class="dropdown" v-show="showMineList">
            <router-link to="/mine">
              <li>个人信息</li>
            </router-link>
            <router-link to="/orderlist">
              <li>订单管理</li>
            </router-link>
          </ul>
        </span>
      </div>
      <!-- 左边部分结束 -->

      <!-- 右边部分开始 -->
      <div class="right-header">
        <ul class="nav-list">
          <li><router-link to="/wechat">大觅网微信</router-link></li>
          <li><router-link to="/app">手机版</router-link></li>
          <li><router-link to="/services">客户服务<i class="iconfont icon-xiajiantou"></i></router-link></li>
          <li><router-link to="/nav">网站导航<i class="iconfont icon-xiajiantou"></i></router-link></li>
          <li><router-link to="/service">客服</router-link></li>
        </ul>
      </div>
      <!-- 右边部分结束 -->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "HeaderTop",
  data () {
    return {
      showMineList: false
    };
  },
  computed: {
    ...mapState({
      email: state => state.user.email
    })
  }
}
</script>
<style lang="less" scoped>
.header-wrapper{
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: @FontSize;
  max-width: @WinWidth;
  user-select: none;
}

.header-wrapper .tip{
  font-size: 13px;
  color: @BaseC;
}

.header-wrapper .reg{
  font-size: @FontSize;
  margin-right: 5px;
  color: #ff3c1b;
}

.header-wrapper .login{
  font-size: @FontSize;
  margin-left: 5px;
  color: #1b1b1b;
}

.header-wrapper .mine{
  color: #1b1b1b;
  margin-left: 5px;
  cursor: pointer;
  position: relative;
  .dropdown{
    position: absolute;
    top: 24px;
    left: 0;
    border: 1px solid #ccc;
    width: 80px;
    box-sizing: border-box;
    z-index: 9999;
    overflow: hidden;
    li{
      padding: 9px 15px;
      width: 80px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      &:hover{
        color: @HoverC;
        background: #ccc;
      }
    }
  }
}

.header-wrapper .mine i{
  font-size: 16px;
  position: relative;
  top: 3px;
}

.nav-list{
  margin-top: 0;
  line-height: 34px;
}

.nav-list li{
  float: right;
  width: 78px;
  height: 34px;
  text-align: center;
}

.nav-list li a{
  color: @LinkC;
  position: relative;
}

.nav-list li i{
  font-size: 16px;
  position: absolute;
  top: -7px;
}

.nav-list li a:hover{
  color:@HoverC;
}
</style>
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-12 15:35:42
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 09:33:33
 -->
<template>
  <div class="classfication-wrapper">
    <h1 class="tc">全部商品分类</h1>
    <div class="classify-content">
      <div class="goods-classfication">
        <ul>
          <li v-for="(menu, index) in siderMenus" :key="menu.id" @mouseenter="enter(index)">
            <router-link :to="{ path: '/ticketList',  query: { id: menu._id, pid: '0' } }">
              <i :class="menu.icon"></i>
              <a href="/#">{{menu.itemType}}</a>
              <i class="iconfont icon-youjiantou fr clearfix"></i>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="classify-hide" v-if="showSubMenu">
        <div class="hide-tab">
          <div class="tab-header">
            <div class="left-tab">
              <h1>{{curItemType}}</h1>
              <i class="iconfont icon-youjiantou"></i>
            </div>
            <i class="iconfont icon-close" @click="close"></i>
          </div>
          <ul>
            <li v-for="subMenu in selectedTypeChildren" :key="subMenu._id">
              <router-link :to="{ path: '/ticketList', query: { id: subMenu._id, pid }}">{{subMenu.itemType}}</router-link>
            </li>
          </ul>
          <div class="hot-children">
            <div class="top-tab">
              <h1>相关热门</h1>
              <i class="iconfont icon-youjiantou"></i>
            </div>
            <ul>
              <li v-for="hotItem in hotItems" :key="hotItem.id">
                <hot-children :hotItem="hotItem" :highLightPrice="false"></hot-children>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import HotChildren from '@/components/hot-children'
export default {
  name: "GoodsClassify",
  components: {
    HotChildren,
  },
  props: {
    siderMenus: {
      type: Array,
      default: [],
    },
  },
  data () {
    return {
      activedIndex: -1,
      showSubMenu: false
    };
  },
  computed: {
    curItemType() {
      if(this.activedIndex > -1){
        return this.siderMenus[this.activedIndex].itemType
      }else{
        return ""
      }
    },
    selectedTypeChildren(){
      if(this.activedIndex > -1){
        return this.siderMenus[this.activedIndex].children
      }else{
        return []
      }
    },
    hotItems(){
      if(this.activedIndex > -1){
        return this.siderMenus[this.activedIndex].hotItems
      }else{
        return []
      }
    },
    /* 计算pid */
    pid(){
      if(this.activedIndex > -1){
        return this.siderMenus[this.activedIndex]._id
      }else{
        /* 一级分类默认parent为0 */
        return "0"
      }
    }
  },
  methods: {
    enter(index) {
      if(index >= 0){
        this.showSubMenu = true
        this.activedIndex = index
      }
    },
    close(){
      this.showSubMenu = false
      this.activedIndex = -1
    }
  },
}
</script>
<style lang="less" scoped>
.classfication-wrapper{
  width: 202px;
  > h1{
    font-size: 16px;
    font-weight: bold;
    background: #000;
    height: 50px;
    color: #FFF;
    line-height: 50px;
  }
  .classify-content{
    position: relative;
  }
  .goods-classfication{
    width: 100%;
    height: 420px;
    background: @HoverC;
    ul{
      width: 100%;
      li{
        padding: 20px 10px 20px 30px;
        color: #fff5f3;
        cursor: pointer;
        a{
          color: #fff5f3;
          padding: 0 10px 0 10px;
          font-size: 14px;
        }
      }
    }
  }
  .classify-hide{
    position: absolute;
    height: 420px;
    box-sizing: border-box;
    top: 0;
    left: 202px;
    width: 600px;
    padding: 10px;
    border: 1px solid @HoverC;
    border-left: none;
    z-index: 999;
    background: #fff5f3;
    .hide-tab{
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      .tab-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        i{
          font-size: 16px;
        }
        i.icon-close{
          cursor: pointer;
          font-size: 20px;
        }
        .left-tab{
          > h1{
            padding-bottom: 10px;
            display: inline-block;
            font-size: 16px;
          }
        }
      }
      li{
        float: left;
        padding: 5px 6px;
      }
      .hot-children{
        ul{
          width: 100%;
          height: 100%;
          li{
            width: 25%;
            min-height: 150px;
            box-sizing: border-box;
            margin-bottom: 10px;
          }
        }
        .top-tab{
          > h1{
            padding: 10px 0;
            display: inline-block;
            font-size: 16px;
          }
        }
        
      }
    }
  }
}
</style>
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-12 20:23:07
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 17:01:01
 -->
<template>
  <div class="card" v-if="hotItem._id">
    <router-link :to="{ path: '/ticketdesc', query: { id: hotItem._id }}" class="img-desc-wrapper">
      <div style="position: relative">
        <div :style="{width: width + 'px', height: height + 'px'}">
          <img :src="imgBaseUrl + hotItem.imgUrl" :style="{width: width + 'px', height: height + 'px'}" alt="img"/>
        </div>
        <div class="card-hide" :style="{width: width + 'px'}">
          <p :style="{width: (width - 20) + 'px'}">{{hotItem.itemName}}</p>
          <p :style="{width: (width - 20) + 'px'}">2017.12.03 19:30</p>
        </div>
      </div>
      
    </router-link>
    <h2 class="card-title" :style="{width: width + 'px'}">{{hotItem.itemName}}</h2>
    <p class="card-price">
      票价：<span :class="[{'high-light': highLightPrice}]">¥{{hotItem.minPrice}}</span>
    </p>
  </div>
</template>
<script>
import {IMG_BASE_URL} from '@/config'
export default {
  name: "HotChildren",
  props: {
    hotItem: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    highLightPrice: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      imgBaseUrl: IMG_BASE_URL
    };
  }
}
</script>
<style lang="less" scoped>
.card{
  width: 100%;
  .img-desc-wrapper{
    &:hover{
      .card-hide{
        transition: opacity .5s ease-in-out;
        opacity: 1;
      }
    }
    .card-hide{
      padding: 10px;
      box-sizing: border-box;
      color: #fff;
      background-color: rgba(202, 61, 34, 0.9);
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 0;
      p{
        line-height: 20px;
        box-sizing: border-box;
        &:nth-child(1){
          height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
        }
        &:nth-child(2){
          white-space: nowrap;
          font-size: 10px;
        }
      }
    }
  }
  .card-title{
    margin-top: 5px;
    box-sizing: border-box;
    height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //行数
    -webkit-box-orient: vertical;
  }
  .card-price{
    padding-top: 5px;
    span.high-light{
      color: @HoverC;
      font-size: 16px;
    }
  }
}
</style>
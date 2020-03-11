<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-14 16:16:46
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 11:33:42
 -->
<template>
  <router-link :to="{ path: '/ticketdesc', query: { id: img.id }}" tag="div" class="floor-big">
    <div class="floor-big-img">
      <img :src=" imgBaseUrl + img.bigImgUrl" alt="img">
    </div>
    <div class="img-hide-text">
      <h3>{{img.itemName}}</h3>
      <p>{{img.minPrice}}元</p>
    </div>
  </router-link>
</template>
<script>
import { IMG_BASE_URL } from '@/config'
export default {
  name: "BigAdImg",
  data () {
    return {
      imgBaseUrl: IMG_BASE_URL
    };
  },
  props: {
    img: {
      type: Object,
      default: () => {}
    },
  },
}
</script>
<style lang="less" scoped>
.floor-big{
  width: 100%;
  height: 100%;
  .floor-big-img{
    height: 100%;
    width: 100%;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .img-hide-text{
    background-color: rgba(184, 43, 19, 0.9);
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    h3{
      width: 100%;
      margin: 10px 0;
      height: 40px;
      line-height: 20px;
      font-size: 13px;
    }
  }
}
</style>
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-14 17:02:15
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 13:33:42
 -->
<template>
  <div class="wrapper">
    <div class="img-box">
      <router-link :to="{ path: '/ticketdesc', query: { id: img._id }}">
        <img :src="imgBaseUrl + img.imgUrl" alt="图片">
      </router-link>
    </div>
    <div class="img-content">
      <h3 class="name">{{img.itemName}}</h3>
      <!-- <p class="duration">{{img.startTime[0].substring(0, 10)}}-{{img.endTime[0].substring(0, 10)}}</p> -->
      <p class="address">{{img.areaId}}</p>
      <p class="price">¥ {{img.minPrice}}起</p>
    </div>
  </div>
</template>
<script>
import { IMG_BASE_URL } from '@/config'
export default {
  name: "LeftRightAdImg",
  data () {
    return {
      imgBaseUrl: IMG_BASE_URL,
      areaId: this.areaId
    };
  },
  props: {
    img: {
      type: Object,
      default: () => {}
    },
  },
  mounted(){
    // this.getCity()
  },
  methods: {
    async getCity(){
      console.log(this.img.areaId)
      if(!this.img.areaId){
        return 
      }
      const ret = await this.$http.getCity({data: {areaId: this.img.areaId}})
      console.log("ret", ret)
    }
  },
}
</script>
<style lang="less" scoped>
.wrapper{
  display: flex;
  .img-box{
    width: 112px;
    height: 150px;
    img{
      width: 112px;
      height: 150px;
    }
  }
  .img-content{
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    .name{
      white-space: nowrap;
      display: block;
      text-overflow: ellipsis;
      width: 142px;
      overflow: hidden;
      margin-bottom: 60px;
      color: #000;
      font-weight: bold;
    }
    .address{
      padding: 10px 0;
    }
  }
}
</style>
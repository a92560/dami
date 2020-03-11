<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-31 19:15:35
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-01 11:21:17
 -->
<template>
  <li class="guess-wrapper">
    <div class="img-box">
      <img :src="itemData.imgUrl" alt="图片">
    </div>
    <div class="item-desc">
      <p class="title">{{itemData.itemName}}</p>
      <p class="location grey"><span>{{itemData.areaName}}</span><span>{{itemData.address}}</span></p>
      <p class="time grey">{{itemData.startDate}}-{{itemData.endDate}}</p>
      <p class="price">{{itemData.minPrice}}元<span class="up grey">起</span></p>
    </div>
  </li>
</template>
<script>
export default {
  name: "GuessLike",
  props: {
    itemData: {
      type: Object,
      default: () => {}
    },
  },
  data () {
    return {
    };
  }
}
</script>
<style lang="less" scoped>
@fontColor: #999999;
.grey{
  color: @fontColor;
}
.guess-wrapper{
  cursor: pointer;
  display: flex;
  padding: 20px 0 10px 20px;
  box-sizing: border-box;
  .img-box{
    width: 98px;
    height: 130px;
    margin-right: 10px;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .item-desc{
    flex: 1;
    .title{
      margin-bottom: 50px;
    }
    .location{
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      >span{
        display: inline-block;
      }
      >span:last-child{
        flex: 1;
        margin-left: 10px;
        white-space: nowrap;
        width: 100px;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 10px;
      }
    }
    .price{
      margin-top: 20px;
      color: @HoverC;
      font-size: 14px;
      font-weight: bold;
      >span.up.grey{
        font-size: 12px;
        display: inline-block;
        text-indent: 15px;
      }
    }
    .time{
      width: 130px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
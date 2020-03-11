<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-03 11:27:42
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-03 16:04:39
 -->
<template>
  <div class="recommend-item">
    <div class="item-top">
      <div class="ad-img">
        <img :src="itemData.imgUrl" alt="图片">
      </div>
    </div>
    <div class="item-down">
      <p>{{itemData.itemName}}</p>
      <p>{{itemData.startDate}}<span>-</span>{{itemData.endDate}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "HotRecommendItem",
  props: {
    itemData: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
    };
  }
}
</script>
<style lang="less" scoped>
.recommend-item{
  margin-bottom: 20px;
  .item-top{
    .ad-img{
      width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      >img{
        width: 265px;
        height: 100%;
      }
    }
  }
  .item-down{
    margin-left: 5px;
    >p{
      padding: 5px;
      text-align: center;
      &:last-child{
        border-bottom: 1px dotted #ccc;
      }
    }
  }
}
</style>
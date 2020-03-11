<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-05 14:56:54
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-06 10:19:42
 -->
<template>
  <li class="body-wrapper">
    <div class="body-left">
      <i :class="'iconfont icon-zuowei-yishou ' + itemData.areaLevel"></i>
      <div class="text">{{itemData.price}}</div>
    </div>
    <div class="body-right">
      <p>
        座位：{{itemData.x}}排{{itemData.y}}号
      </p>
      <p> 看台：{{itemData.cinemaId}}</p>
      <p>
        楼层：剧场
      </p>
    </div>
  </li>
</template>
<script>
export default {
  name: "SelectedTicketItem",
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
.body-wrapper{
  padding: 10px 5px 10px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  margin: 3px 0;
  .body-left{
    margin: 0 15px;
    >i{
      display: inline-block;
      color: #65a9fd;
      font-size: 14px;
      margin-bottom: 8px;
      &.A{
        color: #fd6566;
      }
      &.B{
        color: #fd68a6;
      }
      &.C{
        color: #65a9fd;
      }
    }
    .text{
      text-align: left;
    }
  }
  .body-right{
    >p{
      padding: 3px;
    }
  }
}

</style>
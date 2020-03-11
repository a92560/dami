<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 12:20:16
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-06 13:56:32
 -->
<template>
  <div class="order-item">
    <h1 class="title">{{title}}</h1>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "OrderItem",
  props: {
    title: {
      type: String,
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
.order-item{
  padding: 10px 0;
  .title{
    text-indent: 20px;
    border-bottom: 1px solid #CCC;
    position: relative;
    height: 30px;
    line-height: 30px;
    color: @HoverC;
    font-size: 14px;
    &:after{
      position: absolute;
      top: 30px;
      content: "";
      display: block;
      height: 1px;
      width: 120px;
      background: @HoverC;
    }
  }
}
</style>
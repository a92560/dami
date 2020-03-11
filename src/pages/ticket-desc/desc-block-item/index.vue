<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-02 13:10:55
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-03 13:19:10
 -->
<template>
  <div class="block-desc">
    <div class="top">
      <div class="vertical-line"></div>
      <div class="text">{{title}}</div>
      <div class="horizontal-line"></div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "DescBlockItem",
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
.block-desc{
  width: 100%;
  margin-left: 20px;
  .top{
    margin-top: 30px;
    display: flex;
    align-items: center;
    width: 96%;
    .vertical-line{
      height: 20px;
      width: 2px;
      background: @HoverC;
      margin-right: 10px;
    }
    .text{
      font-size: 14px;
    }
    .horizontal-line{
      flex: 1;
      height: 1px;
      margin-left: 20px;
      border-bottom: 1px dotted red;
    }
  }
}
</style>
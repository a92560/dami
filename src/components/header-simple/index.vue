<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-09 15:24:14
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-09 15:26:56
 -->
<template>
  <div class="header-wrapper">
    <div class="img-box">
      <img src="./img/logo.png" alt="">
    </div>
    <div class="text">
      {{title}}
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderSimple",
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
.header-wrapper{
  display: flex;
  height: 60px;
  background: white;
  justify-content: center;
  .img-box{
    width: 167px;
    position: relative;
    margin-right: 20px;
    &:after{
      content: "";
      display: inline-block;
      width: 2px;
      height: 40px;
      background: red;
      position: absolute;
      top: 10px;
      right: 0;
    }
    >img{
      width: 100%;
      height: 100%;
    }
  }
  .text{
    height: 100%;
    line-height: 60px;
    color: #495060;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-14 16:17:19
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-14 17:18:04
 -->
<template>
  <div class="wrapper">
    <ul>
      <li v-for="img in imgs" :key="img.id">
        <left-right-ad-img :img="img"></left-right-ad-img>
      </li>
    </ul>
  </div>
</template>
<script>
import LeftRightAdImg from './left-right-ad-img'
export default {
  components: {
    LeftRightAdImg,
  },
  name: "LeftRightAdImgList",
  data () {
    return {
    };
  },
  props: {
    imgs: {
      type: Array,
      default: () => []
    },
  },
}
</script>
<style lang="less" scoped>
.wrapper{
  width: 100%;
  ul>li{
    width: 50%;
    float: left;
    height: 150px;
    margin-bottom: 62px;
    &:last-of-type,
    &:nth-last-of-type(2)
    {
      margin-bottom: 0;
    }
  }
}
</style>
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-02 15:56:27
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-03 15:29:43
 -->
<template>
  <div class="hot-recommend">
    <div class="title">
      <span>热门推荐</span>
    </div>
    <hot-recommend-item v-for="hotRecommend in hotRecommends" :key="hotRecommend.id" :itemData="hotRecommend"></hot-recommend-item>
  </div>
</template>
<script>
import HotRecommendItem from './hot-recommend-item';
export default {
  name: "HotRecommend",
  components: {
    HotRecommendItem,
  },
  props: {
    hotRecommends: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
    };
  }
}
</script>
<style lang="less" scoped>
.hot-recommend{
  width: 100%;
  >div.title{
    box-sizing: border-box;
    width: 96%;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    margin-left: 5px;
    >span{
      display: inline-block;
      margin: 8px 0;
    }
  }
}
</style>
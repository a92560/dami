<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-01 20:02:41
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-03 13:22:28
 -->
<template>
  <div class="desc-right">
    <hot-recommend :hotRecommends="hotRecommends"></hot-recommend>
    <browser-history></browser-history>
  </div>
</template>
<script>
import HotRecommend from './hot-recommend';
import BrowserHistory from './browser-history';
export default {
  name: "DescRight",
  components: {
    HotRecommend,
    BrowserHistory,
  },
  data () {
    return {
      hotRecommends: []
    };
  },
  created () {
    this.getCommend();
  },
  methods: {
    async getCommend() {
      // const ret = await this.$http.getDescCommend()
      // console.log("getCommend", ret)
      // if(ret.data && ret.data.length > 0){
      //   this.hotRecommends = ret.data
      // }
    }
  },
}
</script>
<style lang="less" scoped>
.desc-right{
  flex: 1;
  margin-left: 10px;
  background: white;
}
</style>
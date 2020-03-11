<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 23:09:15
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-09 14:56:57
 -->
<template>
  <div>
    <header-top></header-top>
    <search-bar v-if="!($route.meta.isShowSearchBar)"></search-bar>
  </div>
</template>
<script>
import HeaderTop from '@/components/header-top'
import SearchBar from '@/components/search-bar'
export default {
  name: "Header",
  data () {
    return {
    };
  },
  components: {
    HeaderTop,
    SearchBar
  },
}
</script>
<style lang="less" scoped>

</style>
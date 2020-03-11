<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-14 14:48:05
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 15:37:06
 -->
<template>
  <div class="floor-wrapper">
    <!-- 楼层演出信息 -->
    <div
      v-for="floor in floors" 
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :key="floor.itemTypeId">
      <div class="floor">
        <floor-left :floor="floor" :itemType="floor.itemType"></floor-left>
      </div>
      <!-- 热门演出排行 -->
      <div class="rank">
        <rank :itemTypeId="floor.itemTypeId"></rank>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import Rank from '@/components/rank'
import FloorLeft from '@/components/floor-left'
export default {
  name: "Floor",
  components: {
    Rank,
    FloorLeft
  },
  data () {
    return {
      index: 0,
      loading: false,
      floors: null
    };
  },
  mounted () {
    window.addEventListener("scroll", _.throttle(this.handleScroll, 2000));
    // window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
        //获取滚动时的高度
      const scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop //滚动高度
      const clientHeight = document.documentElement.clientHeight || window.screen.availHeight //屏幕可用工作区高度
      const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight //网页可见区域高(包括边线的宽)
      const visibleHeight = 857 + 143 +  (435 * this.index)
      if(!this.loading && scrollTopHeight + clientHeight > visibleHeight){
        this.getFloor(this.index)
        // console.log(`第${this.index}次数据`)
      }
      // console.log("scrollTopHeight:::", scrollTopHeight)
      // console.log("offsetHeight:::", offsetHeight)
      // console.log("clientHeight:::", clientHeight)
      // console.log("visibleHeight:::", visibleHeight)
    },
    async getFloor(index){
      if(index >= 4){
        return 
      }
      this.loading = true
      const ret = await this.$http.getFloorItems({data: {index}})
      if(index === 0){
        this.index ++ 
        this.loading = false
        this.floors = [ret.data]
      }else {
        this.index ++ 
        this.loading = false
        this.floors.push(ret.data)
      }
      
      
      
    }
  },
}
</script>
<style lang="less" scoped>
.floor-wrapper{
  margin-top: 30px;
  width: 100%;
  >div{
    margin-bottom: 30px;
    width: 100%;
    display: flex;
  }
  .floor{
    flex: 1;
    background: #FFF;
    padding: 20px;
  }
  .rank{
    width: 278px;
    background: #FFF;
    margin-left: 25px;
    padding: 10px 20px 0;
  }
}

</style>
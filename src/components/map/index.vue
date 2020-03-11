<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-29 09:53:39
 * @LastEditors  : Darren
 * @LastEditTime : 2020-01-30 19:27:45
 -->
<template>
  <div id="map">
  </div>
</template>
<script>
export default {
  name: "Map",
  props: {
    mapData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    };
  },
  methods: {
    createMap (mapData) {
      /* eslint-disable */
      // 创建Map实例
      this.map = new BMap.Map("map")
      // 初始化地图,设置中心点坐标和地图级别
      var point = new BMap.Point(mapData[0], mapData[1]);
      this.map.centerAndZoom(point, 15); 
      //添加地图类型控件
      this.map.addControl(new BMap.MapTypeControl({
        mapTypes:[BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      }))
      // 设置地图显示的城市 此项是必须设置的
      //开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true)
      /* eslint-enable */
    }
  },
  mounted(){
    this.createMap(this.mapData)
  },
  watch: {
    mapData(newValue, oldValue) {
      this.createMap(newValue)
    }
  },
}
</script>
<style lang="less" scoped>
#map{
  height: 350px;
  width: 100%;
}
</style>
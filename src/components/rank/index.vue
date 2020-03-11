<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-14 14:47:35
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 13:26:56
 -->
<template>
  <div class="floor-right">
    <p class="see-all">查看全部&nbsp;>></p>
    <p class="hot-rank">热门演出排行</p>
    <ul>
      <li v-for="(rank, index) in ranks" :key="rank.id">
        <span :class="[{'active': index < 3}, 'floor-index']">{{index + 1}}</span>
        <span>{{rank.itemName}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Rank",
  data () {
    return {
      ranks: [
        {
          "id": "820000198807057833",
          "itemName": "意劳义次育任派石发设新元积之集因新部。",
          "areaId": "820000198807057833",
          "areaName": "兰州市"
        },
        {
          "id": "340000199004032835",
          "itemName": "起五西自精样容将出分科争院如。",
          "areaId": "340000199004032835",
          "areaName": "周口市"
        },
        {
          "id": "450000197404087831",
          "itemName": "重采话风员千团队各式治前打形里比满。",
          "areaId": "450000197404087831",
          "areaName": "重庆市"
        },
        {
          "id": "510000197406270396",
          "itemName": "争用易离算心组少省保派别率清。",
          "areaId": "510000197406270396",
          "areaName": "连云港市"
        },
        {
          "id": "210000201204165465",
          "itemName": "了难算派了得运这包面不山金。",
          "areaId": "210000201204165465",
          "areaName": "天津市"
        },
        {
          "id": "130000201403255674",
          "itemName": "九用或照照这上中选无资理革道东。",
          "areaId": "130000201403255674",
          "areaName": "铁岭市"
        },
        {
          "id": "640000199601230435",
          "itemName": "收想子第山周温接段低真东商国个号引。",
          "areaId": "640000199601230435",
          "areaName": "宜春市"
        },
        {
          "id": "430000201305289249",
          "itemName": "学整社六阶青儿权山员原省号当文法运。",
          "areaId": "430000201305289249",
          "areaName": "廊坊市"
        },
        {
          "id": "500000198302207846",
          "itemName": "于研示品开得感织位级东可县。",
          "areaId": "500000198302207846",
          "areaName": "临汾市"
        },
        {
          "id": "510000200105174864",
          "itemName": "组决党织别类拉信什华里教高命门华。",
          "areaId": "510000200105174864",
          "areaName": "唐山市"
        }
      ]
    };
  },
  props: {
    itemTypeId: {
      type: String,
      default: ""
    },
  },
}
</script>
<style lang="less" scoped>
.floor-right{
  .see-all{
    text-align: right;
    color: #1b1b1b;
    font-size: 10px;
    cursor: pointer;
  }

  .hot-rank{
    padding: 15px 0;
    font-size: 13px;
    color: #495060;
  }

  ul{
    margin-left: 5px;
    > li{
      padding: 10px 0;
      height: 12px;
      span.floor-index{
        display: inline-block;
        width: 16px;
        height: 12px;
        font-size: 10px;
        line-height: 12px;
        text-align: center;
        color: white;
        background: #808080;
        margin-right: 5px;
        &.active{
          background: #ff3c1b;
        }
      }
      span{
        cursor: pointer;
      }
    }
  } 
  
}
</style>
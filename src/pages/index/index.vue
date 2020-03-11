<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-11 23:18:14
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 13:36:03
 -->
<template>
  <div class="container">
    <div v-if="siderMenus.length > 0" class="clearfix">
      <goods-classify :siderMenus="siderMenus" class="fl"></goods-classify>
      <!-- 横向导航分类 -->
      <div class="classify-inline">
        <ul class="clearfix">
          <li v-for="nav in inlineNavs" :key="nav.id"><router-link :to="{ path: '/multiplePage?page='+nav.id, query: { id: nav.id }}">{{nav.itemName}}</router-link></li>
        </ul>
      </div>
      <!-- 轮播图 -->
      <m-carousel :imgs="imgs"></m-carousel>
    </div>

    <!-- 推荐 -->
    <div class="recommend-sell">
      <div class="tabs">
        <ul class="clearfix">
          <li :class="['tab', 'h5', {'active': selected === '今日推荐'}]" @click="enter">今日推荐</li>
          <li :class="['tab', 'h5', {'active': selected === '即将开售'}]" @click="enter">即将开售</li>
        </ul>
      </div>
      <div class="hot-children">
        <ul class="clearfix" v-show="selected === '今日推荐'">
          <li v-for="recommend in recommends" :key="recommend.id">
            <hot-children :hotItem="recommend" :width="146" :height="191"></hot-children>
          </li>
        </ul>
        <ul class="clearfix" v-show="selected === '即将开售'">
          <li v-for="sell in will_sells" :key="sell.id">
            <hot-children :hotItem="sell" :width="146" :height="191"></hot-children>
          </li>
        </ul>
      </div>
    </div>

    <!-- 楼层演出信息 -->
    <div class="floor-rank">
      <keep-alive>
        <floor></floor>
      </keep-alive>
    </div>
    
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import GoodsClassify from '@/components/goods-classify'
import MCarousel from '@/components/carousel'
import HotChildren from '@/components/hot-children'
import Floor from '@/components/floor'
export default {
  name: "Index",
  components: {
    GoodsClassify,
    MCarousel,
    HotChildren,
    Floor
  },
  data () {
    return {
      /* 左侧导航菜单栏 */
      siderMenus: [],
      /* 首页横向导航菜单栏 */
      inlineNavs: [],
      /* 轮播图数据 */
      imgs: [],
      /* 首页推荐数据 */
      recommends: [],
      /* tab选中的值 */
      selected: "今日推荐",
      /* 首页即将开售数据 */
      will_sells: [],
      /* 楼层数据 */
      // floors: [
      //   {
      //     "index": 1,
      //     "itemTypeName": "戏剧达人",
      //     "itemTypeId": "410000198903234207",
      //     "items": [
      //       {
      //         "id": "510000199703043834",
      //         "itemName": "已报次格后清个油空风金革十。",
      //         "areaId": 100,
      //         "areaName": "北京市",
      //         "address": "贵州省 黔西南布依族苗族自治州",
      //         "startDate": "2011-11-18",
      //         "endDate": "1971-06-26",
      //         "imgUrl": "/img/big4.jpg",
      //         "minPrice": 808
      //       },
      //       {
      //         "id": "540000197901218646",
      //         "itemName": "次权群几商层能器况府将长口革。",
      //         "areaId": 100,
      //         "areaName": "汉中市",
      //         "address": "福建省 厦门市",
      //         "startDate": "1972-08-17",
      //         "endDate": "1996-06-04",
      //         "imgUrl": "/img/cardimg1.jpg",
      //         "minPrice": 547
      //       },
      //       {
      //         "id": "450000198406085084",
      //         "itemName": "原活后听东表离精科者情物高便机适整。",
      //         "areaId": 100,
      //         "areaName": "佳木斯市",
      //         "address": "陕西省 咸阳市",
      //         "startDate": "2009-09-18",
      //         "endDate": "2013-11-28",
      //         "imgUrl": "/img/cardimg3.jpg",
      //         "minPrice": 396
      //       },
      //       {
      //         "id": "500000201407085966",
      //         "itemName": "整经律装率王院主成与建了比响去收。",
      //         "areaId": 100,
      //         "areaName": "晋中市",
      //         "address": "台湾 南投县",
      //         "startDate": "2013-10-17",
      //         "endDate": "2012-11-02",
      //         "imgUrl": "/img/cardimg6.jpg",
      //         "minPrice": 146
      //       },
      //       {
      //         "id": "130000199008158145",
      //         "itemName": "七革再光院展事眼志二斗往日号。",
      //         "areaId": 100,
      //         "areaName": "肇庆市",
      //         "address": "广东省 珠海市",
      //         "startDate": "1984-09-17",
      //         "endDate": "2005-10-14",
      //         "imgUrl": "/img/cardimg5.jpg",
      //         "minPrice": 763
      //       }
      //     ]
      //   },
      //   {
      //     "index": 2,
      //     "itemTypeName": "体育赛事",
      //     "itemTypeId": "610000200412237187",
      //     "items": [
      //       {
      //         "id": "220000198908284128",
      //         "itemName": "须众容干金又做太部亲增他水技进和国力。",
      //         "areaId": 100,
      //         "areaName": "楚雄彝族自治州",
      //         "address": "福建省 南平市",
      //         "startDate": "1974-09-24",
      //         "endDate": "1984-08-17",
      //         "imgUrl": "/img/big5.jpg",
      //         "minPrice": 199
      //       },
      //       {
      //         "id": "820000200201141272",
      //         "itemName": "车反亲圆决共油难我制写的清建往示。",
      //         "areaId": 100,
      //         "areaName": "银川市",
      //         "address": "吉林省 白城市",
      //         "startDate": "2006-10-01",
      //         "endDate": "1988-02-15",
      //         "imgUrl": "/img/cardimg6.jpg",
      //         "minPrice": 670
      //       },
      //       {
      //         "id": "540000201802105303",
      //         "itemName": "值名路直段并每车造他天又利收维严。",
      //         "areaId": 100,
      //         "areaName": "莆田市",
      //         "address": "澳门特别行政区 离岛",
      //         "startDate": "1985-04-24",
      //         "endDate": "1983-09-28",
      //         "imgUrl": "/img/cardimg3.jpg",
      //         "minPrice": 201
      //       },
      //       {
      //         "id": "110000198903032137",
      //         "itemName": "片成现除手带利铁世却向斯叫万观什消两。",
      //         "areaId": 100,
      //         "areaName": "茂名市",
      //         "address": "澳门特别行政区 澳门半岛",
      //         "startDate": "1973-10-28",
      //         "endDate": "2001-04-27",
      //         "imgUrl": "/img/cardimg4.jpg",
      //         "minPrice": 543
      //       },
      //       {
      //         "id": "640000200403161171",
      //         "itemName": "员例金料素特工劳斯性必响的满快据值。",
      //         "areaId": 100,
      //         "areaName": "南平市",
      //         "address": "澳门特别行政区 澳门半岛",
      //         "startDate": "2012-04-27",
      //         "endDate": "2014-01-16",
      //         "imgUrl": "/img/cardimg5.jpg",
      //         "minPrice": 103
      //       }
      //     ]
      //   },
      //   {
      //     "index": 3,
      //     "itemTypeName": "舞蹈古典",
      //     "itemTypeId": "130000198408073381",
      //     "items": [
      //       {
      //         "id": "35000019741004974X",
      //         "itemName": "商当同区量单建验外术基便万。",
      //         "areaId": 100,
      //         "areaName": "湖州市",
      //         "address": "江苏省 南京市",
      //         "startDate": "1999-02-11",
      //         "endDate": "2014-08-23",
      //         "imgUrl": "/img/big1.jpg",
      //         "minPrice": 480
      //       },
      //       {
      //         "id": "230000198808233747",
      //         "itemName": "条影农干么这受六太向才好连。",
      //         "areaId": 100,
      //         "areaName": "孝感市",
      //         "address": "重庆 重庆市",
      //         "startDate": "1988-08-27",
      //         "endDate": "1975-11-11",
      //         "imgUrl": "/img/cardimg2.jpg",
      //         "minPrice": 986
      //       },
      //       {
      //         "id": "370000197904071430",
      //         "itemName": "价验万么识斯程动人农立交影备龙始是。",
      //         "areaId": 100,
      //         "areaName": "吉林市",
      //         "address": "四川省 内江市",
      //         "startDate": "1985-12-21",
      //         "endDate": "2002-09-04",
      //         "imgUrl": "/img/cardimg1.jpg",
      //         "minPrice": 818
      //       },
      //       {
      //         "id": "430000199608265973",
      //         "itemName": "示联增使北今风子边许准强花认长。",
      //         "areaId": 100,
      //         "areaName": "大兴安岭地区",
      //         "address": "山西省 大同市",
      //         "startDate": "1977-05-31",
      //         "endDate": "2002-02-15",
      //         "imgUrl": "/img/cardimg6.jpg",
      //         "minPrice": 804
      //       },
      //       {
      //         "id": "430000197410311154",
      //         "itemName": "采指有红速量济决机则报力集话该。",
      //         "areaId": 100,
      //         "areaName": "苏州市",
      //         "address": "湖南省 常德市",
      //         "startDate": "1991-11-15",
      //         "endDate": "1976-03-12",
      //         "imgUrl": "/img/cardimg5.jpg",
      //         "minPrice": 220
      //       }
      //     ]
      //   },
      //   {
      //     "index": 4,
      //     "itemTypeName": "儿童亲子",
      //     "itemTypeId": "320000199512138501",
      //     "items": [
      //       {
      //         "id": "370000201612178630",
      //         "itemName": "线点联术开委海方题联想于列类往光。",
      //         "areaId": 100,
      //         "areaName": "乌兰察布市",
      //         "address": "云南省 西双版纳傣族自治州",
      //         "startDate": "1970-12-06",
      //         "endDate": "2006-02-15",
      //         "imgUrl": "/img/big2.jpg",
      //         "minPrice": 380
      //       },
      //       {
      //         "id": "140000197803107817",
      //         "itemName": "产县改许毛见强难例事满方。",
      //         "areaId": 100,
      //         "areaName": "岳阳市",
      //         "address": "台湾 新北市",
      //         "startDate": "1994-02-02",
      //         "endDate": "1988-06-23",
      //         "imgUrl": "/img/cardimg2.jpg",
      //         "minPrice": 356
      //       },
      //       {
      //         "id": "630000201910286588",
      //         "itemName": "给军加县解是议称定界并标群。",
      //         "areaId": 100,
      //         "areaName": "赣州市",
      //         "address": "江西省 宜春市",
      //         "startDate": "1994-10-07",
      //         "endDate": "1993-03-14",
      //         "imgUrl": "/img/cardimg3.jpg",
      //         "minPrice": 949
      //       },
      //       {
      //         "id": "440000197312198030",
      //         "itemName": "者放先万主往单共九员为地统全年。",
      //         "areaId": 100,
      //         "areaName": "武汉市",
      //         "address": "浙江省 台州市",
      //         "startDate": "2017-10-16",
      //         "endDate": "1983-04-13",
      //         "imgUrl": "/img/cardimg4.jpg",
      //         "minPrice": 421
      //       },
      //       {
      //         "id": "360000197511061686",
      //         "itemName": "再观内料参产引张重去也而规。",
      //         "areaId": 100,
      //         "areaName": "山南地区",
      //         "address": "陕西省 榆林市",
      //         "startDate": "2010-01-30",
      //         "endDate": "2016-07-18",
      //         "imgUrl": "/img/cardimg5.jpg",
      //         "minPrice": 795
      //       }
      //     ]
      //   },
      //   {
      //     "index": 5,
      //     "itemTypeName": "摇滚在路上",
      //     "itemTypeId": "630000199511287372",
      //     "items": [
      //       {
      //         "id": "64000019810206524X",
      //         "itemName": "里众研间级复型格石称始民把美白。",
      //         "areaId": 100,
      //         "areaName": "淮北市",
      //         "address": "广西壮族自治区 桂林市",
      //         "startDate": "2000-09-13",
      //         "endDate": "2010-10-31",
      //         "imgUrl": "/img/big3.jpg",
      //         "minPrice": 424
      //       },
      //       {
      //         "id": "230000200205041295",
      //         "itemName": "院无志月极文样产开想前满许。",
      //         "areaId": 100,
      //         "areaName": "张家口市",
      //         "address": "甘肃省 金昌市",
      //         "startDate": "1987-08-21",
      //         "endDate": "2002-02-18",
      //         "imgUrl": "/img/cardimg4.jpg",
      //         "minPrice": 360
      //       },
      //       {
      //         "id": "820000198503264470",
      //         "itemName": "中重流经工战低问大复率人型状线。",
      //         "areaId": 100,
      //         "areaName": "齐齐哈尔市",
      //         "address": "甘肃省 嘉峪关市",
      //         "startDate": "1977-03-27",
      //         "endDate": "2009-03-15",
      //         "imgUrl": "/img/cardimg6.jpg",
      //         "minPrice": 439
      //       },
      //       {
      //         "id": "620000197202281822",
      //         "itemName": "好开统半老工动给便事对新思很。",
      //         "areaId": 100,
      //         "areaName": "黑河市",
      //         "address": "江西省 宜春市",
      //         "startDate": "2007-03-31",
      //         "endDate": "1999-03-04",
      //         "imgUrl": "/img/cardimg1.jpg",
      //         "minPrice": 647
      //       },
      //       {
      //         "id": "450000200705122615",
      //         "itemName": "非导你条利眼也规省手加习把机只。",
      //         "areaId": 100,
      //         "areaName": "邵阳市",
      //         "address": "湖北省 恩施土家族苗族自治州",
      //         "startDate": "1992-02-09",
      //         "endDate": "1991-03-28",
      //         "imgUrl": "/img/cardimg5.jpg",
      //         "minPrice": 419
      //       }
      //     ]
      //   }
      // ]
      
    };
  },
  async mounted(){
    /* 获取首页商品分类导航 */
    
    let ret = await this.$http.getNavs()
    if(ret){
      this.siderMenus = ret.data
      this.inlineNavs = ret.data.map(nav => {
        return {
          itemName: nav.itemType,
          id: nav._id
        }
      }).slice(0, 5)

      let itemRet = await this.$http.getIndexItem()
      this.imgs = itemRet.data.map(nav => {
        return {
          itemName: nav.itemName,
          id: nav.itemType1Id,
          minPrice: nav.minPrice,
          imgUrl: nav.imgUrl
        }
      }).slice(0, 4)

      this.recommends = itemRet.data.map(nav => {
        return {
          itemName: nav.itemName,
          _id: nav._id,
          minPrice: nav.minPrice,
          imgUrl: nav.imgUrl
        }
      }).sort((a, b) => b.minPrice - a.minPrice).slice(0, 6)

      this.will_sells = itemRet.data.map(nav => {
        return {
          itemName: nav.itemName,
          _id: nav._id,
          minPrice: nav.minPrice,
          imgUrl: nav.imgUrl
        }
      }).sort((a, b) => a.minPrice - b.minPrice).slice(0, 6)
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    /* 点击切换数据 */
    enter(e) {
      let selected = e.target.innerText
      if(e.target.innerText){
        // if(selected === "今日推荐" && this.recommends.length <= 0){
        //   this.getRecommendData()
        // }
        // if(selected === "即将开售" && this.will_sells.length <= 0){
        //   this.getSellData()
        // }
        this.selected = e.target.innerText
      }else{
        this.selected = "今日推荐"
      }
    },
    async getRecommendData(){
      const data = await this.$http.getIndexRecommend()
      if(data){
        this.recommends = data.data
      }
    },
    async getSellData(){
      const data = await this.$http.getIndexSell()
      if(data){
        this.will_sells = data.data
      }
    }
  },
  
}
</script>
<style lang="less" scoped>
  .classify-inline{
    margin-left: 202px;
    position: absolute;
    background: #FFF;
    width: 998px;
    height: 50px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    z-index: 2;
    ul > li{
      float: left;
      padding: 0 25px;
      &:nth-child(1){
        margin-left: 15px;
      }
      a{
        font-size: 14px;
        line-height: 50px;
        color: #adadad;
        &:hover{
          color: @HoverC;
        }
      }
    }
  }

  .recommend-sell{
    margin-top: 30px;
    background: #ffffff;
    padding: 10px 0 30px 20px;
    .tabs{
      ul{
        /* 为了让2px的border遮住 */
        height: 45px;
        border-bottom: 1px solid #dddee1;
        .tab{
          height: 24px;
          line-height: 20px;
          padding: 10px 15px;
          float: left;
          cursor: pointer;
          &.active{
            border-bottom: 2px solid @HoverC;
          }
          &:hover{
            color: #ff3c1b;
          }
        }
      }
    }

    .hot-children{
      ul{
        width: 100%;
        margin-top: 20px;
        >li{
          float: left;
          width: 16.6%;
          padding: 10px 5px 0;
          box-sizing: border-box;
        }
      }
    }
  }

  .floor-rank{
    width: 1200px;
  }
</style>
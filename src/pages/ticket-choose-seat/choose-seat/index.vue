<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 10:02:38
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-06 10:03:02
 -->
<template>
  <div class="seat-wrapper">
    <div id="seatMap" :class="'choose-seat-body ' + chartsSeatArea.join('')">
      <div
        class="seat-charts-row"
        v-for="(item, x) in seatArray"
        :style="'width:' + getItems(item).length * 25 + 'px;'"
        :key="x"
      >
        <!-- "_____aaaaa_____aaaa_____aaaa____" -->
        <div
          v-for="(subItem, y) in getItems(item)"
          :class="
            subItem != '_' && seatData[x + 1 + '_' + (y + 1)] // 已经售出的位置
              ? 'seat-charts-cells seat-gray-' + subItem
              : subItem != '_'
              ? // 还能选择的位置
                'seat-charts-spaces seat-area-' + subItem
              : // 空位
                'seat-charts-spaces'
          "
          :key="y"
        >
          <!-- 已经售出的 -->
          <div
            v-if="subItem != '_' && seatData[x + 1 + '_' + (y + 1)]"
            :id="x + 1 + '_' + (y + 1)"
            :ref="x + 1 + '_' + (y + 1)"
            :class="'seat-charts-cell iconfont icon-zuowei-yishou'"
          >
            <!-- <Tooltip placement="top">
              &nbsp; &nbsp;
              <div slot="content" style="z-index:10000;">
                <p>座位：{{(x+1)}}排{{(y+1)}}号</p>
                <p>楼层：剧场</p>
                <p>看台：{{adress}}</p>
                <p style="text-transform: uppercase;">等级：{{seatLevelPrice[subItem.toLocaleUpperCase()]}} {{subItem}}区</p>
                <p>票价：{{seatLevelPrice[subItem.toLocaleUpperCase()]}} 元</p>
                <p>状态：{{seatData[(x+1)+'_'+(y+1)].status==1?'可售':'不可售'}}</p>
              </div>
            </Tooltip> -->
          </div>
          <!-- 未被选择的 -->
          <!-- <el-tooltip placement="top">
            <div slot="content" style="z-index:10000;">
              <p>座位：{{(x+1)}}排{{(y+1)}}号</p>
              <p>楼层：剧场</p>
              <p>看台：{{address}}</p>
              <p style="text-transform: uppercase;">等级： {{subItem}}区</p>
              <p>票价：{{seatLevelPrice[subItem.toLocaleUpperCase()]}} 元</p>
            </div>
            <div 
              v-if="subItem!='_' && !seatData[(x+1)+'_'+(y+1)]"
              :id="x+'_'+y" :ref="x+'_'+y"
              @click="clickCell"
              :class="'seat-charts-cell iconfont icon-zuowei-yishou'">
            </div>
          </el-tooltip> -->
          <div
            v-if="subItem != '_' && !seatData[x + 1 + '_' + (y + 1)]"
            :id="( x + 1 ) + '_' + ( y + 1 )"
            :ref="x + '_' + y"
            @click="clickCell"
            :class="'seat-charts-cell iconfont icon-zuowei-yishou'"
          ></div>

          <!-- 空的 -->
          <div
            v-if="subItem == '_'"
            :class="'seat-charts-cell ' + 'seat-charts-' + icons[subItem]"
          ></div>
        </div>
      </div>
      <div class="level-tip">
        <div class="level-up">
          <el-checkbox-group
            v-model="checkList"
            v-for="(item, index) in seatPriceArray"
            :key="index"
            @change="handleCheckBoxChange"
          >
            <div class="level-item">
              <div :class="'price ' + item.areaLevelName">
                ￥{{ item.price }}
              </div>
              <el-checkbox :label="item.areaLevelName + '级'"></el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <div class="level-down">
          <div class="items selected">
            <div class="text">已选</div>
            <div class="iconfont icon-zuoweiyuding"></div>
          </div>
          <div class="items sold">
            <div class="text">已售</div>
            <div class="iconfont icon-zuowei-yishou"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="seat-tip">
      <h1 class="title tc">已选座位[{{ size }}]</h1>
      <ul class="selected-ticket" v-for="item in selectedArray" :key="item.id">
        <selected-ticket-item
          :itemData="item"
          v-show="size > 0"
        ></selected-ticket-item>
      </ul>
      <div @click="handleToBuy" class="pay-btn tc" v-show="size > 0">
        结账：{{ price }}元
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SelectedTicketItem from '../selected-ticket-item'
export default {
  name: 'ChooseSeat',
  data() {
    return {
      checkList: [],
      // 用户选中的
      selectedArray: [],
      icons: {
        a: 'seat-charts-a ',
        b: 'seat-charts-b ',
        c: 'seat-charts-c',
        _: 'space',
      },
      selectedMap: new Map(),
      // seatLevelPrice: (param => {
      // 	let priceMap = new Map()
      // 	for (let i = 0; i < param.length; i++) {
      // 		let item = param[i]
      // 		priceMap[item.areaLevelName] = item.price
      // 	}
      // 	return priceMap
      // })(this.seatPriceArray),
      size: 0,
      price: 0,
      // 已经有人选择了的座位
      // seatData: (param => {
      // 	let seatMap = {}
      // 	for (let i = 0; i < param.length; i++) {
      // 		let item = param[i]
      // 		seatMap[item.x + '_' + item.y] = item
      // 	}
      // 	// console.log(seatMap);
      // 	return seatMap
      // })(this.selectedSeatArray),
      address: '北京大剧院',
    }
  },
  components: {
    SelectedTicketItem,
  },
  props: {
    seatPriceArray: {
      type: Array,
      required: true,
    },
    selectedSeatArray: {
      type: Array,
      required: true,
    },
    seatArray: {
      type: Array,
      required: true,
    },
    itemName: {
      type: String,
      default: '',
    },
  },
  methods: {
    getItems(item) {
      return item.match(/[a-z_]{1}(\[[0-9a-z_]{0,}(,[0-9a-z_ ]+)?\])?/gi)
    },
    getContainerHeight() {
      return 'height:' + this.seatArray.length * 50 + 'px;'
    },
    clickCell(el) {
      // 如果点击了隐藏了的 不算
      Array.from(el.target.parentNode.classList).find(item =>
        /seat-area-(.+)/.test(item)
      )
      let level = RegExp.$1
      if (level) {
        level = level.toUpperCase()
      }

      // 处理隐藏部分
      if (this.checkList.length > 0 && level) {
        if (!this.chartsSeatArea.includes(level)) {
          return
        }
      }
      // 处理座位与选中的座位的转换
      this.toogleClass(el.target, 'active')
      // 得到当前元素ID
      let id = el.target.id
      // 得到选择的座位的等级
      let item = {
        id,
        x: parseInt(id.split('_')[0]) + 1,
        y: parseInt(id.split('_')[1]) + 1,
        areaLevel: level,
        cinemaId: '12',
        status: 0, // 0表示未付款但已选择了的座位
      }
      item.price = this.seatLevelPrice[RegExp.$1.toUpperCase()]
      if (this.selectedMap.get(id)) {
        this.selectedMap.delete(id)
        this.selectedArray = this.selectedArray.filter(item => item.id != id)
      } else {
        this.selectedArray.push(item)
        this.selectedMap.set(id, item)
      }
      // 计算总价
      this.size = this.selectedMap.size
      this.price = 0
      this.selectedMap.forEach((item, i) => {
        this.price += item.price
      })
    },
    hasClass(el, className) {
      let classList = el.classList
      let flag = false
      for (let i = 0; i < classList.length; i++) {
        if (className == classList[i]) {
          flag = true
        }
      }
      return flag
    },
    addClass(el, className) {
      el.classList.add(className)
    },
    removeClass(el, className) {
      el.classList.remove(className)
    },
    toogleClass(el, className) {
      let classList = el.classList
      let flag = this.hasClass(el, className)
      if (flag) {
        /* 
				调用删除操作 需要添加数组样式删除代码，如果调用报错，放开下列代码
				删除数组中的数据信息，仅限字符串 String 类型的数组 
				Array.prototype.indexOf = function(val) { for (var i = 0; i < this.length; i++) { if (this[i] == val) return i; } return -1; };
				Array.prototype.remove = function(val) { var index = this.indexOf(val); if (index > -1) { this.splice(index, 1); } };
				 */
        classList.remove(className)
      } else {
        /* 调用添加操作 */
        classList.add(className)
      }
    },
    // 处理复选框改变
    handleCheckBoxChange(checkList) {
      this.checkList = checkList
    },
    handleToBuy() {
      this.selectedArray = this.selectedArray.map(item => ({
        ...item,
        itemName: this.itemName,
      }))
      this.setSeat(this.selectedArray)
      this.$router.push({
        path: '/orderconfirm',
        query: {
          itemId: this.$route.query.itemId,
          cinemaId: this.$route.query.cinemaId || "101",
        },
      })
    },
    ...mapActions(['setSeat']),
  },
  computed: {
    chartsSeatArea() {
      //"chartsSeat-area-a", "chartsSeat-area-c"
      return this.checkList.map(item => item.substring(0, 1)).sort()
    },
    seatData() {
      let seatMap = {}
      this.selectedSeatArray.forEach(item => {
        if (item.status === 1) {
          seatMap[item.x + '_' + item.y] = item
        }
      })
      return seatMap
    },
    seatLevelPrice() {
      let priceMap = new Map()
      for (let i = 0; i < this.seatPriceArray.length; i++) {
        let item = this.seatPriceArray[i]
        priceMap[item.areaLevelName] = item.price
      }
      return priceMap
    },
  },
  watch: {
    // selectedArray: {
    //   handler(newV) {
    //     this.selectedMap.forEach(function(value, key) {
    //       this.selectedArray.push(value)
    //     })
    //   },
    //   deep: true,
    // },
  },
}
</script>
<style lang="less" scoped>
@top: 50px;
@red: #d8000b;
.b-transparent {
  .seat-area-b {
    .iconfont.icon-zuowei-yishou {
      color: transparent !important;
    }
  }
}
.c-transparent {
  .seat-area-c {
    .iconfont.icon-zuowei-yishou {
      color: transparent !important;
    }
  }
}
.a-transparent {
  .seat-area-a {
    .iconfont.icon-zuowei-yishou {
      color: transparent !important;
    }
  }
}
.bread-crumb {
  margin-top: 20px;
}
.seat-wrapper {
  display: flex;
  .seat-tip {
    width: 200px;
    .title {
      width: 100%;
      height: 22px;
      line-height: 22px;
      background: #dddddd;
    }
    .pay-btn {
      margin: 8px auto;
      width: 60%;
      background: @HoverC;
      height: 30px;
      line-height: 30px;
      color: white;
      cursor: pointer;
      border-radius: 4px;
    }
  }
}
.seat-body {
  width: 100%;
  /* .seat-header.steps{
    display: flex;
    margin-top: 15px;
    .step{
      width: 33.4%;
      background: #444444;
      color: white;
      text-align: center;
      height: 40px;
      line-height: 40px;
      position: relative;
      &.active{
        background: @HoverC;
        &:before{
          left: 0;
          content: "";
          position: absolute;
          border: 20px solid #444444;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(180deg);
        }
        &:after{
          right: -40px;
          content: "";
          position: absolute;
          border: 20px solid @HoverC;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(180deg);
          z-index: 2;
        }
      }
    }
  } */
}
.choose-seat-body {
  padding-top: 50px;
  width: 1000px;
  position: relative;
  margin-bottom: 65px;
  background: white;
  &.AB {
    .c-transparent;
  }
  &.AC {
    .b-transparent;
  }
  &.BC {
    .a-transparent;
  }
  &.A {
    .b-transparent;
    .c-transparent;
  }
  &.B {
    .a-transparent;
    .c-transparent;
  }
  &.C {
    .a-transparent;
    .b-transparent;
  }
  .seat-charts-row {
    margin: auto;
    height: 50px;
    .seat-charts-cell {
      height: 16px;
      width: 19px;
      margin: 1px 0.5px 0.5px 1px;
      float: left;
      text-align: center;
      outline: none;
      font-size: 13px;
      line-height: 16px;
      color: blue;
      position: relative;
      &.iconfont {
        color: grey;
        font-size: 16px;
      }
      &.iconfont.active:before {
        content: '\e602';
      }
      &.iconfont.active {
        color: rgb(0, 255, 0) !important;
        position: relative;
        top: -2px;
      }
    }
    .seat-charts-cells,
    .seat-charts-spaces {
      display: inline-block;
      margin: 2px;
    }
    /* .seat-charts-cells:hover {
      .backgroundHover;
    } */
    .seat-area-a {
      .iconfont.icon-zuowei-yishou {
        color: #fd6566;
      }
    }
    .seat-area-b {
      .iconfont.icon-zuowei-yishou {
        color: #fd68a6;
      }
    }
    .seat-area-c {
      .iconfont.icon-zuowei-yishou {
        color: #65a9fd;
      }
    }
  }

  .seatCharts-row:after {
    clear: both;
  }

  .level-tip {
    position: absolute;
    left: 0;
    bottom: -65px;
    width: 140px;
    height: 130px;
    background: #fff;
    .level-up {
      border-bottom: 1px solid #ccc;
      > .el-checkbox-group {
        display: flex;
        flex-direction: column;
        .level-item {
          display: flex;
          padding: 5px 8px;
          align-items: center;
          .price {
            flex: 1;
            text-align: center;
            margin: 0 8px;
            padding: 2px 7px;
            &.A {
              background: #fd6566;
            }
            &.B {
              background: #fd68a6;
            }
            &.C {
              background: #65a9fd;
            }
          }
          .el-checkbox {
            width: 50px;
          }
        }
      }
    }
    .level-down {
      display: flex;
      .items {
        display: flex;
        width: 50%;
        padding: 10px;
        box-sizing: border-box;
        align-items: center;
      }
      .selected {
        .iconfont {
          margin-left: 6px;
          font-size: 13px;
          color: rgb(0, 255, 0);
        }
      }
      .sold {
        .iconfont {
          color: grey;
          margin-left: 6px;
          font-size: 12px;
        }
      }
    }
  }
}
.seat-wrapper {
  display: flex;
  .seat-tip {
    width: 200px;
    .title {
      width: 100%;
      height: 22px;
      line-height: 22px;
      background: #dddddd;
    }
    .pay-btn {
      margin: 8px auto;
      width: 60%;
      background: @HoverC;
      height: 30px;
      line-height: 30px;
      color: white;
      cursor: pointer;
      border-radius: 4px;
    }
  }
}
.seat-body {
  width: 100%;
  /* .seat-header.steps{
    display: flex;
    margin-top: 15px;
    .step{
      width: 33.4%;
      background: #444444;
      color: white;
      text-align: center;
      height: 40px;
      line-height: 40px;
      position: relative;
      &.active{
        background: @HoverC;
        &:before{
          left: 0;
          content: "";
          position: absolute;
          border: 20px solid #444444;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(180deg);
        }
        &:after{
          right: -40px;
          content: "";
          position: absolute;
          border: 20px solid @HoverC;
          border-top-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(180deg);
          z-index: 2;
        }
      }
    }
  } */
}
.choose-seat-body {
  padding-top: 50px;
  width: 1000px;
  position: relative;
  margin-bottom: 65px;
  background: white;
  &.AB {
    .c-transparent;
  }
  &.AC {
    .b-transparent;
  }
  &.BC {
    .a-transparent;
  }
  &.A {
    .b-transparent;
    .c-transparent;
  }
  &.B {
    .a-transparent;
    .c-transparent;
  }
  &.C {
    .a-transparent;
    .b-transparent;
  }
  .seat-charts-row {
    margin: auto;
    height: 50px;
    .seat-charts-cell {
      height: 16px;
      width: 19px;
      margin: 1px 0.5px 0.5px 1px;
      float: left;
      text-align: center;
      outline: none;
      font-size: 13px;
      line-height: 16px;
      color: blue;
      position: relative;
      &.iconfont {
        color: grey;
        font-size: 16px;
      }
      &.iconfont.active:before {
        content: '\e602';
      }
      &.iconfont.active {
        color: rgb(0, 255, 0) !important;
        position: relative;
        top: -2px;
      }
    }
    .seat-charts-cells,
    .seat-charts-spaces {
      display: inline-block;
      margin: 2px;
    }
    /* .seat-charts-cells:hover {
      .backgroundHover;
    } */
    .seat-area-a {
      .iconfont.icon-zuowei-yishou {
        color: #fd6566;
      }
    }
    .seat-area-b {
      .iconfont.icon-zuowei-yishou {
        color: #fd68a6;
      }
    }
    .seat-area-c {
      .iconfont.icon-zuowei-yishou {
        color: #65a9fd;
      }
    }
  }

  .seatCharts-row:after {
    clear: both;
  }

  .level-tip {
    position: absolute;
    left: 0;
    bottom: -65px;
    width: 140px;
    height: 130px;
    background: #fff;
    .level-up {
      border-bottom: 1px solid #ccc;
      > .el-checkbox-group {
        display: flex;
        flex-direction: column;
        .level-item {
          display: flex;
          padding: 5px 8px;
          align-items: center;
          .price {
            flex: 1;
            text-align: center;
            margin: 0 8px;
            padding: 2px 7px;
            &.A {
              background: #fd6566;
            }
            &.B {
              background: #fd68a6;
            }
            &.C {
              background: #65a9fd;
            }
          }
          .el-checkbox {
            width: 50px;
          }
        }
      }
    }
    .level-down {
      display: flex;
      .items {
        display: flex;
        width: 50%;
        padding: 10px;
        box-sizing: border-box;
        align-items: center;
      }
      .selected {
        .iconfont {
          margin-left: 6px;
          font-size: 13px;
          color: rgb(0, 255, 0);
        }
      }
      .sold {
        .iconfont {
          color: grey;
          margin-left: 6px;
          font-size: 12px;
        }
      }
    }
  }
}
@top: 50px;
@red: #d8000b;
.b-transparent {
  .seat-area-b {
    .iconfont.icon-zuowei-yishou {
      color: transparent !important;
    }
  }
}
.c-transparent {
  .seat-area-c {
    .iconfont.icon-zuowei-yishou {
      color: transparent !important;
    }
  }
}
.a-transparent {
  .seat-area-a {
    .iconfont.icon-zuowei-yishou {
      color: transparent !important;
    }
  }
}
</style>

<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-03 15:57:08
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 15:22:15
 -->
<template>
  <div class="container clearfix">
    <div class="bread-crumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{ root }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ itemPojo.areaName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ itemPojo.itemType1Name }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="itemPojo.itemType2Name">{{
          itemPojo.itemType2Name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'name' }">{{
          itemPojo.itemName
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="seat-body">
      <m-bread-crumb
        :breads="['1&nbsp;选择区域', '2&nbsp;选择座位', '3&nbsp;结账付钱']"
        activeIndex="1"
      ></m-bread-crumb>
      <!-- <div class="seat-header steps">
        <div class="step">1&nbsp;选择区域</div>
        <div class="step active">2&nbsp;选择座位</div>
        <div class="step">3&nbsp;结账付钱</div>
      </div> -->
    </div>
    <!-- x 为排数 -->
    <!-- y 为列数 -->

    <ChooseSeat
      :seatPriceArray="seatPriceArray"
      :seatArray="seatArray"
      :selectedSeatArray="selectedSeatArray"
      :itemName="$route.query.itemName"
    >
    </ChooseSeat>
  </div>
</template>
<script>
import SelectedTicketItem from './selected-ticket-item'
import MBreadCrumb from '@/components/bread-crumb'
import ChooseSeat from './choose-seat'
export default {
  name: 'TicketChooseSeat',
  components: {
    SelectedTicketItem,
    MBreadCrumb,
    ChooseSeat,
  },
  data() {
    return {
      root: '大觅',
      itemPojo: {
        areaName: this.$route.query.cityName,
        itemType1Name: this.$route.query.itemType1Name,
        itemType2Name: this.$route.query.itemType2Name,
        itemName: this.$route.query.itemName,
      },
      /* containerHeight: (() => {
        console.log("container ", this.seatArray.length)
        let headHeight = 50;
        let padding = 130;
        let rowHight = this.seatArray.length * 50;
        let endHight = rowHight + padding + headHeight;
        return endHight;
      })(), */
      seatArray: [],
      seatPriceArray: [],
      selectedSeatArray: [],
    }
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
      if (this.checkList.length > 0 && level) {
        if (!this.chartsSeatArea.includes(RegExp.$1.toUpperCase())) {
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
        status: 1,
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
      this.$router.push('/orderconfirm')
    },
    async getSeatList() {
      const ret = await this.$http.getChooseSeatSeatList({
        data: { id: this.$route.query.id },
      })
      if (ret) {
        const { seatArray, seatPriceArray, selectedSeatArray, id } = ret.data[0]
        console.log('{ seatArray, seatPriceArray, selectedSeatArray, id }', {
          seatArray,
          seatPriceArray,
          selectedSeatArray,
          id,
        })
        this.seatArray = seatArray
        this.seatPriceArray = seatPriceArray
        this.selectedSeatArray = selectedSeatArray
      }
    },
  },
  mounted() {
    this.getSeatList()
  },
  computed: {
    chartsSeatArea() {
      //"chartsSeat-area-a", "chartsSeat-area-c"
      return this.checkList.map(item => item.substring(0, 1)).sort()
    },
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
</style>

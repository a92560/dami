<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 12:00:22
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-06 17:31:10
 -->
<template>
  <div class="container order-confirm-wrapper">
    <m-bread-crumb
      :breads="[
        '1&nbsp;选择商品',
        '2&nbsp;确认订单信息',
        '3&nbsp;支付订单',
        '4&nbsp;收取商品',
      ]"
      activeIndex="1"
    ></m-bread-crumb>
    <order-item title="实名证件信息">
      <div class="item-body">
        购票人：
        <span class="button tc" @click="handleShowBuyers">选择购票人</span>
        <span
          v-for="people in filterTicketBuyers"
          v-show="filterTicketBuyers.length > 0 && !showSelectedBuyer"
          style="margin-left: 15px"
          >{{ people.name }}</span
        >
      </div>
    </order-item>
    <el-dialog title="选择购票人" :visible.sync="showSelectedBuyer">
      <el-checkbox-group
        v-model="selectedBuyers"
        @change="handleBuyerChange"
        :max="this.seatTableData.length"
      >
        <el-checkbox
          v-for="buyer in ticketBuyers"
          :label="buyer._id"
          :key="buyer._id"
          >{{ buyer.name }}</el-checkbox
        >
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSureBuyers">确 定</el-button>
      </div>
    </el-dialog>
    <order-item title="选择付款方式">
      <div class="item-body pay">
        <input type="radio" checked="checked" />
        <span>网上付款</span>
      </div>
    </order-item>
    <order-item title="商品清单">
      <div class="item-body goods-list">
        <order-table
          :data="seatTableData"
          :border="true"
          :columns="columns"
        ></order-table>
      </div>
    </order-item>
    <order-item title="我要开发票">
      <div class="item-body bill">
        <div class="selection">
          <span
            :class="['tc', { active: selectedBill === 'company' }]"
            @click="handleSelectBill"
            >公司</span
          >
          <span
            :class="['tc', { active: selectedBill === 'personal' }]"
            @click="handleSelectBill"
            >个人</span
          >
        </div>
        <div class="bill-info">
          <el-form
            ref="billForm"
            :model="billForm"
            label-width="80px"
            class="bill-form"
          >
            <el-form-item label="公司抬头">
              <el-input
                v-model="billForm.companyName"
                style="width:40%"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司税号">
              <el-input
                v-model="billForm.taxNumber"
                style="width:40%"
              ></el-input>
            </el-form-item>
          </el-form>
          <button class="sure-btn">确认发票信息</button>
        </div>
      </div>
    </order-item>
    <div class="insurance">
      <p class="row">
        <label class="u-checkbox">
          <input type="checkbox" @click="clickInsurance" />
          <span class="txt"
            >购买“安心订票保险”，本单保费金额：20.00 元（一人）</span
          >
        </label>
      </p>
      <p class="row">
        查看
        <a href="javascript:;">保险服务说明</a> 和
        <a href="javascript:;">《安心订票保险条款》</a>
      </p>
      <p class="row">购买保险，请填写真实姓名</p>
      <p class="row">
        商品金额：
        <span class="cell">¥{{ totalPrice }}</span>
      </p>
      <p v-show="insuranceFlag" class="row">
        商品保险：
        <span class="cell"> <i>+</i> ¥{{ payMount - totalPrice }}.00</span>
      </p>
    </div>
    <div class="agree">
      <p class="row txt">
        待支付总额：
        <span class="amount">¥ {{ this.payMount }}</span>
      </p>
      <p class="row">
        <label class="u-checkbox">
          <el-popover
            placement="bottom"
            width="60"
            trigger="manual"
            content="请先勾选协议"
            visible-arrow
            v-model="tipVisible"
          >
          </el-popover>
          <input type="checkbox" @click="clickAgree" />
          <span class="txt"
            >我已阅读并同意
            <el-tooltip placement="top">
              <a href="javascript;;">《订购服务条款》</a>
              <div slot="content">
                <p>
                  本服务条款适用于所有登陆大觅网/中国票务在线的用户，包括个人用户、团体用户、单位用户等。
                </p>
                <p>大觅网/中国票务在线，以下简称“本网站”。</p>
                <p>
                  登陆大觅网/中国票务在线的用户，包括个人用户、团体用户、单位用户。以下统称“用户”。
                </p>
              </div>
            </el-tooltip>
            <el-tooltip placement="top">
              <a href="javascript;;">《退换货约定》</a>
              <div slot="content">
                <p>
                  （1）
                  符合退、换货时间规定（依据：主办方通知的因演出取消/延期安排的退票时间、转场时间段）；
                </p>
                <p>（2） 需将票品完好无损退回；</p>
                <p>（3） 如开发票，需将发票完好无损退回；</p>
              </div>
            </el-tooltip>
            <el-tooltip placement="top">
              <a href="javascript;;">《退款约定》</a>
              <div slot="content">
                <p>
                  1、因不可抗力因素导致演出取消或延期，大觅网会主动与您确认变更或退款事宜，不收取任何手续费。
                </p>
                <p>
                  2、办理退款或变更要求需符合时间规定（依据：主办方通知的因演出取消/延期安排的退款时间、转场时间段）。
                </p>
              </div>
            </el-tooltip>
          </span>
        </label>
      </p>
      <p class="row">同意“票品为不记名凭证，请您妥善保管，遗失不补”</p>
      <button class="tc" type="primary" @click="submitOrder">
        同意以上协议并提交订单
      </button>
    </div>
  </div>
</template>
<script>
import MBreadCrumb from '@/components/bread-crumb'
import OrderItem from './order-item'
import OrderTable from '@/components/table'
import { SEAT_ARRAY_KEY } from '@/config'
import { mapState } from 'vuex'
export default {
  name: 'OrderConfirm',
  components: {
    MBreadCrumb,
    OrderItem,
    OrderTable,
  },
  data() {
    return {
      // query参数传过来的
      seatData: [],
      seatTableData: [],
      columns: [
        {
          title: '商品名称',
          key: 'itemName',
        },
        {
          title: '座位号',
          key: 'seatPosition',
        },
        {
          title: '价格',
          key: 'price',
        },
        {
          title: '数量',
          key: 'num',
        },
        {
          title: '价格小计（元）',
          key: 'price',
        },
      ],
      selectedBill: 'company',
      billForm: {
        companyName: '',
        taxNumber: '',
      },
      insuranceFlag: false, // 是否买保险
      agreeFlag: false, // 是否同意协议
      tipVisible: false,
      showSelectedBuyer: false, // 是否显示选择购票人dialog
      selectedBuyers: [],
      ticketBuyers: [],
    }
  },
  methods: {
    handleSelectBill(e) {
      if (e.target && e.target.innerText === '公司') {
        this.selectedBill = 'company'
      } else if (e.target && e.target.innerText === '个人') {
        this.selectedBill = 'personal'
      }
    },
    clickInsurance() {
      this.insuranceFlag = !this.insuranceFlag
    },
    clickAgree() {
      this.agreeFlag = !this.agreeFlag
    },
    // 提交订单
    async submitOrder() {
      // true表示已经勾选
      // 未勾选
      if (!this.agreeFlag) {
        this.tipVisible = true
        setTimeout(() => {
          this.tipVisible = false
        }, 3000)
      } else if (this.selectedBuyers.length <= 0) {
        this.$message.error('请先选择购票人')
        return
      } else {
        // 处理是否开发票
        let invoiceFlag = false
        let invoiceType = this.selectedBill === 'company' ? 0 : 1
        let { companyName, taxNumber } = this.billForm
        if (companyName && taxNumber) {
          invoiceFlag = true
        }
        const ret = await this.$http.postUserOrder({
          cinemaId: this.$route.query.cinemaId,
          isNeedInvoice: invoiceFlag ? 1 : 0,
          companyName: companyName ? companyName : '',
          invoiceType,
          taxNumber: taxNumber ? taxNumber : '',
          isNeedInsurance: this.insuranceFlag ? 1 : 0,
          linkIds: this.selectedBuyers,
          seatData: this.seatData,
          itemId: this.$route.query.itemId,
          itemName: this.seatTableData && this.seatTableData[0].itemName
        })
        if (ret) {
          let orderId = ret.data[0].orderList._id
          console.log("orderId", orderId)
          if(orderId){
            this.$router.push({
              path: '/paymethod',
              query: {
                orderId,
              },
            })
          }
          
        }
      }
    },
    handleBuyerChange(val) {
      console.log('handleBuyerChange::::::::', val)
      if (val.length >= this.seatTableData.length) {
        this.$message.info('选择的购票人数量已经等于座位数量')
        return
      } else {
        this.selectedBuyers = val
      }
    },
    // 确定提交订单
    handleSureBuyers() {
      this.showSelectedBuyer = false
    },
    async handleShowBuyers() {
      this.showSelectedBuyer = true
      const ret = await this.$http.getOrderTicketBuyerList()
      if (ret && ret.data && ret.data[0]) {
        this.ticketBuyers = ret.data[0].ticketBuyerList
      }
    },
    handleClose() {
      this.selectedBuyers = []
      this.showSelectedBuyer = false
    },
  },
  mounted() {
    const selected =
      (this.seat.length && this.seat) ||
      JSON.parse(localStorage.getItem(SEAT_ARRAY_KEY))
    console.log('selected', selected)
    this.seatData = selected
    this.seatTableData = selected.map(item => {
      return {
        itemName: item.itemName,
        seatPosition: `${item.x}排${item.y}座`,
        price: item.price,
        num: 1,
      }
    })
    console.log('this.$route.query.itemId', this.$route.query.itemId)
  },
  computed: {
    totalPrice() {
      return this.seatTableData.reduce((accumulator, cur) => {
        return accumulator + cur.price
      }, 0)
    },
    payMount() {
      return this.insuranceFlag
        ? this.totalPrice + 20 * this.seatTableData.length
        : this.totalPrice
    },
    filterTicketBuyers() {
      const filterTicketBuyers = this.ticketBuyers.filter(item =>
        this.selectedBuyers.includes(item._id)
      )
      return filterTicketBuyers
    },
    ...mapState({
      seat: state => state.seat.selectedArray,
    }),
  },
}
</script>
<style lang="less">
.el-popover {
  min-width: 100px;
  margin-top: 7px;
  margin-left: 0;
}
.el-popover--plain {
  padding: 10px;
  color: red;
}
.order-confirm-wrapper {
  margin-top: 20px;
  background: #fff;
  padding: 10px 20px 0;
  .item-body {
    padding: 10px 0;
    height: 26px;
    line-height: 26px;
    &.pay {
      display: flex;
      align-items: center;
      > input[type='radio']:checked {
        background-color: @HoverC;
        color: @HoverC;
      }
      > span {
        display: inline-block;
        margin-left: 15px;
      }
    }
    .button {
      display: inline-block;
      height: 26px;
      width: 100px;
      background: @HoverC;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
    &.goods-list {
      height: 100%;
    }
    &.bill {
      height: 100%;
      .selection {
        display: flex;
        > span {
          display: inline-block;
          cursor: pointer;
          width: 60px;
          height: 30px;
          line-height: 30px;
          box-sizing: border-box;
          &.active {
            border-bottom: 1px solid @HoverC;
          }
        }
      }
      .bill-info {
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 20px 0 40px 20px;
        .el-form-item:last-child {
          margin-top: 20px;
        }
        .sure-btn {
          outline: none;
          border: none;
          border-radius: 4px;
          background: @HoverC;
          padding: 10px;
          cursor: pointer;
          color: white;
          font-size: 12px;
          margin: 20px 0 0 10px;
        }
      }
    }
  }
  .insurance {
    border-top: 1px solid #c3c3c3;
    padding-top: 15px;
    height: 91px;
    > p.row {
      text-align: right;
      padding: 3px 0;
      .u-checkbox {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        > input[type='checkbox'] {
          margin-right: 6px;
        }
      }
      > .cell {
        color: @HoverC;
      }
    }
  }
  .agree {
    text-align: right;
    border-top: 1px dotted #c3c3c3;
    padding: 15px 0;
    > p.row {
      padding: 3px 0;
      > .amount {
        color: @HoverC;
      }
      > .u-checkbox {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        > input[type='checkbox'] {
          margin-right: 6px;
        }
      }
    }
    > button {
      margin-top: 12px;
      border: none;
      outline: none;
      background: @HoverC;
      color: white;
      border-radius: 4px;
      padding: 10px 15px;
      cursor: pointer;
    }
  }
}
</style>

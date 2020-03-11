<template>
  <div>
    <OrderItem title="近期订单列表">
      <div class="search-wrapper">
        <div class="select-wrapper">
          <el-select
            v-model="orderType"
            @change="handleOrderTypeChange"
            placeholder="请选择"
          >
            <el-option
              v-for="item in orderTypeOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="orderCreateTime"
            @change="handleTimeChange"
            placeholder="请选择"
          >
            <el-option
              v-for="item in orderCreateTimeOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="keyword-wrapper">
          <el-input
            v-model="keyword"
            placeholder="请输入订单编号、商品名称..."
            class="keyword-input"
          />
          <el-button type="primary" @click="handleToSearch">搜索</el-button>
        </div>
      </div>
      <div class="table-content" style="margin-top: 20px; padding: 10px">
        <MTable
          :columns="orderTableColumns"
          :data="orderData"
          @handleToPay="handleToPay"
          :border="true"
        />
      </div>
    </OrderItem>
  </div>
</template>
<script>
import _ from 'lodash'
import OrderItem from '@/pages/order-confirm/order-item'
import MTable from '@/components/table'
import {
  orderTypeFilterOptions,
  orderCreateTimeFilterOptions,
  orderListTableColumns,
} from '@/config'
export default {
  name: 'OrderList',
  components: {
    OrderItem,
    MTable,
  },
  data() {
    return {
      orderType: '全部订单',
      orderTypeOptions: orderTypeFilterOptions,
      orderCreateTime: '全部',
      orderCreateTimeOptions: orderCreateTimeFilterOptions,
      keyword: '',
      orderTableColumns: orderListTableColumns,
      orderData: [],
      sellTime: '',
    }
  },
  methods: {
    handleOrderTypeChange(val) {
      this.orderType = val
    },
    handleTimeChange(val) {
      let threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
      let oneYearAgo = new Date()
      oneYearAgo.setMonth(oneYearAgo.getMonth() - 12)
      const timeArray = ['', oneYearAgo, threeMonthsAgo]
      this.sellTime = timeArray[parseInt(val)]
    },
    // handleToSearch: _.debounce(async function () {
    //   let { sellTime, keyword, orderType } = this
    //   orderType = orderType === '全部订单' ? '' : orderType
    //   await this.getOrderData(orderType, sellTime, keyword)
    // }, 500),
    async handleToSearch() {
      let { sellTime, keyword, orderType } = this
      orderType = orderType === '全部订单' ? '' : orderType
      await this.getOrderData(orderType, sellTime, keyword)
    },
    async getOrderData(orderType = '', sellTime = '', itemName = '', _id = '') {
      const ret = await this.$http.getOrderList({
        data: { orderType, sellTime, itemName, _id },
      })
      if (ret && ret.data) {
        this.orderData = []
        this.orderData = ret.data.map(item => {
          return {
            sellTime:
              item.orderList.sellTime &&
              this.handleTime(item.orderList.sellTime), // .substring(0, 10),
            itemName:
              item.orderList.itemName ||
              (item.item_docs[0] && item.item_docs[0].itemName),
            insuranceAmount: item.orderList.insuranceAmount || 0,
            totalAmount: item.orderList.totalAmount,
            seat: this.handleChangeSeatData(item.orderList.seatData),
            _id: item.orderList._id,
            invoiceId: item.orderList.invoiceId,
            invoiceType: this.handleInvoice(
              item.invoice_docs[0],
              'invoiceType'
            ),
            companyName: this.handleInvoice(
              item.invoice_docs[0],
              'companyName'
            ),
            taxNumber: this.handleInvoice(item.invoice_docs[0], 'taxNumber'),
            // 0代表未支付  1代表已支付 2代表已取消
            orderType:
              item.orderList.orderType === 0
                ? '未支付'
                : item.orderList.orderType === 1
                ? '已支付'
                : item.orderList.orderType === 2
                ? '已取消'
                : '',
          }
        })
        console.log(this.orderData, 'this.orderData')
      } else {
        this.orderData = []
      }
    },
    handleTime(time) {
      return time.replace('T', ' ').replace(/\..+/, () => {
        // console.log("$1", $1)
        // console.log("$2", $2)
        return ''
      })
    },
    handleChangeSeatData(seatArr) {
      if (!seatArr) {
        return ''
      }
      return seatArr.map(item => {
        return {
          seat: `${item.x}排${item.y}列`,
          price: item.price,
        }
      })
    },
    handleInvoice(item, name) {
      if (!item) {
        return ''
      }
      return item[name]
    },
    handleToPay(_id) {
      console.log('_id', _id)
      this.$router.push('/wechatpay?orderId=' + _id)
    },
  },
  mounted() {
    this.getOrderData()
  },
}
</script>
<style lang="less">
.el-select-dropdown__item {
  &.hover {
    color: @HoverC;
  }
  &.selected {
    color: @HoverC;
  }
  > span {
    font-size: 14px !important;
    margin-left: 3px !important;
  }
}
.search-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .select-wrapper {
    margin-top: 20px;
    margin-right: 130px;
    .el-select {
      &:last-child {
        margin-left: 5px;
      }
    }
  }
  .keyword-wrapper {
    margin-top: 20px;
    display: flex;
    flex: 1;
    .keyword-input {
      flex: 1;
      margin-right: 5px;
    }
  }
}
.table-content {
  margin-top: 10px;
  padding: 10px;
}
</style>

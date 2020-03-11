<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 16:56:48
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-06 20:30:56
 -->
<template>
  <div class="container pay-wrapper">
    <m-bread-crumb
      class="m-bread-crumb"
      :breads="[
        '1&nbsp;选择商品',
        '2&nbsp;确认订单信息',
        '3&nbsp;支付订单',
        '4&nbsp;收取商品',
      ]"
      activeIndex="2"
    ></m-bread-crumb>
    <m-table class="m-table" :columns="columns" :data="order"></m-table>
    <div class="total">
      应付总金额：<span class="money">{{ payAmount }}元</span>
    </div>
    <p class="support">
      以下大多数平台都支持银行卡
    </p>
    <div class="pay">
      <el-radio-group v-model="orderType" @change="handleOrderChange">
        <el-radio label="0">
          <div class="img-box">
            <img :src="wechatImgUrl" alt="" />
          </div>
        </el-radio>
        <el-radio label="1">
          <div class="img-box">
            <img :src="aliPayImgUrl" alt="" />
          </div>
        </el-radio>
      </el-radio-group>
    </div>
    <button class="pay-btn" @click="handleToPay">确认无误，支付</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import MBreadCrumb from '@/components/bread-crumb'
import MTable from '@/components/table'
import WechatImgUrl from './img/wx_10127.jpg'
import AliPayImgUrl from './img/zfb_8129.jpg'
export default {
  name: 'PayMethod',
  components: {
    MBreadCrumb,
    MTable,
  },
  data() {
    return {
      columns: [
        {
          title: '订单编号',
          key: '_id',
        },
        {
          title: '商品名称',
          key: 'itemName',
        },
        {
          title: '订单金额',
          key: 'totalAmount',
        },
        {
          title: '应付金额',
          key: 'totalAmount',
        },
      ],
      // 订单号
      orderId: '',
      orderType: '0',
      insuranceAmount: 0,
      totalAmount: 0,
      order: null,
      wechatImgUrl: WechatImgUrl,
      aliPayImgUrl: AliPayImgUrl,
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId
    this.getOrderInfo()
  },
  methods: {
    ...mapActions(['setOrder']),
    async getOrderInfo() {
      const ret = await this.$http.getOrder({}, this.orderId)
      if (ret.data && ret.data[0] && ret.data[0].orderList) {
        this.order = ret.data.map(item => {
          return {
            _id: item.orderList._id,
            itemName: item.item_docs[0].itemName,
            totalAmount: item.orderList.totalAmount,
            totalAmount: item.orderList.totalAmount,
          }
        })
        this.setOrder(this.order)
        this.insuranceAmount = ret.data[0].orderList.insuranceAmount
        this.totalAmount = ret.data[0].orderList.totalAmount
      }
    },
    handleOrderChange(value) {
      this.orderType = value
    },
    handleToPay() {
      if (this.orderType === '0') {
        this.$router.push({
          path: '/wechatpay',
          query: { orderId: this.orderId },
        })
      }
    },
  },
  computed: {
    payAmount() {
      return this.insuranceAmount + this.totalAmount
    },
  },
}
</script>
<style lang="less" scoped>
.pay-wrapper {
  background: #fff;
  padding-bottom: 20px;
  .m-bread-crumb {
    padding: 20px 10px 10px;
  }
  .m-table {
    margin: 15px 0;
    padding: 0 10px;
  }
  .total {
    padding: 10px;
    .money {
      color: @HoverC;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .support {
    padding: 5px 10px;
  }
  .pay {
    padding: 10px;
    .el-radio-group {
      display: flex;
      align-items: center;
      .el-radio {
        display: flex;
        align-items: center;
        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }
  .pay-btn {
    border: none;
    outline: none;
    border-radius: 4px;
    background: @HoverC;
    color: white;
    padding: 8px 16px;
    margin-left: 10px;
  }
}
</style>

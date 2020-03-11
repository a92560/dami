<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 20:14:08
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-07 09:08:50
 -->
<template>
  <div class="container pay-wrapper">
    <div class="pay-left">
      <p>订单将在2小时后关闭，请及时付款</p>
      <div class="img-box">
        <img src="" alt="支付" />
      </div>
      <p>请使用微信扫一扫完成支付</p>
    </div>
    <div class="pay-right">
      <p>大觅网订单</p>
      <p>
        支付订单号 :
        <span>{{ order.orderId }}</span>
      </p>
      <p>
        商品名称 :
        <span>{{ order.itemName }}</span>
      </p>
      <p>
        订单金额 :
        <span
          >￥
          <i class="money">{{ order.totalAmount && order.totalAmount }}</i>
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'WechatPay',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['setOrder', 'clearOrder']),
  },
  async mounted() {
    const orderId = this.$route.query.orderId
    if (!orderId) {
      this.$router.replace('/')
    } else if (orderId && !this.order.orderId) {
      const ret = await this.$http.getOrder({}, orderId)
      if (ret && ret.data[0] && ret.data[0].orderList) {
        let order = {
          orderId: ret.data[0].orderList._id,
          itemName:
            ret.data[0].orderList.itemName ||
            (ret.data[0].item_docs[0] && ret.data[0].item_docs[0].itemName),
          totalAmount:
            (parseInt(ret.data[0].orderList.insuranceAmount) || 0) +
            parseInt(ret.data[0].orderList.totalAmount),
        }
        this.setOrder(order)
      }
    }
  },
  computed: {
    ...mapState({
      order: state => state.order.order,
    }),
  },
  destroyed() {
    this.clearOrder()
  },
}
</script>
<style lang="less" scoped>
.pay-wrapper {
  display: flex;
  background: white;
  padding: 50px 100px 20px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  .pay-left {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .img-box {
      width: 150px;
      height: 203px;
      padding: 15px 0;
      > img {
        width: 150px;
        height: 203px;
      }
    }
  }
  .pay-right {
    margin-left: 100px;
    > p {
      padding: 12px 0;
      font-size: 14px;
      &:first-child {
        padding-top: 0;
      }
      > span > i.money {
        color: @HoverC;
      }
    }
  }
}
</style>

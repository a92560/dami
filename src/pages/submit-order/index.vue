<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 16:56:48
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-06 17:21:29
 -->
<template>
	<div class="container">
		<m-bread-crumb :breads="['1&nbsp;选择商品', '2&nbsp;确认订单信息', '3&nbsp;支付订单', '4&nbsp;收取商品']"
					   activeIndex="2"></m-bread-crumb>
		<m-table :columns="columns"></m-table>
	</div>
</template>
<script>
import MBreadCrumb from '@/components/bread-crumb'
import MTable from '@/components/table'
export default {
	name: "SubmitOrder",
	components: {
		MBreadCrumb,
		MTable,
	},
	data () {
		return {
			columns: [
				{
					title: "订单编号",
					key: "orderNo"
				},
				{
					title: "商品名称",
					key: "itemName"
				},
				{
					title: "订单金额",
					key: "totalAmount"
				},
				{
					title: "应付金额",
					key: "payAmount"
				}
			],
			// 订单号
			orderNo: "1234",
			orderType: 0
		};
	}
}
</script>
<style lang="less" scoped>
</style>
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-06 12:02:10
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 17:08:26
 -->
<template>
	<div class="seat-header steps">
		<div :class="['step', {'active': activeIndex == index}]"
			 v-for="(item, index) in breads"
			 :key="index"
			 :style="{width: (1 / breads.length * 100) + '%'}"
			 v-html="item"></div>
	</div>
</template>
<script>
export default {
	props: {
		breads: {
			type: Array,
			default: () => []
		},
		activeIndex: {
			type: String,
			default: 0
		}
	},
	name: "BreadCrumb",
	data() {
		return {};
	}
};
</script>
<style lang="less" scoped>
.seat-header.steps {
	display: flex;
	margin-top: 15px;
	.step {
		width: 33.4%;
		background: #444444;
		color: white;
		text-align: center;
		height: 40px;
		line-height: 40px;
		position: relative;
		&.active {
			background: @HoverC;
			&:before {
				left: 0;
				content: "";
				position: absolute;
				border: 20px solid #444444;
				border-top-color: transparent;
				border-bottom-color: transparent;
				border-left-color: transparent;
				transform: rotate(180deg);
			}
			&:after {
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
}
</style>
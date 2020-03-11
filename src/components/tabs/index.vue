<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-09 15:34:35
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-09 15:38:26
 -->
<template>
	<ul class="tabs">
		<li :class="[{'active': activeIndex === i}, 'tab', 'tc'] "
			v-for="(tab, i) in tabs"
			:key="i"
			@click="handleSwitchTab(i)">{{tab}} 
		</li>
	</ul>
</template>
<script>
export default {
	name: "Tabs",
	props: {
		tabs: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			activeIndex: 0
		};
	},
	methods: {
		handleSwitchTab(i) {
			this.activeIndex = i;
			this.$emit("handleSwitchTab", i);
		}
	}
};
</script>
<style lang="less" scoped>
ul.tabs {
	width: 100%;
	height: 31px;
	line-height: 31px;
	> li.tab {
		box-sizing: border-box;
		width: 85px;
		height: 31px;
		float: left;
		background: #f8f8f9;
		border: 1px solid #ccc;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		margin-right: 5px;
		position: relative;
		top: 1px;
		cursor: pointer;
		&.active {
			border-bottom: none;
			background: #fff;
		}
	}
}
</style>
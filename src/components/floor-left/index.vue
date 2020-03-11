<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-14 15:55:20
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 17:08:37
 -->
<template>
	<div>
		<h1>{{floor.index}}F</h1>
		<span>{{itemType}}</span>
		<div class="ad-img-wrapper"
			 v-if="floor.items.length">
			<div class="big-ad-img">
				<big-ad-img :img="floor.items[0]"></big-ad-img>
			</div>
			<div class="left-right-ad-img">
				<left-right-ad-img-list :imgs="floor.items.slice(1)"></left-right-ad-img-list>
			</div>
		</div>
	</div>
</template>
<script>
import BigAdImg from "./big-ad-img";
import leftRightAdImgList from "./left-right-ad-img-list";
export default {
	name: "FloorLeft",
	data() {
		return {};
	},
	props: {
		floor: {
			type: Object,
			default: () => {}
		},
		itemType: {
			type: String,
			required: true
		}
	},
	components: {
		BigAdImg,
		leftRightAdImgList
	}
};
</script>
<style lang="less" scoped>
div {
	h1 {
		display: inline-block;
		color: #ff3c1b;
		font-size: 14px;
		font-weight: bold;
	}

	span {
		margin-left: 5px;
		color: #495060;
		font-size: 14px;
	}
	.ad-img-wrapper {
		margin-top: 20px;
		display: flex;
		height: 362px;
		.big-ad-img {
			width: 235px;
			position: relative;
			margin-right: 30px;
		}
		.left-right-ad-img {
			flex: 1;
		}
	}
}
</style>
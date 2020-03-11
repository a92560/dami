<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-28 10:12:35
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 15:03:57
 -->
<template>
	<li :class="[{'big-item': switchList === 'big'}, {'list-item': switchList === 'list'}]">
		<div class="img-box">
			<a href="javascript:;">
				<img :src=" imgBaseUrl + itemData.imgUrl"
					 alt="img"
					 @click="handleToDesc(itemData)">
			</a>
		</div>
		<div class="content-desc">
			<p class="province">[{{itemData.areaId}}]<span class="title">{{itemData.itemName}}</span></p>
			<p class="description"
			   v-show="switchList === 'list'">{{itemData.abstractMessage}}</p>
			<p class="start-time">
				<i class="iconfont icon-menu_vs"
				   v-show="switchList === 'list'"></i>
				{{itemData.startTime[0].substring(0, 10)}}
			</p>
			<p class="location"
			   v-show="switchList === 'list'"
			   @click="handleShowMap">
				<i class="iconfont icon-location"></i>
				<a href="javascript:;">{{itemData.address}}</a>
			</p> 
			<p class="price">
				<span>{{itemData.minPrice}}-{{itemData.maxPrice}}元</span>{{itemData.state === "0" ? "项目待定" : (itemData.state === "1" ? "预售/待定" : (itemData.state === "2" ? "售票中" : "演出开始"))}}
			</p>
			<p v-show="switchList === 'list'">
				<i class="iconfont icon-qrscanner"></i>
				<span>电子票</span>
			</p>
		</div>

	</li>
</template>
<script>
import { IMG_BASE_URL } from "@/config";
export default { 
	name: "ListItem",
	props: {
		switchList: {
			type: String,
			default: "list"
		},
		itemData: {
			type: Object, 
			default: () => {}
		}
	},
	data() {
		return {
			imgBaseUrl: IMG_BASE_URL
		};
	},
	methods: {
		handleShowMap() {
			const { longitude, latitude } = this.itemData;
			console.log("list-item", { longitude, latitude });
			this.$emit("handleShowMap", [longitude, latitude]);
		},
		handleToDesc({ _id }) {
			this.$router.push(`/ticketdesc?id=${_id}`);
			console.log("_id", _id);
		}
	}
};
</script>
<style lang="less" scoped>
.list-item {
	height: 215px;
	display: flex;
	padding: 20px 10px 10px 10px;
	margin: 0 10px;
	border-bottom: 1px dotted #cecece;
	&:last-child {
		border-bottom: none;
	}
	.img-box {
		margin-right: 20px;
		img {
			width: 150px;
			height: 205px;
		}
	}
	.content-desc {
		flex: 1;
		> p {
			margin-bottom: 18px;
		}
		> p.province {
			color: #000;
			font-size: 14px;
		}
		> p.start-time {
			> i {
				font-size: 16px;
				color: @HoverC;
				margin-right: 5px;
			}
			color: #999999;
		}
		> p.description {
			color: #999999;
		}
		> p.location {
			> i {
				color: @HoverC;
				margin-right: 3px;
				font-size: 16px;
			}
		}
		> p.price {
			color: #999999;
			> span {
				color: @HoverC;
				font-weight: bold;
			}
		}
		> p > i.icon-qrscanner {
			color: @HoverC;
			margin-right: 5px;
			font-size: 16px;
		}
		.title {
			display: inline-block;
			margin-left: 10px;
		}
		.price {
			> span {
				display: inline-block;
				margin-right: 10px;
			}
		}
	}
}

.big-item {
	float: left;
	width: 25%;
	box-sizing: border-box;
	padding-left: 10px;
	margin-bottom: 40px;
	> div {
		margin-left: 10px;
	}
	.img-box {
		width: 178px;
		height: 245px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.content-desc {
		> p.price {
			color: #999999;
			> span {
				margin-right: 15px;
				color: @HoverC;
				font-weight: bold;
			}
		}
		> p.province {
			margin: 8px 0 20px;
		}
		> p.start-time {
			color: #999999;
			margin-bottom: 15px;
		}
	}
}
</style>
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-12 23:10:34
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 15:50:05
 -->
<template>
	<el-carousel height="420px"
				 style="paddingTop: 50px;">
		<!-- <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="small">{{ item }}</h3>
    </el-carousel-item> -->
		<el-carousel-item v-for="img in imgs"
						  :key="img.id">
			<img class="carousel-img"
				 :src="imgBaseUrl + img.imgUrl"
				 alt="img" />
		</el-carousel-item>
	</el-carousel>
</template>
<script>
import { IMG_BASE_URL } from "@/config";
export default {
	name: "Carousel",
	props: {
		imgs: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			imgBaseUrl: IMG_BASE_URL
		};
	}
};
</script>
<style lang="less">
.el-carousel__indicator.el-carousel__indicator--horizontal.is-active {
	.el-carousel__button {
		background-color: @HoverC!important;
	}
}

.el-carousel.el-carousel--horizontal {
	width: 998px;
}

.carousel-img {
	width: 1000px;
	height: 420px;
}
</style>
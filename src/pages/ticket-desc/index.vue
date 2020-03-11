<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-01 11:23:18
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 15:21:06
 -->
<template>
  <div class="container" style="margin-top: 20px">
    <div class="bread-crumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{ root }}</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: '/changecity?cityId=' + item.areaId }"
          >{{ cityName }}</el-breadcrumb-item
        >
        <!-- 显示父分类名称 -->
        <el-breadcrumb-item
          :to="{ path: '/ticketList', query: { id: item.itemType1Id, pid: '0' } }"
          >{{ itemType1Name }}</el-breadcrumb-item
        >
        <!-- 显示子分类名称 -->
        <el-breadcrumb-item
          :to="{
            path: '/ticketList',
            query: { id: item.itemType2Id, pid: item.itemType1Id },
          }"
          v-if="itemType2Name"
          >{{ itemType2Name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ item.itemName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail-content">
      <div class="detail-left">
        <div class="img-box">
          <img :src="imgBaseUrl + item.imgUrl" alt="" />
        </div>
      </div>
      <div class="detail-middle">
        <p class="title">{{ item.itemName }}</p>
        <p class="sub-title">{{ item.abstractMessage }}</p>
        <div class="steps">
          <div
            :class="[
              'step',
              {
                active: item.state == index + '',
                'is-coming': item.state <= index,
              },
            ]"
            v-for="(item1, index) in [
              '项目待定',
              '预售/待定',
              '售票中',
              '演出开始',
            ]"
            :key="index"
          >
            <div class="circle" v-if="item.state > index">
              <i
                class="iconfont icon-cc-yes-crude"
                v-if="item.state < index"
              ></i>
            </div>
            <div class="circle" v-else>
              {{ index + 1 }}
            </div>
            <div class="text">{{ item1 }}</div>
          </div>
        </div>
        <dl class="items times clearfix">
          <dt class="title">演出时间：</dt>
          <dd class="item" v-for="(time, i) in item.timePlan" :key="i">
            {{ time }}
          </dd>
        </dl>
        <!-- <dl class="items prices clearfix">
					<dt class="title">选择票价：</dt>
					<dd class="item price">{{price}}元</dd>
					<dd class="item price">{{price}}元</dd>
					<dd class="item price">{{price}}元</dd>
					<dd class="item price">{{price}}元</dd>
					<dd class="item price">{{price}}元</dd>
				</dl> -->
        <button class="buy-btn" @click="handleToChooseSeat">选座购买</button>
      </div>
      <div class="detail-right">
        <div class="dashed padded score">
          <p>大觅网评分：</p>
          <div class="content">
            <p class="number">{{ item.avgScore }}</p>
            <p>
              <el-rate
                v-model="item.avgScore"
                :allow-half="true"
                disabled
                :colors="['#ff3c1b', '#ff3c1b', '#ff3c1b']"
              ></el-rate>
            </p>
            <p>
              <span class="total-number">{{ commentCount }}</span
              >人参与评论
            </p>
          </div>
        </div>
        <div class="dashed padded time">
          <p>演出时间：</p>
          <!-- <p class="content">
						{{startTime.substring(0, startTime.indexOf(" "))}}-{{endTime.substring(0, startTime.indexOf(" "))}}
					</p> -->
        </div>
        <div class="dashed padded location-line">
          <p>演出场馆：</p>
          <p class="content">
            {{ item.cinemaId }}
          </p>
          <p class="traffic-line">
            <i class="iconfont icon-location"></i>
            <span>交通路线</span>
          </p>
        </div>
        <div class="dashed padded integral">
          <p>票品支持：</p>
          <p class="content">
            <i class="iconfont icon-meiyuan"></i>
            <span>返积分</span>
          </p>
        </div>
        <div class="dashed padded delivery">
          <p>实票配送：</p>
          <p class="content">
            同城满100.00元免运费，不满收10.00元，发货后1-3天到达
          </p>
        </div>
      </div>
    </div>
    <div class="desc-content">
      <desc-left
        :itemComments="comments"
        @handleToComment="handleToComment"
        @getComments="getComments"
      ></desc-left>
      <!-- <div class="divide-line"></div> -->
      <desc-right></desc-right>
    </div>
  </div>
</template>
<script>
import DescLeft from './desc-left'
import DescRight from './desc-right'
import { IMG_BASE_URL } from '@/config'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TicketDesc',
  components: {
    DescLeft,
    DescRight,
  },
  data() {
    return {
      root: '大觅',
      imgBaseUrl: IMG_BASE_URL,
      item: {
        areaId: '',
        itemType1Id: '',
        itemName: '',
        imgUrl: '',
        abstractMessage: '',
        state: '',
        startTime: [],
        endTime: [],
        avgScore: 0,
        address: '',
        timePlan: [],
        _id: '',
      },
      comments: [],
    }
  },
  methods: {
    ...mapMutations({
      getUserInfo: 'GET_USER_INFO',
    }),
    handleToChooseSeat() {
      this.$router.push({
        path: `/ticketchooseseat?id=${this.item._id}`,
        query: {
          cityName: this.cityName,
          itemType1Name: this.itemType1Name,
          itemType2Name: this.itemType2Name,
          itemName: this.item.itemName,
          itemId: this.item._id,
          cinemaId: this.item.cinemaId,
        },
      })
    },
    async getItemData() {
      const itemId = this.$route.query.id
      const ret = await this.$http.getItemData({ data: { id: itemId } })
      if (ret) {
        console.log('ret', ret)
        this.item = { ...ret.data[0] }
        // if (ret.data.city && ret.data.city[0]) {
        //   if (ret.data.city[0].value.name === '市辖区') {
        //     this.cityName = ret.data.city[0].value.province
        //   } else {
        //     this.cityName = ret.data.city[0].value.name
        //   }
        // }
        const timePlan = this.item.startTime.map(
          (time, i) =>
            `${time.substring(0, 10)}-${this.item.endTime[i].substring(0, 10)}`
        )
        this.$set(this.item, 'timePlan', timePlan)
      }
    },
    async handleToComment({ content, rate }, cb) {
      if (content && rate) {
        console.log('content', content)
        console.log('rate', rate)
        const id = this.$route.query.id
        if (!id) {
          this.$route.replace('/')
        }
        if (!this.userId || !this.userId) {
          this.$message.error('服务器错误,请稍后重试。')
          this.$route.replace('/')
        }
        const ret = await this.$http.postItemComments({
          content,
          score: rate,
          id,
          userId: this.userId,
          imgUrl: this.avatarUrl,
        })
        if (ret) {
          this.$message.success(ret.message)
          cb(true)
          await this.getComments()
        }
      } else {
        this.$message.error('请先评分和填写内容哦')
      }
    },
    async getComments() {
      const ret = await this.$http.getComments({
        data: { id: this.$route.query.id || '' },
      })
      if (ret) {
        this.comments = ret.data
      }
    },
    async getUserInfo() {
      const ret = await this.$http.getUserData()
      if (ret) {
        this.getUserInfo(ret.data[0])
      } else {
        this.$route.replace('/')
      }
    },
  },
  async mounted() {
    await this.getItemData()
    await this.getComments()
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
      avatarUrl: state => state.user.avatarUrl,
    }),
    commentCount() {
      return this.comments.length
    },
    cityName() {
      let cityName
      if (this.item.city_docs && this.item.city_docs[0]) {
        if (this.item.city_docs[0].value.name === '市辖区') {
          cityName = this.item.city_docs[0].value.province
        } else {
          cityName = this.item.city_docs[0].value.name
        }
      }
      return cityName
    },
    // 父分类名称
    itemType1Name() {
      let itemType1Name
      if (this.item.nav_docs && this.item.nav_docs[0]) {
        itemType1Name = this.item.nav_docs[0].itemType
      }
      return itemType1Name
    },
    // 子分类名称
    itemType2Name() {
      let itemType2Name
      if (
        this.item.itemType2Id &&
        this.item.nav_docs &&
        this.item.nav_docs[0]
      ) {
        itemType2Name = (
          this.item.nav_docs[0].children.filter(
            item => item._id === this.item.itemType2Id
          )[0] || []
        ).itemType
      }
      return itemType2Name
    },
  },
}
</script>
<style lang="less">
.el-breadcrumb__inner a:hover,
.el-breadcrumb__inner.is-link:hover {
  color: @HoverC!important;
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #495060;
}
.el-breadcrumb__inner.is-link:last-child {
  color: @HoverC!important;
}
.bread-crumb {
  background: #f6f6f6;
}
.detail-content {
  background: white;
  margin-top: 20px;
  display: flex;
  .img-box {
    width: 276px;
    height: 371px;
    padding: 20px 0 0 15px;
    margin: 0 20px 50px 0;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .detail-middle {
    padding-top: 20px;
    > .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 35px;
    }
    .steps {
      background: #f7f7f7;
      display: flex;
      padding: 30px 20px;
      color: #999999;
      margin-top: 20px;
      .step {
        display: flex;
        align-items: center;
        margin-right: 9px;
        &.active.is-coming {
          .circle {
            background: @HoverC;
            border-color: @HoverC;
            color: white;
          }
          .text {
            color: #666666;
          }
        }
        &.is-coming {
          &:after {
            background: #e9eaec;
          }
          .circle {
            border-color: #cecece;
          }
        }
        .icon-cc-yes-crude {
          color: @HoverC;
          font-size: 12px;
        }
        .circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid @HoverC;
          line-height: 18px;
          text-align: center;
        }

        &:after {
          content: '';
          width: 32px;
          height: 1px;
          background: red;
          position: relative;
          left: 4px;
        }
        &:last-child:after {
          height: 0;
        }
        .text {
          margin-left: 5px;
        }
      }
    }
    .items {
      margin-top: 30px;
      .title {
        float: left;
        margin-right: 5px;
        line-height: 30px;
      }
      .item {
        cursor: pointer;
        float: left;
        display: block;
        width: 145px;
        height: 30px;
        border: 1px solid #dddee1;
        margin-right: 10px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        color: #495060;
        &:last-child {
          margin-right: 0;
        }
        &.active {
          color: @HoverC;
          border-color: @HoverC;
        }
        &:hover {
          color: @HoverC;
          border-color: @HoverC;
        }
        &.price {
          width: 60px;
        }
      }
    }
    .buy-btn {
      margin-top: 40px;
      outline: none;
      border: none;
      background: @HoverC;
      cursor: pointer;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      margin-left: 65px;
    }
  }
  .detail-right {
    margin-top: 20px;
    margin-left: 15px;
    .dashed.padded {
      border-bottom: 1px dotted #cccccc;
      padding: 13px;
    }
    .score {
      .content {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 13px;
        .number {
          color: @HoverC;
          font-size: 14px;
          margin-right: 8px;
        }
        .total-number {
          color: @HoverC;
        }
      }
    }
    .time {
      .content {
        margin-top: 15px;
      }
    }
    .location-line {
      .content {
        margin: 15px 0;
      }
      .traffic-line {
        > i {
          font-size: 12px;
          color: @HoverC;
          margin-right: 4px;
        }
      }
    }
    .integral {
      .content {
        margin-top: 10px;
        display: flex;
        align-items: center;
        > i {
          color: @HoverC;
        }
      }
    }
    .delivery {
      .content {
        margin-top: 20px;
      }
    }
  }
}
.desc-content {
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  .divide-line {
    margin-left: 21px;
    width: 10px;
    background: #f5f5f5;
  }
}
</style>

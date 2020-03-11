<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-15 15:15:28
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 14:59:55
 -->
<template>
  <div class="container">
    <!-- 总数开始 -->
    <div class="total-number">
      <p>
        共
        <span class="number">{{ searchTotal }}</span>
        个商品
      </p>
    </div>
    <!-- 总数结束 -->

    <!-- 主体内容开始 -->
    <div class="search-wrapper">
      <!-- 主题内容部分开始 -->
      <div class="content">
        <div>
          <!-- 城市筛选开始 -->
          <div
            class="condition-content"
            v-loading="isLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <dl>
              <dt>城市：</dt>
              <dd
                class="all tc"
                @click="queryAll('city')"
                :class="{ active: cityFlag }"
              >
                全部
              </dd>
              <dd class="city-list clearfix">
                <ul class="clearfix">
                  <li
                    :class="{ active: cityIndex === index }"
                    v-for="(city, index) in queryCitys"
                    :key="city.id"
                    @click="queryID(city.id, index, 'city')"
                  >
                    <a href="javascript:;">{{ city.name }}</a>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
          <!-- 城市筛选结束 -->
          <!-- 分类筛选开始 -->
          <div
            class="condition-content categories"
            v-loading="isLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <dl>
              <dt>分类：</dt>
              <dd
                class="all tc"
                @click="queryAll('category')"
                :class="{ active: categoryFlag }"
              >
                全部
              </dd>
              <dd class="city-list clearfix">
                <ul class="clearfix">
                  <li
                    :class="{ active: categoryIndex === index }"
                    v-for="(category, index) in categories"
                    :key="category._id"
                    @click="queryID(category._id, index, 'category')"
                  >
                    <a href="javascript:;">{{ category.itemType }}</a>
                  </li>
                </ul>
                <!-- 子类筛选开始 -->
                <!-- 只要父分类不是全部就展示哦 -->
                <ul
                  class="clearfix"
                  v-show="!categoryFlag"
                  style="margin-top:10px"
                >
                  <li
                    :class="{ active: sonCategoryIndex === index }"
                    v-for="(sonCategory, index) in sonCategories"
                    @click="queryID(sonCategory._id, index, 'sonCategory')"
                    :key="sonCategory._id"
                  >
                    <a href="javascript:;">{{ sonCategory.itemType }}</a>
                  </li>
                </ul>
                <!-- 子类筛选结束 -->
              </dd>
            </dl>
          </div>
          <!-- 分类筛选结束 -->
          <!-- 时间筛选开始 -->
          <div
            class="condition-content time"
            v-loading="isLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <dl>
              <dt>时间：</dt>
              <dd
                class="all tc"
                @click="queryAll('time')"
                :class="{ active: timeFlag }"
              >
                全部
              </dd>
              <dd class="city-list">
                <ul class="clearfix time-list">
                  <li
                    :class="{ active: timeIndex === index }"
                    v-for="(time, index) in ['今天', '明天']"
                    :key="index"
                    @click="queryTime(time)"
                  >
                    <a href="javascript:;">{{ time }}</a>
                  </li>
                  <el-date-picker
                    style="marginTop: -8px"
                    v-model="startTime"
                    @change="handleStartTimeChange"
                    placeholder="选择开始日期"
                  >
                  </el-date-picker>
                  <span class="divide"></span>
                  <el-date-picker
                    style="marginLeft:15px; marginTop: -8px"
                    v-model="endTime"
                    @change="handleEndTimeChange"
                    placeholder="选择结束日期"
                  >
                  </el-date-picker>
                </ul>
              </dd>
            </dl>
          </div>
          <!-- 时间筛选结束 -->
        </div>
        <div class="division"></div>

        <div class="main-content">
          <div class="sort">
            <div class="sort-left">
              <ul>
                <li
                  :class="{ active: sort === 'recommend' }"
                  @click="handleSwitchSort"
                >
                  热门推荐
                </li>
                <li
                  :class="{ active: sort === 'recentShow' }"
                  @click="handleSwitchSort"
                >
                  最近开场
                </li>
                <li
                  :class="{ active: sort === 'recentSell' }"
                  @click="handleSwitchSort"
                >
                  最新上架
                </li>
              </ul>
            </div>
            <div class="sort-right">
              <div
                :class="['menu', 'list', { active: buttonSwitch === 'list' }]"
                @click="handleSwitchList"
              >
                <i class="iconfont icon-menu"></i>
              </div>
              <div
                :class="['windows', 'big', { active: buttonSwitch === 'big' }]"
                @click="handleSwitchList"
              >
                <i class="iconfont icon-windows"></i>
              </div>
            </div>
          </div>
          <div class="list">
            <ul
              v-loading="isLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              class="list-wrapper clearfix"
              v-if="calcItemData.length > 0"
            >
              <list-item
                @handleShowMap="handleShowMap"
                :switchList="buttonSwitch === 'list' ? 'list' : 'big'"
                v-for="(item, index) in calcItemData"
                :key="index"
                :itemData="item"
              >
              </list-item>
            </ul>
            <div v-if="calcItemData.length <= 0 && !isLoading" class="no-data">
              暂无数据
            </div>
          </div>
        </div>
        <div class="pagination">
          <m-pagination
            :total="total"
            :currentPage="currentPage"
            :pageSize="pageSize"
            :pageSizes="[12, 16, 20]"
            @currentPageChange="currentPageChange"
          >
          </m-pagination>
        </div>
      </div>
      <!-- 主题内容部分结束 -->

      <!-- 猜你喜欢部分开始 -->
      <div class="guess-like">
        <div class="title-background">
          您可能还喜欢
        </div>
        <ul v-if="guessData.length > 0">
          <guess-like-item
            v-for="guess in guessData"
            :key="guess.id"
            :itemData="guess"
          ></guess-like-item>
        </ul>
      </div>
      <!-- 猜你喜欢部分结束-->

      <!-- 地图部分开始 -->
      <el-dialog
        title="地图"
        :visible="showSceneDialog"
        @close="handleClose"
        width="50%"
      >
        <m-map :mapData="mapData"></m-map>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 地图部分结束 -->
    </div>
  </div>
</template>
<script>
import ListItem from './list-item'
import GuessLikeItem from './guess-like-item'
import MPagination from '@/components/pagination'
import MMap from '@/components/map'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TicketList',
  components: {
    ListItem,
    MPagination,
    MMap,
    GuessLikeItem,
  },
  data() {
    return {
      // 标志
      /* 是否选中城市中的全部项 */
      cityFlag: true,
      /* 是否选中分类中的全部项 */
      categoryFlag: true,
      /* 是否选中时间中的全部项 */
      sonCategoryFlag: true,
      /* 是否选中时间中的全部项 */
      timeFlag: true,

      /* 查询列表的市区列表 */
      queryCitys: [],
      /* 选中的城市项的下标值 */
      cityIndex: -1,
      /* 选中的城市项的ID */
      cityId: '',

      /* 查询分类数据 */
      categories: [],
      /* 选中的分类项的下标值 */
      categoryIndex: -1,
      /* 分类ID */
      itemTypeId1: '',

      /* 选中的子分类项的下标值 */
      sonCategoryIndex: -1,
      /* 子类分类ID */
      itemTypeId2: '',
      // 子分类数组
      sonCategories: [],
      /* 父类ID */
      parent: '0',

      /* 时间 */
      startTime: '', // new Date(),
      endTime: '', // new Date((+new Date()) + 24*60*60*1000),
      timeIndex: -1,

      /* 分类排序字符串 */
      sort: 'recommend',
      /* 商品信息 */
      itemDesp: null,
      itemData: [],
      /* button布局方式 */
      buttonSwitch: 'list', // list/big
      /* 猜你喜欢 */
      itemTypeId: '0', // 可能是父类ID也可能是子类ID
      guessData: [],
      /* 分页 */
      currentPage: 1,
      pageSize: 16,
      total: -1,
      // 展示场景地图
      showSceneDialog: false,
      mapData: [],
      // isLoading: true,
    }
  },
  async mounted() {
    // 判断关键词
    await this.getQueryCity()
    await this.getCategories()
    if (this.$route.query.keyword && this.$route.query.keyword !== '') {
      this.setKeyword(this.$route.query.keyword)
    } else {
      this.resetKeyword()
    }
    // console.log("this.$route.query.id == undefined", this.$route.query.id == undefined)
    // console.log("this.$route.query.pid !== ''", this.$route.query.pid !== '')
    // console.log("!this.$route.query.pid", !this.$route.query.pid)
    // console.log("!this.$route.query.pid", this.$route.query.pid)
    // 此时点击的是全部
    if (this.$route.query.id === '0' && this.$route.query.pid === '0') {
      this.itemTypeId1 = '0'
      this.itemTypeId2 = '0'
      // 判断显示当前分类高亮
      if (this.categories.length > 0) {
        this.handleCategoryActive(this.categories)
      }
      await this.listPost()
      this.guess()
    } else if (
      // 此时点击的是 父分类
      this.$route.query.id !== '0' &&
      this.$route.query.pid === '0'
    ) {
      this.itemTypeId = this.$route.query.id
      this.itemTypeId1 = this.$route.query.id
      this.itemTypeId2 = '0'
      // 判断显示当前分类高亮
      if (this.categories.length > 0) {
        this.handleCategoryActive(this.categories)
      }
      await this.getSonCategory()
      await this.listPost()
      console.log(this.itemData)
      this.guess()
    } else if (this.$route.query.id !== '0' && this.$route.query.pid !== '0') {
      this.itemTypeId = this.$route.query.id
      this.itemTypeId1 = this.$route.query.pid
      this.itemTypeId2 = this.$route.query.id
      // 判断显示当前父分类高亮
      if (this.categories.length > 0) {
        this.handleCategoryActive(this.categories)
      }
      // 判断子分类
      await this.getSonCategory()
      this.sonCategories.forEach((son, i) => {
        if (son._id === this.itemTypeId2) {
          this.sonCategoryIndex = i
          this.sonCategoryFlag = false
        }
      })
      this.listPost()
      this.guess()
    }
  },
  methods: {
    ...mapMutations({
      setKeyword: 'SET_KEYWORD',
      resetKeyword: 'RESET_KEYWORD',
      setLoading: 'SET_LOADING',
      resetLoading: 'RESET_LOADING',
    }),
    /* 获取查询列表的市区列表 */
    async getQueryCity() {
      const ret = await this.$http.getListQueryCity()
      if (ret) {
        this.queryCitys = ret.data
          .map(item => {
            if (item.value.length === 1) {
              return {
                name: item.value[0].province,
                id: item.value[0].id,
              }
            } else {
              return {
                name: item.value[0].name,
                id: item.value[0].id,
              }
            }
          })
          .slice(0, 7)
      }
    },
    /* 获取查询列表的分类列表 */
    async getCategories() {
      const ret = await this.$http.getListSortGoods({
        parent: this.parent,
      })
      if (ret) {
        this.categories = ret.data
      }
    },

    handleCategoryActive(array = []) {
      array.forEach((item, i) => {
        if (item._id === this.itemTypeId1) {
          this.categoryIndex = i
          this.categoryFlag = false
        }
      })
    },

    handleStartTimeChange(value) {
      this.timeIndex = -1
      this.startTime = new Date(value)
      if(this.endTime) {
        this.listPost()
      }
    },
    handleEndTimeChange(value) {
      this.timeIndex = -1
      if (!this.startTime) {
        this.endTime = ''
        return
      }
      this.endTime = new Date(value)
      this.timeFlag = false
      this.listPost()
    },

    /* 处理切换排序 */
    handleSwitchSort(e) {
      const sortArr = [
        {
          name: '热门推荐',
          englishName: 'recommend',
        },
        {
          name: '最近开场',
          englishName: 'recentShow',
        },
        {
          name: '最新上架',
          englishName: 'recentSell',
        },
      ]
      const selectedSort =
        sortArr.find((item, i) => {
          return item.name === e.target.innerHTML
        }) || {}
      const oldSelectedSort = this.sort
      this.sort = selectedSort.englishName || '热门推荐'
      if (oldSelectedSort === this.sort) {
        return
      }
      this.listPost()
    },

    /* 处理切换显示 */
    handleSwitchList(e) {
      if (
        e.target.classList &&
        e.target.classList.length > 0 &&
        Array.from(e.target.classList).indexOf('icon-menu') > -1
      ) {
        this.buttonSwitch = 'list'
      }
      if (
        e.target.classList &&
        e.target.classList.length > 0 &&
        Array.from(e.target.classList).indexOf('icon-windows') > -1
      ) {
        this.buttonSwitch = 'big'
      }
    },

    /* 列表数据获取 */
    async listPost() {
      this.$router
        .push({
          query: {
            id: this.itemTypeId1 ? this.itemTypeId1 : '0',
            pid: this.itemTypeId2 ? this.itemTypeId2 : '0',
            keyword: this.keyword ? this.keyword : '',
            // ...this.$route.query,
          },
        })
        .catch(err => err)
      this.setLoading(true)
      let {
        cityId,
        itemTypeId1,
        itemTypeId2,
        sort,
        currentPage,
        pageSize,
        keyword,
        startTime,
        endTime,
      } = this
      const ret = await this.$http.getListQueryGoodsInfo({
        data: {
          cityId, // areaId
          itemTypeId1, // 父分类
          itemTypeId2, // 子分类
          sort, // 热门推荐
          currentPage,
          pageSize,
          keyword,
          startTime,
          endTime,
        },
      })
      let data = ret.data
      if (ret.data.items.length === 0) {
        this.total = 0
        this.itemData = []
      } else {
        this.currentPage = data.currentPage
        this.pageSize = data.pageSize
        this.total = data.total
        this.itemData = ret.data.items
      }
      this.resetLoading()
    },

    /* 当前页发生变化 */
    currentPageChange(currentPage) {
      if (this.currentPage === currentPage) {
        return
      }
      this.currentPage = currentPage
      this.listPost()
    },

    handleClose() {
      this.showSceneDialog = false
    },
    handleShowMap(mapData) {
      console.log('ticket-list', mapData)
      this.mapData = mapData
      this.showSceneDialog = true
    },
    queryID(id, index, name) {
      if (name === 'city') {
        this.cityId = id
        this.cityIndex = index
        // 城市选项列表的全部选项
        this.cityFlag = false

        this.listPost()
      } else if (name === 'category') {
        this.itemTypeId1 = id
        this.itemTypeId2 = 0
        this.itemTypeId = id

        this.categoryIndex = index
        this.sonCategoryIndex = -1
        // 城市选项列表的全部选项
        this.categoryFlag = false
        // 调用接口获取数据
        this.listPost()
        // 获取分类数据方法
        this.getSonCategory()
        // 猜你喜欢数据获取
        this.guess()
      } else if (name === 'sonCategory') {
        this.itemTypeId2 = id
        this.itemTypeId = id
        this.sonCategoryIndex = index
        this.sonCategoryFlag = false

        // 获取数据
        this.listPost()
        // 获取猜你喜欢数据
        this.guess()
      }
    },
    queryTime(time) {
      if (time === '今天') {
        this.timeIndex = 0
        this.timeFlag = false
        this.startTime = this.getDateStr(0)
        this.endTime = this.getDateStr(0)

        this.listPost()
      } else if (time === '明天') {
        this.timeIndex = 1
        this.timeFlag = false
        this.startTime = this.getDateStr(1)
        this.endTime = this.getDateStr(1)
        // console.log(`getDateStr`, this.getDateStr(1))
        this.listPost()
      }
    },
    getDateStr(addDayCount) {
      if (!/^\d+$/.test(addDayCount)) {
        return
      }
      let date = new Date()
      // getDate() 几月几日
      date.setDate(date.getDate() + Number(addDayCount))
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) {
        m = `0${m}`
      }
      if (date < 10) {
        d = `0${d}`
      }

      return `${y}-${m}-${d}`
    },
    queryAll(name) {
      if (name === 'city') {
        // 0表示全部
        this.cityId = ''
        this.cityFlag = true
        this.cityIndex = -1
        // 获取数据
        this.listPost()
      } else if (name === 'category') {
        this.itemTypeId1 = 0
        this.itemTypeId2 = 0
        this.categoryFlag = true
        this.categoryIndex = -1
        // 获取数据
        this.listPost()

        // 猜你喜欢数据获取
        this.itemTypeId = 0
        this.guess()
      } else if (name === 'sonCategory') {
        this.itemTypeId2 = 0
        this.sonCategoryFlag = true
        this.sonCategoryIndex = -1
        // 获取数据
        this.listPost()

        this.itemTypeId = 0
        this.guess()
      } else {
        this.startTime = ''
        this.endTime = ''
        this.timeFlag = true
        this.timeIndex = -1
        // 获取数据
        this.listPost()
      }
    },

    // 获取猜你喜欢数据
    async guess() {
      // const data = await this.$http.getListGuessLike({itemTypeId: this.itemTypeId})
      // console.log("guess data", data)
      // if(data.data && data.data.length > 0){
      //   this.guessData = data.data
      // }else{
      //   alert("没数据")
      // }
    },

    // 获取子分类数据
    async getSonCategory() {
      if (this.categories.length > 0) {
        this.sonCategories = this.categories.filter(
          category => category._id === this.itemTypeId1
        )[0]
        if (this.sonCategories) {
          this.sonCategories = this.sonCategories.children
        }
      } else {
        this.sonCategories = []
        // 没有子分类就不做处理
        this.categoryFlag = true
      }
    },
  },
  computed: {
    ...mapState({
      searchList: state => state.search.searchList,
      keyword: state => state.search.keyword,
      isLoading: state => state.search.loading,
    }),
    searchTotal() {
      return this.searchList.length > 0
        ? this.searchList.length
        : this.itemData.length > 0
        ? this.itemData.length
        : ''
    },
    // itemData
    calcItemData() {
      return this.showIndexOrSearch
        ? this.searchList.length > 0
          ? this.searchList
          : this.itemData.length > 0
          ? this.itemData
          : []
        : this.itemData.length > 0
        ? this.itemData
        : []
    },
    // 如果没有关键词就是显示主页的数据
    // 否则显示searchList的数据
    showIndexOrSearch() {
      return !!this.keyword
    },
  },
}
</script>
<style lang="less" scoped>
.total-number {
  p {
    width: 100%;
    background: #fff;
    height: 50px;
    line-height: 50px;
    color: #666666;
    font-size: 12px;
    padding-left: 10px;
    .number {
      color: @HoverC;
    }
  }
}

.search-wrapper {
  display: flex;
  align-items: flex-start;
  .content {
    margin-right: 15px;
    flex: 1;
    border: 1px solid #e9e9e9;
    background: white;
    margin-bottom: 20px;
    width: 925px;
    box-sizing: border-box;
    .divide {
      height: 20px;
      background: #f5f5f5;
      border: none;
    }
    .condition-content {
      height: 65px;
      margin: 20px 20px 0;
      border-bottom: 1px dotted #dfdfdf;
      &.categories {
        dl {
          .city-list {
            ul > li {
              padding-right: 45px;
              > a {
                width: 75px;
              }
            }
          }
        }
      }
      &.time {
        padding-top: 10px;
        margin: 0;
        padding: 20px 20px 10px;
        border-bottom: none;
        dl {
          margin-top: 10px;
        }
        .divide {
          background: white;
          &:after {
            content: '';
            display: block;
            position: relative;
            width: 10px;
            height: 1px;
            background: #000;
            left: 8px;
            top: 11px;
          }
        }
      }
      dl {
        display: flex;
        padding-left: 30px;
        font-size: 13px;
        height: 23px;
        line-height: 23px;
        dt {
          margin-right: 10px;
        }
        .all {
          width: 55px;
          margin-right: 30px;
          cursor: pointer;
          &:hover {
            color: @HoverC;
          }
          &.active {
            color: white;
            background: @HoverC;
          }
        }
        .city-list {
          ul {
            height: 100%;
            display: flex;
            > li {
              width: 55px;
              padding-right: 20px;
              height: 23px;
              &.active {
                a {
                  color: white;
                  background: @HoverC;
                }
              }
              a {
                display: inline-block;
                text-align: center;
                width: 100%;
                height: 100%;
                line-height: 23px;
              }
            }
          }
        }
      }
    }
    .division {
      height: 10px;
      width: 927px;
      position: relative;
      left: -1px;
      background: #f5f5f5;
    }
  }
  .main-content {
    background: white;
    border: 1px solid #ececec;
    border-bottom: none;
    .sort {
      display: flex;
      box-sizing: border-box;
      padding: 0 15px 0 0;
      justify-content: space-between;
      background: #f8f8f9;
      margin-bottom: 20px;
      .sort-left {
        height: 32px;
        > ul {
          height: 100%;
          > li {
            height: 100%;
            width: 88px;
            float: left;
            line-height: 32px;
            text-align: center;
            cursor: pointer;
            &.active {
              background: white;
              color: @HoverC;
            }
          }
        }
      }
      .sort-right {
        display: flex;
        div {
          height: 32px;
          border: 1px solid #dddee1;
          width: 48px;
          position: relative;
          box-sizing: border-box;
          &:first-child {
            border-right: 1px solid transparent;
            position: relative;
            margin-right: -1px;
            border-radius: 5px 0 0 5px;
          }
          &:last-child {
            border-radius: 0 5px 5px 0;
          }
          &.active {
            background: white;
            border-color: @HoverC;
            z-index: 2;
            > i {
              color: @HoverC;
            }
          }
          > i {
            display: inline-block;
            position: absolute;
            font-size: 16px;
            transform: translate(16px, 7px);
            cursor: pointer;
          }
        }
      }
    }
    .list {
      .list-wrapper {
        width: 100%;
      }
      .no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        font-size: 16px;
      }
    }
  }
  .pagination {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 8px;
  }
  .guess-like {
    width: 270px;
    border: 1px solid #eaeaea;
    height: 40px;
    .title-background {
      width: 268px;
      height: 40px;
      background: #e6e6e6;
      text-indent: 15px;
      line-height: 40px;
      color: #495060;
    }
    > ul {
      height: 100%;
      width: 100%;
      > li {
        width: 100%;
      }
    }
  }
}
</style>

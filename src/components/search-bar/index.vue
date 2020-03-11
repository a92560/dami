<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-01-12 13:20:50
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 15:33:21
 -->
<template>
  <div class="search-wrapper container clearfix">
    <div class="logo fl">
      <img src="./img/logo-334-120.png" alt="" @click="$router.push('/')" />
      <div class="location-selection fr">
        <span class="location" @click="handleToChangeCity"
          >{{ city }}<i class="iconfont icon-xiajiantou"></i
        ></span>
        <!-- <div class="t-infos"
					 v-if="showArea">
					<dl class="clearfix">
						<dt>华北东北 ></dt>
						<dd v-if="OtherCities.length > 0">
							<ul>
								<li>
									<a href="#">北京</a>
									<i>523</i>
								</li>
								<li>
									<a href="#">北京</a>
									<i>523</i>
								</li>
								<li>
									<a href="#">北京</a>
									<i>523</i>
								</li>
								<li>
									<a href="#">北京</a>
									<i>523</i>
								</li>
								<li>
									<a href="#">北京</a>
									<i>523</i>
								</li>
								<li>
									<a href="#">北京</a>
									<i>523</i>
								</li>
							</ul>
						</dd>
					</dl>
					<dl class="clearfix">
						<dt>华南 ></dt>
						<dd v-if="HuananCities.length > 0">
							<ul>
								<li>
									<a href="#">北京</a>
								</li>
								<li>
									<a href="#">北京</a>
								</li>
								<li>
									<a href="#">北京</a>
								</li>
								<li>
									<a href="#">北京</a>
								</li>
								<li>
									<a href="#">北京</a>
								</li>
								<li>
									<a href="#">北京</a>
								</li>
							</ul>
						</dd>
					</dl>
				</div> -->
      </div>
    </div>
    <div class="input-wrapper">
      <input
        type="text"
        class="search-input"
        placeholder="请输入演出、艺人、场馆名称..."
        :value="keyword"
        @input="handleInput"
        @focus="focus"
        @blur="blur"
      />
      <button class="search-btn" @click="handleToSearch">搜索</button>
      <dl class="hot search-list" v-if="isHotSearch">
        <dt>热门搜索</dt>
        <dd>北京</dd>
        <dd>北京</dd>
        <dd>北京</dd>
        <dd>北京</dd>
      </dl>
      <div class="search-list search" v-if="isSearch">
        <dd
          v-for="item in searchList"
          v-show="searchList.length > 0"
          @click="handleToDetail(item)"
          :key="item && item._id"
        >
          {{ item.itemName }}
        </dd>
        <dd v-if="searchList.length === 0">暂无数据</dd>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SearchBar',
  data() {
    return {
      showArea: false,
      hotSeachList: [],
      isFocus: false,
    }
  },
  computed: {
    /* 判断是否显示热门搜索列表 */
    isHotSearch() {
      return this.isFocus && !this.keyword
    },
    /* 判断是否显示搜索列表 */
    isSearch() {
      return this.isFocus && this.keyword
    },
    ...mapState({
      city: state => state.city.city,
      searchList: state => state.search.searchList,
      keyword: state => state.search.keyword,
      loading: state => state.search.loading,
    })
  },
  methods: {
    ...mapMutations({
      setSearchList: "SET_SEARCH_LIST",
      resetSearchList: "RESET_SEARCH_LIST",
      setKeyword: "SET_KEYWORD",
      resetKeyword: "RESET_KEYWORD",
      setLoading: "SET_LOADING",
      resetLoading: "RESET_LOADING",
    }),
    blur() {
      setTimeout(() => {
        this.isFocus = false
      }, 500)
    },
    focus() {
      this.isFocus = true
    },
    async handleToSearch() {
      this.$router.push(`/ticketlist?keyword=${this.keyword}`).catch(err => err)
      // await this.getData()
    },
    handleToChangeCity() {
      this.$router.push('/changecity')
    },
    handleInput: _.debounce(async function(e) {
      const value = e.target.value
      // if (!value) {
      //   this.resetKeyword()
      //   this.setSearchList([])
      //   return
      // }
      this.setKeyword(value)
      await this.getData()
      // console.log(this.searchList)
    }, 500),
    handleToDetail({ itemType1Id, itemType2Id }) {
      console.log('handleToDetail')
      this.$router.push(`/ticketlist?id=${itemType2Id}&pid=${itemType1Id}`)
    },
    async getData() {
      this.setLoading(true)
      const ret = await this.$http.getListQueryGoodsInfo({
        data: { keyword: this.keyword },
      })
      if (ret && ret.data && ret.data.items && ret.data.items.length > 0) {
        console.log("ret.data.items", ret.data.items)
        this.setSearchList(ret.data.items)
        // this.searchList = ret.data
      } else {
        this.setSearchList([])
      }
      this.resetLoading()
    }
  },
}
</script>
<style lang="less" scoped>
.search-wrapper {
  padding-bottom: 40px;
  img {
    margin-top: 6px;
  }
  .location-selection {
    .location {
      display: inline-block;
      position: relative;
      top: 10px;
      cursor: pointer;
      user-select: none;
    }
    .t-infos {
      width: 150px;
      position: absolute;
      top: 60px;
      z-index: 999;
      dl {
        border-bottom: 1px dotted #bfbfbf;
        line-height: 30px;
        padding: 10px 0 10px 0;
      }

      dt {
        font-size: 14px;
        color: #333;
        width: 75px;
        float: left;
        text-align: right;
      }

      dd {
        float: left;

        ul {
          padding-bottom: 8px;
          width: 64px;
          height: 100px;
          overflow-y: auto;
          li {
            float: left;
            padding: 0 0 0 7px;
            width: 40px;
            height: 25px;
            a {
              color: #333;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    padding: 20px 0 0 120px;
    position: relative;
    .search-list {
      position: absolute;
      top: 58px;
      border: 2px solid @HoverC;
      border-top: none;
      width: 487px;
      padding: 5px;
      box-sizing: border-box;
      z-index: 9999;
      background: @BaseBackground;
      &.hot dt {
        padding: 5px;
      }
      &.hot dd {
        float: left;
        margin: 2px 6px;
        cursor: pointer;
        &:hover {
          color: @HoverC;
        }
      }
    }
    .search-list.search {
      padding: 5px 0;
      dd {
        cursor: pointer;
        padding: 8px 10px;
        box-sizing: border-box;
        margin-left: 1px;
        &:hover {
          background: #fff;
        }
      }
    }
    .search-input {
      border: 2px solid @HoverC;
      outline: none;
      color: #757575;
      padding-left: 5px;
      width: 479px;
      height: 34px;
    }

    .search-btn {
      height: 38px;
      background: @HoverC;
      border: none;
      width: 60px;
      outline: none;
      cursor: pointer;
      color: white;
    }
  }
}
</style>
